
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ActivityType } from '@/lib/types';
import { Button } from './ui/button';

interface ActivityCardProps {
  name: ActivityType;
  href: string;
  description: string;
  imageId: string;
}

export function ActivityCard({ name, href, description, imageId }: ActivityCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === imageId);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={href} className="block">
        <CardHeader className="p-0">
          {placeholder && (
            <div className="relative h-40 w-full">
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                fill
                className="object-cover"
                data-ai-hint={placeholder.imageHint}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-headline text-lg font-semibold">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <Button variant="link" className="mt-2 p-0 h-auto text-primary">
            Start Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}
