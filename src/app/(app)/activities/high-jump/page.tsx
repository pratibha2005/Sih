
'use client';

import { useState, useEffect } from 'react';
import { ActivityClient } from '@/components/activities/activity-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, Trophy, Goal } from 'lucide-react';

function HighJumpTracker() {
  const [jumpHeight, setJumpHeight] = useState(0);
  const [bestHeight, setBestHeight] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [realtimeHeight, setRealtimeHeight] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isJumping) {
      const peakHeight = Math.floor(Math.random() * (60 - 30 + 1)) + 30; // Random height 30-60cm
      const duration = 1000;
      const startTime = Date.now();

      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            // Sine wave to simulate jump arc
            const currentHeight = Math.sin(progress * Math.PI) * peakHeight;
            setRealtimeHeight(Math.round(currentHeight));
        } else {
            setRealtimeHeight(0);
            setJumpHeight(peakHeight);
            if (peakHeight > bestHeight) {
                setBestHeight(peakHeight);
            }
            setIsJumping(false);
            clearInterval(interval);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isJumping, bestHeight]);
  
  const handleJump = () => {
    if (!isJumping) {
      setJumpHeight(0);
      setIsJumping(true);
    }
  };
  
  return (
    <div className="relative flex flex-col items-center gap-8">
       <div className="absolute top-0 right-0 z-10">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center gap-2 p-3">
              <Goal className="h-5 w-5" />
              <CardTitle className="text-lg font-bold font-mono">
                {realtimeHeight} cm
              </CardTitle>
            </CardHeader>
          </Card>
      </div>
      <div className="grid w-full gap-4 md:grid-cols-2">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Best Height</CardTitle><Trophy className="h-4 w-4 text-muted-foreground"/></CardHeader>
          <CardContent><div className="text-2xl font-bold font-mono">{bestHeight} cm</div></CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Last Jump</CardTitle><ArrowUp className="h-4 w-4 text-muted-foreground"/></CardHeader>
          <CardContent><div className="text-2xl font-bold font-mono">{jumpHeight} cm</div></CardContent>
        </Card>
      </div>
      
      <div className="relative flex h-64 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed bg-secondary/50">
        <ArrowUp className="h-16 w-16 text-muted-foreground/50" />
        {isJumping && (
            <p className="mt-4 font-headline text-6xl font-bold text-primary">JUMPING!</p>
        )}
        <p className="mt-2 text-muted-foreground">
          {isJumping ? "System is measuring your peak height." : "Press the button when you are ready to jump."}
        </p>
      </div>

      <Button size="lg" onClick={handleJump} disabled={isJumping}>
        {isJumping ? "Measuring..." : 'Initiate Jump'}
      </Button>
    </div>
  );
}

export default function HighJumpPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          High Jump
        </h1>
        <p className="text-muted-foreground">
          The system will measure your jump height in centimeters.
        </p>
      </div>

      <ActivityClient activityType="High Jump">
        {(isStarted) => isStarted && <HighJumpTracker />}
      </ActivityClient>
    </div>
  );
}
