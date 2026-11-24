const BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Thin fetch wrapper: JSON in, ApiError out. `status` is 0 for network failures.
export async function request(path, { signal } = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, { signal });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('We could not reach the store. Check your connection and try again.', 0);
  }

  if (!response.ok) {
    const message =
      response.status === 404
        ? 'That item does not exist.'
        : 'The store is having trouble right now. Try again in a moment.';
    throw new ApiError(message, response.status);
  }

  return response.json();
}
