import { Platform } from 'react-native';

// Use your machine IP for physical device; localhost works for web and simulators
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return 'http://localhost:8080'; // web
  if (Platform.OS === 'android') return 'http://10.0.2.2:8080'; // Android emulator
  return 'http://localhost:8080'; // iOS simulator / default
};

export const API_BASE_URL = getBaseUrl();

export const WORKOUT_GENERATE_PATH = '/api/workout/generate';