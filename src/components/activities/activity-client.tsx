
'use client';

import { useState, useEffect } from 'react';
import { BodyScanModal } from './body-scan-modal';
import type { ActivityType } from '@/lib/types';

interface ActivityClientProps {
  activityType: ActivityType;
  children: (isStarted: boolean) => React.ReactNode;
}

export function ActivityClient({ activityType, children }: ActivityClientProps) {
  const [phase, setPhase] = useState<'scan' | 'countdown' | 'active'>('scan');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (phase === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('active');
      }
    }
  }, [phase, countdown]);
  
  const handleScanComplete = () => {
    setPhase('countdown');
  };

  if (phase === 'scan') {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed bg-secondary/50">
        <div className="text-center">
            <h2 className="font-headline text-2xl font-semibold">Prepare for {activityType}</h2>
            <p className="text-muted-foreground">
                Begin with an AI-powered body scan to check your readiness.
            </p>
        </div>
        <BodyScanModal activityType={activityType} onScanComplete={handleScanComplete} />
      </div>
    );
  }

  if (phase === 'countdown') {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 rounded-xl bg-secondary/50">
        <p className="text-lg text-muted-foreground">Get Ready...</p>
        <p className="font-headline text-9xl font-bold text-primary">{countdown}</p>
      </div>
    );
  }

  return children(phase === 'active');
}
