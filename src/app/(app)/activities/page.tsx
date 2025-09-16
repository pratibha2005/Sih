
import { ActivityCard } from '@/components/activity-card';
import type { ActivityType } from '@/lib/types';

const activities: { name: ActivityType; href: string; description: string; imageId: string; }[] = [
    { name: 'Running', href: '/activities/running', description: 'Track your pace and distance.', imageId: 'running-card' },
    { name: 'Long Jump', href: '/activities/long-jump', description: 'Measure your explosive power.', imageId: 'long-jump-card' },
    { name: 'Sit-ups', href: '/activities/sit-ups', description: 'Count your reps and check form.', imageId: 'sit-ups-card' },
    { name: 'Push-ups', href: '/activities/push-ups', description: 'Build upper body strength.', imageId: 'push-ups-card' },
    { name: 'High Jump', href: '/activities/high-jump', description: 'Test your vertical leap.', imageId: 'high-jump-card' },
];

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Choose Your Arena
        </h1>
        <p className="text-muted-foreground">
          Select an activity below to start a new session and track your performance.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
              <ActivityCard 
                  key={activity.name}
                  name={activity.name}
                  href={activity.href}
                  description={activity.description}
                  imageId={activity.imageId}
              />
          ))}
      </div>
    </div>
  );
}
