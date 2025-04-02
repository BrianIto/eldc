// utils/validation.utils.ts
import { AbstractControl } from '@angular/forms';

export interface ValidationMessages {
  [key: string]: string | ((error: any) => string);
}

export function getValidationErrors(
  control: AbstractControl | null | undefined,
  messages: ValidationMessages,
  defaultMessages: ValidationMessages = {},
): string[] {
  if (!control || !control.errors || control.pristine || control.untouched) {
    return [];
  }

  return Object.keys(control.errors).map((errorKey) => {
    // Try to get message from provided messages first, then fall back to defaults
    const message = messages[errorKey] || defaultMessages[errorKey];

    if (typeof message === 'function') {
      return message(control.errors![errorKey]);
    }

    if (typeof message === 'string') {
      // Handle interpolation of error properties
      return interpolateMessage(message, control.errors![errorKey]);
    }

    // Final fallback if no message is found
    return `Validation failed: ${errorKey}`;
  });
}

function interpolateMessage(template: string, error: any): string {
  if (!error) return template;

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return error[key] !== undefined ? error[key] : match;
  });
}

// Default validation messages
export const DEFAULT_VALIDATION_MESSAGES: ValidationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minlength: 'Minimum length is {{requiredLength}}',
  maxlength: 'Maximum length is {{requiredLength}}',
  min: 'Minimum value is {{min}}',
  max: 'Maximum value is {{max}}',
  pattern: 'Invalid format',
};
