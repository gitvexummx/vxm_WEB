import { supabase } from '../supabase/client';
import type { ILeadRepository } from '@core/ports/ILeadRepository';
import type { Lead } from '@core/entities/Lead';
import type { AuditLogInsert } from '../supabase/types';

export class SupabaseLeadRepository implements ILeadRepository {
  //private readonly tableName = 'audit_logs';

  async create(lead: Lead): Promise<string> {
    const leadData: AuditLogInsert = {
      nombre_empresa: lead.nombre_empresa,
      correo: lead.correo,
      telefono: lead.telefono,
      giro: lead.giro,
      presupuesto: lead.presupuesto,
      ubicacion: lead.ubicacion,
      alcaldia_municipio: lead.alcaldia_municipio,
      descripcion_problema: lead.descripcion_problema,
      acepta_tyc: lead.acepta_tyc,
    };

    const { data, error } = await supabase
      .from('audit_logs')
      .insert([leadData] satisfies AuditLogInsert[])
      .select('id')
      .single();

    if (error) {
      // Manejo de errores específico de infraestructura
      console.error('[SupabaseLeadRepository] Error al crear lead:', error);

      if (error.code === '23505') { // Unique violation
        throw new Error('El correo electrónico ya está registrado.');
      }

      if (error.code === '23503') { // Foreign key violation
        throw new Error('Datos inválidos en el formulario.');
      }

      throw new Error('No se pudo guardar el lead. Intente más tarde.');
    }

    if (!data || typeof data.id !== 'string') {
      throw new Error('No se pudo obtener el ID del lead creado.');
    }

    return data.id;
  }
}
