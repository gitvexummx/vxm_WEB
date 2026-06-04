import { Lead } from '../entities/Lead';

/**
 * Puerto (Interfaz) del Repositorio de Leads
 * 
 * Define el contrato que debe cumplir cualquier implementación de repositorio.
 * La capa de aplicación depende de esta interfaz, NO de la implementación concreta.
 * Esto permite cambiar de Supabase a otra base de datos sin afectar la lógica de negocio.
 */

export interface ILeadRepository {
  /**
   * Crea un nuevo lead en el repositorio
   * @param lead - La entidad Lead a persistir
   * @returns El Lead creado con su ID asignado
   * @throws Error si el lead ya existe o hay un problema de persistencia
   */
  create(lead: Lead): Promise<Lead>;

  /**
   * Busca un lead por su ID
   * @param id - El identificador único del lead
   * @returns El Lead encontrado o undefined si no existe
   */
  findById(id: string): Promise<Lead | undefined>;

  /**
   * Busca un lead por su email
   * @param email - El email del lead a buscar
   * @returns El Lead encontrado o undefined si no existe
   */
  findByEmail(email: string): Promise<Lead | undefined>;

  /**
   * Obtiene todos los leads con paginación opcional
   * @param limit - Número máximo de resultados (default: 10)
   * @param offset - Número de registros a saltar (default: 0)
   * @returns Array de Leads encontrados
   */
  findAll(limit?: number, offset?: number): Promise<Lead[]>;

  /**
   * Actualiza un lead existente
   * @param lead - La entidad Lead con los datos actualizados
   * @returns El Lead actualizado
   * @throws Error si el lead no existe
   */
  update(lead: Lead): Promise<Lead>;

  /**
   * Elimina un lead por su ID
   * @param id - El identificador único del lead a eliminar
   * @returns true si se eliminó correctamente, false si no existía
   */
  delete(id: string): Promise<boolean>;

  /**
   * Cuenta el número total de leads
   * @returns El número total de leads en el repositorio
   */
  count(): Promise<number>;

  /**
   * Busca leads por estado
   * @param status - El estado a filtrar
   * @param limit - Número máximo de resultados (opcional)
   * @returns Array de Leads con el estado especificado
   */
  findByStatus(status: Lead['status'], limit?: number): Promise<Lead[]>;
}
