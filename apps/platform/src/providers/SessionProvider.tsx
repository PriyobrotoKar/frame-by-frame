'use client';
import { getSession, Session } from '@/lib/session';
import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface SessionContextProps {
  data: Session | null;
  setData: (session: Session | null) => void;
}

const SessionContext = createContext<SessionContextProps | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  const { data } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      return await getSession();
    },
    initialData: session,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!session) {
      setSession(data);
    }
  }, [data, session]);

  return (
    <SessionContext.Provider value={{ data: session, setData: setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};
