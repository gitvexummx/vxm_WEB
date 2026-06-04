import { z } from 'zod';

/**
 * Esquema de validación para el formulario de contacto (Lead).
 * Define las reglas de negocio para los datos de entrada.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
    .regex(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/, 'El nombre solo puede contener letras y espacios'),
  
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Formato de correo electrónico inválido')
    .max(100, 'El correo electrónico es demasiado largo'),
  
  phone: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(15, 'El teléfono no puede exceder los 15 dígitos')
    .regex(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números, signos +, -, espacios y paréntesis'),
  
  service: z
    .string()
    .min(1, 'Debe seleccionar un servicio')
    .refine(
      (val) => ['desarrollo-web', 'app-movil', 'consultoria', 'mantenimiento'].includes(val),
      'Servicio no válido'
    ),
  
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no puede exceder los 500 caracteres')
    .optional(),
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
