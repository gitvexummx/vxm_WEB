/**
 * Entidad de Dominio: Lead
 * 
 * Representa un registro de contacto potencial en el sistema.
 * Esta entidad es pura, no depende de frameworks ni infraestructura externa.
 * 
 * Estructura según info.md - Campos del formulario de contacto
 */

export interface LeadProps {
  id?: string;
  nombre_empresa: string;
  correo: string;
  telefono: string;
  giro: string;
  presupuesto: number;
  ubicacion: 'CDMX' | 'EDOMEX';
  alcaldia_municipio: string;
  descripcion_problema: string;
  acepta_tyc: boolean;
  createdAt?: Date;
}

export class Lead {
  private readonly _id: string | undefined;
  private readonly _nombre_empresa: string;
  private readonly _correo: string;
  private readonly _telefono: string;
  private readonly _giro: string;
  private readonly _presupuesto: number;
  private readonly _ubicacion: 'CDMX' | 'EDOMEX';
  private readonly _alcaldia_municipio: string;
  private readonly _descripcion_problema: string;
  private readonly _acepta_tyc: boolean;
  private readonly _createdAt: Date;

  constructor(props: LeadProps) {
    this._id = props.id;
    this._nombre_empresa = props.nombre_empresa.trim();
    this._correo = props.correo.toLowerCase().trim();
    this._telefono = props.telefono.trim();
    this._giro = props.giro.trim();
    this._presupuesto = props.presupuesto;
    this._ubicacion = props.ubicacion;
    this._alcaldia_municipio = props.alcaldia_municipio.trim();
    this._descripcion_problema = props.descripcion_problema.trim();
    this._acepta_tyc = props.acepta_tyc;
    this._createdAt = props.createdAt ?? new Date();

    this.validate();
  }

  private validate(): void {
    if (!this._nombre_empresa || this._nombre_empresa.length < 2) {
      throw new Error('El nombre de la empresa debe tener al menos 2 caracteres');
    }

    if (!this._correo || !this.isValidEmail(this._correo)) {
      throw new Error('El correo electrónico no es válido');
    }

    if (!this._telefono || this._telefono.length < 10) {
      throw new Error('El teléfono debe tener al menos 10 dígitos');
    }

    if (!this._giro || this._giro.length < 2) {
      throw new Error('El giro de la empresa debe tener al menos 2 caracteres');
    }

    if (this._presupuesto <= 0) {
      throw new Error('El presupuesto debe ser mayor a 0');
    }

    if (!['CDMX', 'EDOMEX'].includes(this._ubicacion)) {
      throw new Error('La ubicación debe ser CDMX o EDOMEX');
    }

    if (!this._alcaldia_municipio || this._alcaldia_municipio.length < 2) {
      throw new Error('La alcaldía o municipio debe tener al menos 2 caracteres');
    }

    if (!this._descripcion_problema || this._descripcion_problema.length < 10) {
      throw new Error('La descripción del problema debe tener al menos 10 caracteres');
    }

    if (!this._acepta_tyc) {
      throw new Error('Debe aceptar los términos y condiciones');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Getters (inmutables)
  get id(): string | undefined {
    return this._id;
  }

  get nombre_empresa(): string {
    return this._nombre_empresa;
  }

  get correo(): string {
    return this._correo;
  }

  get telefono(): string {
    return this._telefono;
  }

  get giro(): string {
    return this._giro;
  }

  get presupuesto(): number {
    return this._presupuesto;
  }

  get ubicacion(): 'CDMX' | 'EDOMEX' {
    return this._ubicacion;
  }

  get alcaldia_municipio(): string {
    return this._alcaldia_municipio;
  }

  get descripcion_problema(): string {
    return this._descripcion_problema;
  }

  get acepta_tyc(): boolean {
    return this._acepta_tyc;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  // Convertir a objeto plano para persistencia
  toObject(): LeadProps {
    return {
      ...(this._id !== undefined && { id: this._id }),
      nombre_empresa: this._nombre_empresa,
      correo: this._correo,
      telefono: this._telefono,
      giro: this._giro,
      presupuesto: this._presupuesto,
      ubicacion: this._ubicacion,
      alcaldia_municipio: this._alcaldia_municipio,
      descripcion_problema: this._descripcion_problema,
      acepta_tyc: this._acepta_tyc,
      createdAt: this._createdAt,
    };
  }

  // Crear desde objeto plano
  static fromObject(props: LeadProps): Lead {
    return new Lead(props);
  }
}
