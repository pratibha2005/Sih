
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, UserCheck, ShieldAlert, CheckCircle, Camera } from 'lucide-react';
import { analyzeBodyScan } from '@/ai/flows/analyze-body-scan';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ActivityType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface BodyScanModalProps {
  activityType: ActivityType;
  onScanComplete: () => void;
}

type ScanResult = {
  readinessAssessment: string;
  recommendations: string;
};

export function BodyScanModal({ activityType, onScanComplete }: BodyScanModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const placeholder = PlaceHolderImages.find(p => p.id === 'body-scan-placeholder');

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!open) return;
      
      // Reset state when dialog opens
      setCapturedImage(null);
      setResult(null);
      setError(null);
      setHasCameraPermission(null);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
        // Stop camera stream when component unmounts or dialog closes
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [open, toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUri);
      }
    }
  };

  const handleScan = async () => {
    if (!capturedImage) {
      setError('Please capture an image for the body scan.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const scanResult = await analyzeBodyScan({
        activityType,
        bodyScanDataUri: capturedImage,
        userHeightCm: 175,
        userWeightKg: 70,
        userAge: 28,
        userGender: 'Male',
      });
      setResult(scanResult);
    } catch (e) {
      console.error(e);
      setError('An error occurred during the analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    onScanComplete();
    setOpen(false);
  }

  const handleRetake = () => {
    setCapturedImage(null);
    setError(null);
  };

  const renderContent = () => {
    if (result) {
      return (
        <div className="space-y-4">
            <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Readiness Assessment</AlertTitle>
                <AlertDescription>{result.readinessAssessment}</AlertDescription>
            </Alert>
             <Alert variant="default" className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
                <ShieldAlert className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertTitle>Recommendations</AlertTitle>
                <AlertDescription>{result.recommendations}</AlertDescription>
            </Alert>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-96 w-full overflow-hidden rounded-lg border-2 border-dashed">
            {capturedImage ? (
                <Image src={capturedImage} alt="Captured" fill className="object-cover"/>
            ) : (
              <video ref={videoRef} className={`h-full w-full object-cover ${hasCameraPermission === true ? '' : 'hidden'}`} autoPlay muted playsInline />
            )}

            {hasCameraPermission === false && (
                 <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <Camera className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <Alert variant="destructive">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access in your browser to use this feature. You might need to reload the page after granting permission.
                      </AlertDescription>
                    </Alert>
                </div>
            )}
             {hasCameraPermission === null && !capturedImage && placeholder && (
                <Image src={placeholder.imageUrl} alt="Placeholder" fill className="object-cover" data-ai-hint={placeholder.imageHint} />
            )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  };

  const renderFooter = () => {
    if (result) {
        return (
            <Button onClick={handleStart} className="w-full sm:w-auto">
                <CheckCircle className="mr-2 h-4 w-4" />
                Ready to Start
            </Button>
        );
    }
    
    if (capturedImage) {
        return (
            <>
                <Button variant="outline" onClick={handleRetake} disabled={isLoading}>Retake Photo</Button>
                <Button onClick={handleScan} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                    </>
                ) : (
                    'Analyze Readiness'
                )}
                </Button>
            </>
        );
    }

    return (
        <Button onClick={handleCapture} disabled={hasCameraPermission !== true}>
            <Camera className="mr-2 h-4 w-4" />
            Capture Photo
        </Button>
    )

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
            <UserCheck className="mr-2 h-5 w-5" />
            Start with Body Scan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Body Scan: {activityType}</DialogTitle>
          <DialogDescription>
            Use your camera to take a full-body photo to analyze your posture and readiness.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {renderContent()}
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
            {renderFooter()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
