
import { ActivityClient } from '@/components/activities/activity-client';
import { RepCounterClient } from '@/components/activities/rep-counter-client';

export default function SitupsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Sit-ups
        </h1>
        <p className="text-muted-foreground">
          AI detects bending motion and counts reps automatically.
        </p>
      </div>

      <ActivityClient activityType="Sit-ups">
        {(isStarted) => isStarted && <RepCounterClient activityType="sit-up" />}
      </ActivityClient>
    </div>
  );
}
