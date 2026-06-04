import { supabase } from '../supabase/client';
import type { ILeadRepository } from '@core/ports/ILeadRepository';
import type { Lead } from '@core/entities/Lead';
import type { LeadInsert } from '../supabase/types';

export class SupabaseLeadRepository implements ILeadRepository {
  private readonly tableName = 'leads';

  async create(lead: Lead): Promise<void> {
    const leadData: LeadInsert = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      service_interest: lead.serviceInterest,
      status: 'new',
    };

    const { error } = await supabase
      .from(this.tableName)
      .insert([leadData]);

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
  }

  async findById(id: string): Promise<Lead | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Row not found
        return null;
      }
      console.error('[SupabaseLeadRepository] Error al buscar lead:', error);
      throw new Error('Error al consultar el lead.');
    }

    if (!data) return null;

    return new Lead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      serviceInterest: data.service_interest,
    });
  }

  async updateStatus(id: string, status: 'new' | 'contacted' | 'converted' | 'discarded'): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('[SupabaseLeadRepository] Error al actualizar estado:', error);
      throw new Error('No se pudo actualizar el estado del lead.');
    }
  }
}
