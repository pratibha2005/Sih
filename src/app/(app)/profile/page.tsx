
import { ProfileForm } from '@/components/profile/profile-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Your Profile
      </h1>
      <p className="text-muted-foreground">
        Complete your profile to get personalized analysis.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>
            This information helps us tailor your experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
