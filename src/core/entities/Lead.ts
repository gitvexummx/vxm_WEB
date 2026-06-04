/**
 * Entidad de Dominio: Lead
 * 
 * Representa un registro de contacto potencial en el sistema.
 * Esta entidad es pura, no depende de frameworks ni infraestructura externa.
 */

export interface LeadProps {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export type LeadStatus = 'pending' | 'contacted' | 'converted' | 'rejected';

export class Lead {
  private readonly _id?: string;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _phone?: string;
  private readonly _message: string;
  private _status: LeadStatus;
  private readonly _createdAt: Date;
  private _updatedAt?: Date;

  constructor(props: LeadProps) {
    this._id = props.id;
    this._name = props.name.trim();
    this._email = props.email.toLowerCase().trim();
    this._phone = props.phone?.trim();
    this._message = props.message.trim();
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;

    this.validate();
  }

  private validate(): void {
    if (!this._name || this._name.length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }

    if (!this._email || !this.isValidEmail(this._email)) {
      throw new Error('El email no es válido');
    }

    if (!this._message || this._message.length < 10) {
      throw new Error('El mensaje debe tener al menos 10 caracteres');
    }

    if (this._phone && !this.isValidPhone(this._phone)) {
      throw new Error('El teléfono no es válido');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\+\-\(\)]{7,}$/;
    return phoneRegex.test(phone);
  }

  // Getters (inmutables excepto status y updatedAt)
  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  get message(): string {
    return this._message;
  }

  get status(): LeadStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  // Methods que modifican estado
  updateStatus(newStatus: LeadStatus): void {
    this._status = newStatus;
    this._updatedAt = new Date();
  }

  // Convertir a objeto plano para persistencia
  toObject(): LeadProps {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      phone: this._phone,
      message: this._message,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  // Crear desde objeto plano
  static fromObject(props: LeadProps): Lead {
    return new Lead(props);
  }
}
