'use client';
import { createContext, useContext, useState } from 'react';

interface LoginDialogContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginDialogContext = createContext<LoginDialogContextProps | null>(null);

function LoginDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <LoginDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </LoginDialogContext.Provider>
  );
}

export default LoginDialogProvider;

export function useLoginDialog() {
  const context = useContext(LoginDialogContext);

  if (!context) {
    throw new Error('useLoginDialog must be used within a LoginDialogProvider');
  }

  return context;
}
