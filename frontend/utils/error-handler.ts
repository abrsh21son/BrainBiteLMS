export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleApiError(error: any): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.data?.message) {
    return error.data.message;
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

export function isNetworkError(error: any): boolean {
  return (
    error.message?.includes('fetch') ||
    error.message?.includes('network') ||
    error.code === 'ECONNREFUSED' ||
    error.code === 'ETIMEDOUT'
  );
}



