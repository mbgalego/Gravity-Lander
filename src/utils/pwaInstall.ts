import { useState, useEffect } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const promptListeners = new Set<() => void>();

// Register global listeners immediately so event is never missed on load
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    promptListeners.forEach((listener) => listener());
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    promptListeners.forEach((listener) => listener());
  });
}

export function usePwaInstall() {
  const [canInstall, setCanInstall] = useState<boolean>(() => !!deferredPrompt);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      // @ts-expect-error iOS Safari navigator.standalone check
      window.navigator.standalone === true
    );
  });
  const [isIframe, setIsIframe] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    // Check if running in iframe (preview container)
    try {
      setIsIframe(window.self !== window.top);
    } catch {
      setIsIframe(true);
    }

    // Check standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      // @ts-expect-error iOS Safari navigator.standalone check
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      setCanInstall(false);
    } else {
      setCanInstall(!!deferredPrompt);
    }

    const updatePromptState = () => {
      setCanInstall(!!deferredPrompt);
    };

    promptListeners.add(updatePromptState);
    return () => {
      promptListeners.delete(updatePromptState);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) {
      return false;
    }
    try {
      const promptEvent = deferredPrompt;
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        deferredPrompt = null;
        setCanInstall(false);
        setIsInstalled(true);
      }
      return outcome === 'accepted';
    } catch (err) {
      console.warn('PWA install prompt error:', err);
      return false;
    }
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return {
    canInstall,
    isInstalled,
    isIframe,
    triggerInstall,
    openInNewTab,
  };
}
