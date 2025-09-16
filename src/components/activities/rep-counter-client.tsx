
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, CheckCircle, BarChart, Flame, Video } from 'lucide-react';
import { countSitupsPushups } from '@/ai/flows/count-situps-pushups';
import type { ActivityType } from '@/lib/types';

interface RepCounterClientProps {
  activityType: 'sit-up' | 'push-up';
}

type CountResult = {
  repetitionCount: number;
  formCorrectness: number;
  feedback: string;
  caloriesBurned: number;
};

export function RepCounterClient({ activityType }: RepCounterClientProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CountResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleAnalysis = async () => {
    if (!file) {
      setError('Please upload a video file.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const dataUri = await toDataURL(file);
      const analysisResult = await countSitupsPushups({
        exerciseType: activityType,
        videoDataUri: dataUri,
      });
      setResult(analysisResult);
    } catch (e) {
      console.error(e);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    setFile(null);
    setResult(null);
    setError(null);
  }

  if (result) {
      return (
        <div className="space-y-8">
            <div className="relative text-center">
                 <p className="text-lg text-muted-foreground">Total Reps</p>
                 <p className="font-headline text-9xl font-bold text-primary">{result.repetitionCount}</p>
                 <div className="absolute top-0 right-0">
                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader className="flex flex-row items-center gap-2 p-3">
                        <Flame className="h-5 w-5" />
                        <CardTitle className="text-lg font-bold font-mono">
                            {result.caloriesBurned} cal
                        </CardTitle>
                        </CardHeader>
                    </Card>
                 </div>
            </div>
             <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2"><CardTitle>Form Correctness</CardTitle></CardHeader>
                    <CardContent className="text-3xl font-bold">{result.formCorrectness}%</CardContent>
                </Card>
                 <Card>
                    <CardHeader className="pb-2"><CardTitle>Calories Burned</CardTitle></CardHeader>
                    <CardContent className="text-3xl font-bold">{result.caloriesBurned}</CardContent>
                </Card>
            </div>
            <Alert>
                <BarChart className="h-4 w-4" />
                <AlertTitle>AI Feedback</AlertTitle>
                <AlertDescription>{result.feedback}</AlertDescription>
            </Alert>
            <Button size="lg" onClick={handleNewSession} className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" /> Start New Session
            </Button>
        </div>
      )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed bg-secondary/50 p-4 text-center">
        <Video className="h-16 w-16 text-muted-foreground/50" />
        <h3 className="font-semibold">
          {file ? `File Selected: ${file.name}` : 'Upload your performance video'}
        </h3>
        <p className="text-sm text-muted-foreground">
          The AI will count your reps, track form, and calculate calories burned.
        </p>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="video" type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={isLoading} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button size="lg" onClick={handleAnalysis} disabled={isLoading || !file}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Video...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Analyze Performance
          </>
        )}
      </Button>
    </div>
  );
}
