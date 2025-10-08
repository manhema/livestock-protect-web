import type { LoginRequest } from '../../features/authentication/types/request.ts';
import { firebaseApp } from '../../core/services/firebase';

import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  type User,
} from 'firebase/auth';

const firebaseAuth = getAuth(firebaseApp);

export class FirebaseServices {
  listenForAuthenticated = (): PromiseLike<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebaseAuth.onAuthStateChanged(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
          unsubscribe();
        },
      );

      // Return a cleanup function to unsubscribe on unmount
      return () => unsubscribe();
    });
  };

  signInWithEmailAndPassword = async (request: LoginRequest, rememberMe?: boolean) : Promise<void> => {
    await setPersistence(firebaseAuth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    await signInWithEmailAndPassword(firebaseAuth, request.email, request.password);
  };


}


export async function getToken(forceRefresh?: boolean): Promise<string | undefined> {
  const token = await firebaseAuth?.currentUser?.getIdToken(forceRefresh);
  await firebaseAuth.currentUser?.reload();
  return token;
}
