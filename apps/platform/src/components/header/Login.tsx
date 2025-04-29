'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { AuthProvider } from '@frame-by-frame/db';
import {
  IconBrandDiscordFilled,
  IconBrandGoogleFilled,
} from '@tabler/icons-react';
import { OAUTH_PATH } from '@/lib/constants';
import { Button } from '../ui/button';

const Login = () => {
  const [selectedMethod, setSelectedMethod] = useState<AuthProvider | null>(
    null,
  );

  const handleOAuthLogin = () => {
    if (!selectedMethod) return;
    window.location.href = OAUTH_PATH[selectedMethod];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Login</Button>
      </DialogTrigger>
      <DialogContent className="gap-12 px-10 py-12 sm:max-w-md">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-xl">
            Create an account or login to an existing one
          </DialogTitle>
          <DialogDescription>
            View library and personalized content
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Button
            variant={
              selectedMethod === AuthProvider.GOOGLE ? 'outline' : 'secondary'
            }
            onClick={() => setSelectedMethod(AuthProvider.GOOGLE)}
          >
            <IconBrandGoogleFilled /> Sign in with Google
          </Button>
          <Button
            variant={
              selectedMethod === AuthProvider.DISCORD ? 'outline' : 'secondary'
            }
            onClick={() => setSelectedMethod(AuthProvider.DISCORD)}
          >
            <IconBrandDiscordFilled /> Sign in with Discord
          </Button>
        </div>

        <DialogFooter className="sm:flex-col sm:items-center">
          <Button
            onClick={handleOAuthLogin}
            disabled={!selectedMethod}
            className="w-full"
          >
            Continue
          </Button>
          <p className="text-sm">
            By signing in you agree to the terms and conditions
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
