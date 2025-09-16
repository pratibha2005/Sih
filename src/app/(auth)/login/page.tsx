
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { DumbbellIcon } from '@/components/icons';

export default function LoginPage() {
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
          <CardTitle className="font-headline text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium text-primary underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}
