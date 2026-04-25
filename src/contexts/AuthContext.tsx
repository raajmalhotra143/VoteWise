import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { supabase } from '../lib/supabase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (e: string, p: string) => Promise<void>;
  signUpWithEmail: (e: string, p: string, name: string, state: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        // Upsert user to supabase
        const { data } = await supabase.from('users_profile').select('*').eq('id', currentUser.uid).single();
        if (!data) {
          await supabase.from('users_profile').insert([{
            id: currentUser.uid,
            email: currentUser.email,
            full_name: currentUser.displayName || '',
            avatar_url: currentUser.photoURL || ''
          }]);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string, state: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await supabase.from('users_profile').insert([{
      id: result.user.uid,
      email,
      full_name: name,
      state
    }]);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
