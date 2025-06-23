// Environment configuration
export const ENV = {
  // Local backend URL for development
  API_BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000' 
    : 'https://railway-production-9c73.up.railway.app',
  
  // API timeout
  API_TIMEOUT: 10000,
  
  // Development mode
  IS_DEV: import.meta.env.DEV,
  
  // Production mode
  IS_PROD: import.meta.env.PROD,
  
  // App version
  APP_VERSION: '2.0.0',
  
  // App name
  APP_NAME: 'CyberWise AI Advisor'
} as const;

export default ENV;

