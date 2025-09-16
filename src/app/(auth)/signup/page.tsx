
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from '@/components/auth/signup-form';
import { DumbbellIcon } from '@/components/icons';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
       <div className="flex items-center gap-4">
        <DumbbellIcon className="h-10 w-10 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter">
          BodyMetrics Arena
        </h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account to start your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
