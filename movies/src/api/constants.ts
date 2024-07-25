const env = import.meta.env;

export const API_URL = env.VITE_API_URL as string;
export const TOKEN = env.VITE_TOKEN as string;

export const PLACEHOLDER_IMAGE_PATH = env.VITE_PLACEHOLDER_IMAGE_PATH as string;
export const IMAGE_PATH = env.VITE_IMAGE as string;
export const IMAGE_ORIGINAL = env.VITE_IMAGE_ORIGINAL as string;

export const TOP_RATED_PATH = env.VITE_TOP_RATED as string;
export const POPULAR_PATH = env.VITE_POPULAR as string;

export const DEFAULT_ERROR_MESSAGE = 'Unknown error occurred';
