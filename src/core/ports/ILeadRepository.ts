import { Lead } from '../entities/Lead';

/**
 * Puerto (Interfaz) del Repositorio de Leads
 * 
 * Define el contrato que debe cumplir cualquier implementación de repositorio.
 * La capa de aplicación depende de esta interfaz, NO de la implementación concreta.
 * Esto permite cambiar de Supabase a otra base de datos sin afectar la lógica de negocio.
 * 
 * Según info.md: Solo se requiere método insert (create), no se editará ni cambiará nada.
 */

export interface ILeadRepository {
  /**
   * Crea un nuevo lead en el repositorio (insert en audit_logs)
   * @param lead - La entidad Lead a persistir
   * @returns El ID del lead creado
   * @throws Error si hay un problema de persistencia
   */
  create(lead: Lead): Promise<string>;
}
