
export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  weight?: number;
  height?: number;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  location?: string;
  state?: string;
  village?: string;
  avatarUrl?: string;
};

export type ActivityType = 'Running' | 'Long Jump' | 'Sit-ups' | 'Push-ups' | 'High Jump';

export type LeaderboardEntry = {
  rank: number;
  user: User;
  activity: ActivityType;
  score: number;
  metric: 'Time' | 'CM';
};
