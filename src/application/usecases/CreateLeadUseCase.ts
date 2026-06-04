import { ILeadRepository } from '@core/ports/ILeadRepository';
import { Lead } from '@core/entities/Lead';
import { leadSchema, type LeadInput, type LeadSuccess, type LeadError } from '../validators/schemas';

/**
 * Resultado union del caso de uso.
 */
export type CreateLeadResult = LeadSuccess | LeadError;

/**
 * Caso de uso para crear un nuevo Lead.
 * 
 * Responsabilidades:
 * 1. Validar los datos de entrada contra el esquema Zod.
 * 2. Transformar los datos validados a una entidad de dominio.
 * 3. Delegar la persistencia al repositorio (infraestructura).
 * 4. Manejar errores y retornar un resultado estandarizado.
 */
export class CreateLeadUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(input: LeadInput): Promise<CreateLeadResult> {
    // 1. Validación de datos de entrada
    const validation = leadSchema.safeParse(input);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const key = err.path.join('.');
        errors[key] = err.message;
      });

      return {
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Datos de entrada inválidos',
        details: errors,
      };
    }

    try {
      // 2. Transformar a entidad de dominio
      const lead = new Lead({
        nombre_empresa: validation.data.nombre_empresa,
        correo: validation.data.correo,
        telefono: validation.data.telefono,
        giro: validation.data.giro,
        presupuesto: validation.data.presupuesto,
        ubicacion: validation.data.ubicacion,
        alcaldia_municipio: validation.data.alcaldia_municipio,
        descripcion_problema: validation.data.descripcion_problema,
        acepta_tyc: validation.data.acepta_tyc,
        createdAt: new Date(),
      });

      // 3. Persistir mediante el repositorio
      const id = await this.leadRepository.create(lead);

      // 4. Retornar éxito
      return {
        success: true,
        id,
        message: 'Lead creado exitosamente',
      };
    } catch (error) {
      console.error('[CreateLeadUseCase] Error al guardar lead:', error);

      return {
        success: false,
        error: 'DATABASE_ERROR',
        message: 'No se pudo guardar el lead. Intente nuevamente.',
      };
    }
  }
}
