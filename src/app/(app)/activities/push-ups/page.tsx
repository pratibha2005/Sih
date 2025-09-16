
import { ActivityClient } from '@/components/activities/activity-client';
import { RepCounterClient } from '@/components/activities/rep-counter-client';

export default function PushupsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Push-ups
        </h1>
        <p className="text-muted-foreground">
          AI tracks full arm extension and bend for rep validation.
        </p>
      </div>

      <ActivityClient activityType="Push-ups">
        {(isStarted) => isStarted && <RepCounterClient activityType="push-up" />}
      </ActivityClient>
    </div>
  );
}
