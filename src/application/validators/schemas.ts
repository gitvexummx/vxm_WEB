import { z } from 'zod';

/**
 * Esquema de validación para el formulario de contacto (Lead).
 * Define las reglas de negocio para los datos de entrada según info.md.
 */
export const leadSchema = z.object({
  nombre_empresa: z
    .string()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
    .max(100, 'El nombre de la empresa no puede exceder los 100 caracteres'),
  
  correo: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Formato de correo electrónico inválido')
    .max(100, 'El correo electrónico es demasiado largo'),
  
  telefono: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede exceder los 15 dígitos')
    .regex(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números, signos +, -, espacios y paréntesis'),
  
  giro: z
    .string()
    .min(2, 'El giro de la empresa debe tener al menos 2 caracteres')
    .max(100, 'El giro no puede exceder los 100 caracteres'),
  
  presupuesto: z
    .number()
    .positive('El presupuesto debe ser mayor a 0'),
  
  ubicacion: z
    .enum(['CDMX', 'EDOMEX'], {
      errorMap: () => ({ message: 'La ubicación debe ser CDMX o EDOMEX' }),
    }),
  
  alcaldia_municipio: z
    .string()
    .min(2, 'La alcaldía o municipio debe tener al menos 2 caracteres')
    .max(100, 'La alcaldía o municipio no puede exceder los 100 caracteres'),
  
  descripcion_problema: z
    .string()
    .min(10, 'La descripción del problema debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder los 1000 caracteres'),
  
  acepta_tyc: z
    .literal(true, {
      errorMap: () => ({ message: 'Debe aceptar los términos y condiciones' }),
    }),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Esquema para la respuesta exitosa del caso de uso.
 */
export const leadSuccessSchema = z.object({
  success: z.literal(true),
  id: z.string().uuid(),
  message: z.string(),
});

export type LeadSuccess = z.infer<typeof leadSuccessSchema>;

/**
 * Esquema para la respuesta de error del caso de uso.
 */
export const leadErrorSchema = z.object({
  success: z.literal(false),
  error: z.enum(['VALIDATION_ERROR', 'DATABASE_ERROR', 'UNKNOWN_ERROR']),
  message: z.string(),
  details: z.record(z.string()).optional(),
});

export type LeadError = z.infer<typeof leadErrorSchema>;
