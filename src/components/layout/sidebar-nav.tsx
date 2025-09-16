
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Trophy,
  User,
  Activity,
} from 'lucide-react';

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  Sidebar,
} from '@/components/ui/sidebar';
import { DumbbellIcon } from '@/components/icons';

const links = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/activities', label: 'Activities', icon: Activity },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/profile', label: 'Profile', icon: User },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 p-1">
          <DumbbellIcon className="h-8 w-8 text-primary" />
          <h2 className="font-headline text-xl font-semibold tracking-tight text-primary-foreground">
            BodyMetrics
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <div className="text-xs text-sidebar-foreground/50">
          © 2024 BodyMetrics Arena
        </div>
      </SidebarFooter>
    </>
  );
}
