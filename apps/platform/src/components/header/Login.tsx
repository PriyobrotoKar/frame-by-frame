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
import { useLoginDialog } from '@/providers/LoginDialogProvider';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

const Login = () => {
  const { open, setOpen } = useLoginDialog();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const [selectedMethod, setSelectedMethod] = useState<AuthProvider | null>(
    null,
  );

  const handleOAuthLogin = (method: AuthProvider) => {
    setSelectedMethod(method);
    window.location.href = OAUTH_PATH[method];
  };

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={'outline'}>Login</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="space-y-8 py-4">
            <DrawerHeader className="gap-3">
              <DrawerTitle className="text-xl">
                Create an account or login to an existing one
              </DrawerTitle>
              <DrawerDescription>
                View library and personalized content
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col gap-4 px-10">
              <Button
                variant={
                  selectedMethod === AuthProvider.GOOGLE
                    ? 'outline'
                    : 'secondary'
                }
                onClick={() => handleOAuthLogin(AuthProvider.GOOGLE)}
              >
                <IconBrandGoogleFilled /> Login with Google
              </Button>
              <Button
                variant={
                  selectedMethod === AuthProvider.DISCORD
                    ? 'outline'
                    : 'secondary'
                }
                onClick={() => handleOAuthLogin(AuthProvider.DISCORD)}
              >
                <IconBrandDiscordFilled /> Login with Discord
              </Button>
            </div>

            <DrawerFooter className="text-center text-sm">
              <p>By signing in you agree to the Terms & Conditions</p>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            onClick={() => handleOAuthLogin(AuthProvider.GOOGLE)}
          >
            <IconBrandGoogleFilled /> Login with Google
          </Button>
          <Button
            variant={
              selectedMethod === AuthProvider.DISCORD ? 'outline' : 'secondary'
            }
            onClick={() => handleOAuthLogin(AuthProvider.DISCORD)}
          >
            <IconBrandDiscordFilled /> Login with Discord
          </Button>
        </div>

        <DialogFooter className="sm:flex-col sm:items-center">
          <p className="text-sm">
            By signing in you agree to the terms and conditions
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
