import { VALIDATION_RULES } from './constants';

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  // At least 6 characters
  return password.length >= 6;
}

/**
 * Validate subject input
 */
export function validateSubject(subject: string): { valid: boolean; error?: string } {
  if (!subject || !subject.trim()) {
    return { valid: false, error: 'Subject is required' };
  }

  const trimmed = subject.trim();

  if (trimmed.length < VALIDATION_RULES.subject.minLength) {
    return {
      valid: false,
      error: `Subject must be at least ${VALIDATION_RULES.subject.minLength} characters long`,
    };
  }

  if (trimmed.length > VALIDATION_RULES.subject.maxLength) {
    return {
      valid: false,
      error: `Subject must not exceed ${VALIDATION_RULES.subject.maxLength} characters`,
    };
  }

  return { valid: true };
}


