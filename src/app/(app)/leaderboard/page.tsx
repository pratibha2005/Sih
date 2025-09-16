
import { LeaderboardClient } from "@/components/leaderboard/leaderboard-client";
import { mockLeaderboard } from "@/lib/data";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          See who is topping the charts. Filter by activity and location.
        </p>
      </div>

      <LeaderboardClient initialData={mockLeaderboard} />
    </div>
  );
}
