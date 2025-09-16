
import type { LeaderboardEntry, User, ActivityType } from './types';

export const mockUsers: User[] = [
  {
    id: 'usr_1',
    fullName: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '123-456-7890',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    age: 28,
    gender: 'Male',
    state: 'California',
    village: 'Sunnyvale',
  },
  {
    id: 'usr_2',
    fullName: 'Maria Garcia',
    email: 'maria.g@example.com',
    phone: '234-567-8901',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    age: 24,
    gender: 'Female',
    state: 'Texas',
    village: 'Plano',
  },
  {
    id: 'usr_3',
    fullName: 'Sam Lee',
    email: 'sam.l@example.com',
    phone: '345-678-9012',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    age: 32,
    gender: 'Male',
    state: 'New York',
    village: 'Scarsdale',
  },
    {
    id: 'usr_4',
    fullName: 'Priya Patel',
    email: 'priya.p@example.com',
    phone: '456-789-0123',
    avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    age: 29,
    gender: 'Female',
    state: 'California',
    village: 'Fremont',
  },
  {
    id: 'usr_5',
    fullName: 'Ben Carter',
    email: 'ben.c@example.com',
    phone: '567-890-1234',
    avatarUrl: 'https://picsum.photos/seed/avatar5/100/100',
    age: 22,
    gender: 'Male',
    state: 'Florida',
    village: 'Miami',
  },
];

const generateLeaderboardData = (activity: ActivityType): LeaderboardEntry[] => {
  const metric = activity === 'Running' ? 'Time' : 'CM';
  return mockUsers.map((user, index) => ({
    rank: index + 1,
    user,
    activity,
    score: metric === 'Time' ? parseFloat((Math.random() * (15 - 10) + 10).toFixed(2)) : Math.floor(Math.random() * (250 - 50) + 50),
    metric,
  })).sort((a, b) => (a.metric === 'Time' ? a.score - b.score : b.score - a.score))
   .map((entry, index) => ({...entry, rank: index+1}));
};

export const mockLeaderboard: Record<ActivityType, LeaderboardEntry[]> = {
  'Running': generateLeaderboardData('Running'),
  'Long Jump': generateLeaderboardData('Long Jump'),
  'Sit-ups': generateLeaderboardData('Sit-ups'),
  'Push-ups': generateLeaderboardData('Push-ups'),
  'High Jump': generateLeaderboardData('High Jump'),
};
