import { RouteObject } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import {
  LearnPage,
  PathsListPage,
  PathDetailPage,
  BriefRoomPage,
  BriefDetailPage,
  SkillMapPage,
  LibraryPage,
} from '../modules/learn/pages';
import {
  CreatePage,
  ProjectDetailPage,
  BriefBuilderPage,
  AssetLibraryPage,
} from '../modules/create/pages';
import {
  MarketPage,
  ContentPlannerPage,
  CampaignsPage,
  ConnectionsPage,
  IncomingAssetsPage,
} from '../modules/market/pages';
import {
  ManagePage,
  ClientsPage,
  TasksPage,
  FinancePage,
} from '../modules/manage/pages';
import {
  AnalyzePage,
  LearningVsProvenPage,
  InsightsPage,
} from '../modules/analyze/pages';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { DevTokensPage } from './DevTokensPage';
import { DevComponentsPage } from './DevComponentsPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    element: <AppShell />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'learn',
        element: <LearnPage />,
      },
      {
        path: 'learn/paths',
        element: <PathsListPage />,
      },
      {
        path: 'learn/paths/:id',
        element: <PathDetailPage />,
      },
      {
        path: 'learn/briefs',
        element: <BriefRoomPage />,
      },
      {
        path: 'learn/briefs/:id',
        element: <BriefDetailPage />,
      },
      {
        path: 'learn/map',
        element: <SkillMapPage />,
      },
      {
        path: 'learn/library',
        element: <LibraryPage />,
      },
      {
        path: 'create',
        element: <CreatePage />,
      },
      {
        path: 'create/builder',
        element: <BriefBuilderPage />,
      },
      {
        path: 'create/assets',
        element: <AssetLibraryPage />,
      },
      {
        path: 'create/projects/:id',
        element: <ProjectDetailPage />,
      },
      {
        path: 'market',
        element: <MarketPage />,
      },
      {
        path: 'market/planner',
        element: <ContentPlannerPage />,
      },
      {
        path: 'market/campaigns',
        element: <CampaignsPage />,
      },
      {
        path: 'market/connections',
        element: <ConnectionsPage />,
      },
      {
        path: 'market/assets',
        element: <IncomingAssetsPage />,
      },
      {
        path: 'manage',
        element: <ManagePage />,
      },
      {
        path: 'manage/clients',
        element: <ClientsPage />,
      },
      {
        path: 'manage/tasks',
        element: <TasksPage />,
      },
      {
        path: 'manage/finance',
        element: <FinancePage />,
      },
      {
        path: 'analyze',
        element: <AnalyzePage />,
      },
      {
        path: 'analyze/learning',
        element: <LearningVsProvenPage />,
      },
      {
        path: 'analyze/insights',
        element: <InsightsPage />,
      },
      ...(import.meta.env.DEV
        ? [
            {
              path: 'dev/tokens',
              element: <DevTokensPage />,
            },
            {
              path: 'dev/components',
              element: <DevComponentsPage />,
            },
          ]
        : []),
    ],
  },
  {
    path: '*',
    element: <LandingPage />,
  },
];
