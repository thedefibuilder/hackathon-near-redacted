"use client";

import { IconBook, IconCategory2, IconEye, IconHeartRateMonitor, IconTransfer, IconUser, IconWallet, TablerIcon } from "@tabler/icons-react";

export enum ESidebarRoutesName {
  dashboard = "Dashboard",
  portfolio ='Portfolio',
  trading='Trading',
  watchlist='Watchlist',
  academy='Academy',
  profile='Profile',
  wallet='Wallet',
}

export enum ESidebarRoutesPath {
    dashboard = "/",
    portfolio ='/portfolio',
    trading='/trading',
    watchlist='/watchlist',
    academy='/academy',
    profile='/profile',
    wallet='/wallet',
}

interface SidebarRoute {
  name: ESidebarRoutesName;
  path: ESidebarRoutesPath;
  icon: TablerIcon;
}

export const sidebarRoutes: SidebarRoute[] = [
  {
    name: ESidebarRoutesName.dashboard,
    path: ESidebarRoutesPath.dashboard,
    icon: IconCategory2,
  },
  {
    name: ESidebarRoutesName.portfolio,
    path: ESidebarRoutesPath.portfolio,
    icon: IconHeartRateMonitor,
  },
  {
    name: ESidebarRoutesName.trading,
    path: ESidebarRoutesPath.trading,
    icon: IconTransfer,
  },
  {
    name: ESidebarRoutesName.watchlist,
    path: ESidebarRoutesPath.watchlist,
    icon: IconEye,
  },
  {
    name: ESidebarRoutesName.academy,
    path: ESidebarRoutesPath.academy,
    icon: IconBook,
  },
  {
    name: ESidebarRoutesName.profile,
    path: ESidebarRoutesPath.profile,
    icon: IconUser,
  },
  {
    name: ESidebarRoutesName.wallet,
    path: ESidebarRoutesPath.wallet,
    icon: IconWallet,
  },

];
