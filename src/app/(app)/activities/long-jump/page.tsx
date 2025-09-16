
'use client';

import { useState } from 'react';
import { ActivityClient } from '@/components/activities/activity-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler, ChevronsRight, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function LongJumpTracker() {
  const [distance, setDistance] = useState(0);
  const [bestAttempt, setBestAttempt] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [phase, setPhase] = useState<'start' | 'land' | 'result'>('start');

  const handleAction = () => {
    if (phase === 'start') {
      setPhase('land');
    } else if (phase === 'land') {
      const newDistance = Math.floor(Math.random() * (250 - 150 + 1)) + 150; // Random distance between 150-250cm
      setDistance(newDistance);
      setAttempts(prev => [...prev, newDistance]);
      if (newDistance > bestAttempt) {
        setBestAttempt(newDistance);
      }
      setPhase('result');
    } else {
        setDistance(0);
        setPhase('start');
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full gap-4 md:grid-cols-2">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Best Attempt</CardTitle><Trophy className="h-4 w-4 text-muted-foreground"/></CardHeader>
          <CardContent><div className="text-2xl font-bold font-mono">{bestAttempt} cm</div></CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Last Jump</CardTitle><ChevronsRight className="h-4 w-4 text-muted-foreground"/></CardHeader>
          <CardContent><div className="text-2xl font-bold font-mono">{distance} cm</div></CardContent>
        </Card>
      </div>
      
      <div className="relative flex h-64 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed bg-secondary/50">
        <Ruler className="h-16 w-16 text-muted-foreground/50" />
        {phase === 'result' && (
            <p className="mt-4 font-headline text-6xl font-bold text-primary">{distance} <span className="text-4xl text-muted-foreground">cm</span></p>
        )}
        <p className="mt-2 text-muted-foreground">
          {phase === 'start' && "Press the button to mark your starting point."}
          {phase === 'land' && "Jump, then press the button to mark your landing point."}
          {phase === 'result' && "Great jump! Ready for another?"}
        </p>
      </div>

      <Button size="lg" onClick={handleAction}>
        {phase === 'start' && 'Scan Starting Point'}
        {phase === 'land' && 'Scan Landing Point'}
        {phase === 'result' && 'Next Attempt'}
      </Button>

      {attempts.length > 0 && (
          <div className="w-full">
            <h3 className="font-headline text-lg font-semibold">Attempt History</h3>
            <div className="mt-2 flex flex-wrap gap-2">
                {attempts.map((att, index) => (
                    <Badge key={index} variant={att === bestAttempt ? "default" : "secondary"}>Attempt {index+1}: {att} cm</Badge>
                ))}
            </div>
          </div>
      )}
    </div>
  );
}

export default function LongJumpPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Long Jump
        </h1>
        <p className="text-muted-foreground">
          The system will scan your start and end points to measure distance.
        </p>
      </div>

      <ActivityClient activityType="Long Jump">
        {(isStarted) => isStarted && <LongJumpTracker />}
      </ActivityClient>
    </div>
  );
}
