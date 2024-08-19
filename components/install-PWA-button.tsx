'use client';
import React, { useState, useEffect } from 'react';
import PulsatingButton from './ui/pulsating-button';
import Image from "next/image";
// ????? BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstalled(false);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center bg-white p-2 z-50">
      <PulsatingButton  onClick={handleInstallClick} className='bg-white'>
      <Image src="/icons8-android-phone.gif" alt="alt" width={24} height={24} />
        {/* <span>Install PWA</span> */}
      </PulsatingButton>
    </div>
  );
};

export default InstallPWAButton;
