'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { leadSchema, type LeadInput, type LeadSuccess, type LeadError } from '@application/validators/schemas';
import { CreateLeadUseCase } from '@application/usecases/CreateLeadUseCase';
import { LeadRepository } from '@infrastructure/repositories/LeadRepository';

/**
 * Estado del hook.
 */
interface UseContactFormState {
  values: LeadInput;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitResult: LeadSuccess | LeadError | null;
}

/**
 * Hook personalizado para gestionar el formulario de contacto.
 * 
 * Responsabilidades:
 * 1. Gestionar el estado local del formulario (valores, errores, loading).
 * 2. Instanciar las dependencias (Repositorio y Caso de Uso).
 * 3. Ejecutar el caso de uso al enviar el formulario.
 * 4. Manejar la navegación en caso de éxito.
 */
export function useContactForm() {
  const router = useRouter();
  
  // Inicialización de dependencias (Inyección manual por ahora)
  const repository = new LeadRepository();
  const useCase = new CreateLeadUseCase(repository);

  const [state, setState] = useState<UseContactFormState>({
    values: {
      nombre_empresa: '',
      correo: '',
      telefono: '',
      giro: '',
      descripcion_problema: '',
    },
    errors: {},
    isSubmitting: false,
    submitResult: null,
  });

  /**
   * Actualiza un valor específico del formulario.
   */
  const updateValue = useCallback((field: keyof LeadInput, value: string) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      // Limpiar error del campo cuando se modifica
      errors: { ...prev.errors, [field]: '' },
    }));
  }, []);

  /**
   * Valida los datos actuales del formulario sin enviarlos.
   */
  const validate = useCallback((): boolean => {
    const result = leadSchema.safeParse(state.values);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const key = err.path.join('.');
        errors[key] = err.message;
      });
      
      setState((prev) => ({ ...prev, errors }));
      return false;
    }
    
    return true;
  }, [state.values]);

  /**
   * Maneja el envío del formulario.
   */
  const handleSubmit = useCallback(async (e?: React.FormEvent): Promise<boolean> => {
    e?.preventDefault();
    
    // Validación previa
    if (!validate()) {
      return false;
    }

    setState((prev) => ({ ...prev, isSubmitting: true, submitResult: null }));

    try {
      const result = await useCase.execute(state.values);

      setState((prev) => ({ ...prev, isSubmitting: false, submitResult: result }));

      if (result.success) {
        // Redirigir a página de éxito después de un breve delay
        setTimeout(() => {
          router.push('/exito');
        }, 1000);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('[useContactForm] Error inesperado:', error);
      
      const errorResult: LeadError = {
        success: false,
        error: 'UNKNOWN_ERROR',
        message: 'Ocurrió un error inesperado. Intente nuevamente.',
      };
      
      setState((prev) => ({ ...prev, isSubmitting: false, submitResult: errorResult }));
      return false;
    }
  }, [state.values, validate, router]);

  /**
   * Resetea el formulario a su estado inicial.
   */
  const reset = useCallback(() => {
    setState({
      values: {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      },
      errors: {},
      isSubmitting: false,
      submitResult: null,
    });
  }, []);

  return {
    ...state,
    updateValue,
    handleSubmit,
    validate,
    reset,
  };
}
