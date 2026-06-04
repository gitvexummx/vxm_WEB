// Tipos generados automáticamente desde Supabase CLI o manualmente definidos
// Este archivo asegura el tipado estricto en todas las consultas a la base de datos.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string | null;
          service_interest: string | null;
          created_at: string;
          status: 'new' | 'contacted' | 'converted' | 'discarded';
        };
        Insert: {
          id?: string; // UUID generado por defecto
          name: string;
          email: string;
          phone?: string | null;
          message?: string | null;
          service_interest?: string | null;
          created_at?: string;
          status?: 'new' | 'contacted' | 'converted' | 'discarded';
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string | null;
          service_interest?: string | null;
          created_at?: string;
          status?: 'new' | 'contacted' | 'converted' | 'discarded';
        };
      };
      // Aquí se agregarán más tablas en el futuro (ej. services, testimonials, etc.)
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Alias para facilitar el uso
export type LeadRow = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];
