// Application constants
export const APP_NAME = 'CyberWise AI Advisor';
export const APP_VERSION = '2.0.0';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
  },
  THREATS: {
    ANALYZE: '/threats/analyze',
    LIST: '/threats',
    DETAILS: '/threats/:id'
  },
  BUDGET: {
    OPTIMIZE: '/budget/optimize',
    SCENARIOS: '/budget/scenarios'
  }
} as const;

// Threat severity levels
export const THREAT_SEVERITY = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  INFO: 'Info'
} as const;

// Budget categories
export const BUDGET_CATEGORIES = {
  NETWORK_SECURITY: 'Network Security',
  ENDPOINT_PROTECTION: 'Endpoint Protection',
  IDENTITY_ACCESS: 'Identity & Access',
  DATA_PROTECTION: 'Data Protection',
  COMPLIANCE: 'Compliance',
  INCIDENT_RESPONSE: 'Incident Response'
} as const;

// Color schemes for charts and visualizations
export const COLORS = {
  PRIMARY: '#8b5cf6',
  SECONDARY: '#06b6d4',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#3b82f6',
  DARK: '#1e293b',
  LIGHT: '#f8fafc'
} as const;

// Chart colors for different data series
export const CHART_COLORS = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'
] as const;

// Default pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme'
} as const;

