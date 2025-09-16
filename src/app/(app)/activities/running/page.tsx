
'use client';

import { useState, useEffect } from 'react';
import { ActivityClient } from '@/components/activities/activity-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Route, Zap } from 'lucide-react';

function RunningTracker() {
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [stamina, setStamina] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        if (!isFinished) {
            setTime(prev => prev + 1);
            setDistance(prev => prev + 0.003); // km
            setStamina(prev => Math.max(0, prev - 0.2));
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [isFinished]);

  const speed = distance > 0 ? (distance / (time / 3600)).toFixed(2) : '0.00';
  const pace = distance > 0 ? ((time / 60) / distance).toFixed(2) : '0.00'; // min/km

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  if (isFinished) {
      return (
          <div className="text-center space-y-6">
              <h2 className="font-headline text-3xl font-bold">Run Complete!</h2>
              <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                      <CardHeader><CardTitle>Total Time</CardTitle></CardHeader>
                      <CardContent className="text-4xl font-bold">{formatTime(time)}</CardContent>
                  </Card>
                  <Card>
                      <CardHeader><CardTitle>Total Distance</CardTitle></CardHeader>
                      <CardContent className="text-4xl font-bold">{distance.toFixed(2)} km</CardContent>
                  </Card>
                   <Card>
                      <CardHeader><CardTitle>Average Pace</CardTitle></CardHeader>
                      <CardContent className="text-4xl font-bold">{pace} min/km</CardContent>
                  </Card>
              </div>
              <Button onClick={() => window.location.reload()}>Start New Run</Button>
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Time</CardTitle><Clock className="h-4 w-4 text-muted-foreground"/></CardHeader>
          <CardContent><div className="text-2xl font-bold font-mono">{formatTime(time)}</div></CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Distance</CardTitle><Route className="h-4 w-4 text-muted-foreground"/></CardHeader>
          <CardContent><div className="text-2xl font-bold font-mono">{distance.toFixed(2)} km</div></CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Current Pace</CardTitle><Zap className="h-4 w-4 text-muted-foreground"/></CardHeader>
          <CardContent><div className="text-2xl font-bold font-mono">{pace} min/km</div></CardContent>
        </Card>
      </div>
      <div>
        <label className="text-sm font-medium">Stamina</label>
        <Progress value={stamina} className="mt-2 h-4" />
      </div>
      <Button size="lg" variant="destructive" onClick={() => setIsFinished(true)}>End Run</Button>
    </div>
  );
}


export default function RunningPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Running
        </h1>
        <p className="text-muted-foreground">
          The system will record time, distance, and speed.
        </p>
      </div>

      <ActivityClient activityType="Running">
        {(isStarted) => isStarted && <RunningTracker />}
      </ActivityClient>
    </div>
  );
}
