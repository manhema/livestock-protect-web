import { initializeApp } from 'firebase/app';
import { config } from '../../config/config.ts';

// Initialize Firebase
export const firebaseApp = initializeApp(config.firebase);
