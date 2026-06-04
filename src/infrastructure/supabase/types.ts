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
      audit_logs: {
        Row: {
          id: string;
          nombre_empresa: string;
          correo: string;
          telefono: string;
          giro: string;
          presupuesto: number;
          ubicacion: 'CDMX' | 'EDOMEX';
          alcaldia_municipio: string;
          descripcion_problema: string;
          acepta_tyc: boolean;
          created_at: string;
        };
        Insert: {
          id?: string; // UUID generado por defecto
          nombre_empresa: string;
          correo: string;
          telefono: string;
          giro: string;
          presupuesto: number;
          ubicacion: 'CDMX' | 'EDOMEX';
          alcaldia_municipio: string;
          descripcion_problema: string;
          acepta_tyc: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          nombre_empresa?: string;
          correo?: string;
          telefono?: string;
          giro?: string;
          presupuesto?: number;
          ubicacion?: 'CDMX' | 'EDOMEX';
          alcaldia_municipio?: string;
          descripcion_problema?: string;
          acepta_tyc?: boolean;
          created_at?: string;
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
export type AuditLogRow = Database['public']['Tables']['audit_logs']['Row'];
export type AuditLogInsert = Database['public']['Tables']['audit_logs']['Insert'];
export type AuditLogUpdate = Database['public']['Tables']['audit_logs']['Update'];
