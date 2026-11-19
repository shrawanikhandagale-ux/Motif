import { RouteObject } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import {
  LearnPage,
  PathsListPage,
  PathDetailPage,
  BriefDetailPage,
  SkillMapPage,
  LibraryPage,
} from '../modules/learn/pages';
import { CreatePage, ProjectDetailPage } from '../modules/create/pages';
import { MarketPage } from '../modules/market/pages/MarketPage';
import { ManagePage } from '../modules/manage/pages/ManagePage';
import { AnalyzePage } from '../modules/analyze/pages/AnalyzePage';
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
        path: 'create/projects/:id',
        element: <ProjectDetailPage />,
      },
      {
        path: 'market',
        element: <MarketPage />,
      },
      {
        path: 'manage',
        element: <ManagePage />,
      },
      {
        path: 'analyze',
        element: <AnalyzePage />,
      },
      {
        path: 'dev/tokens',
        element: <DevTokensPage />,
      },
      {
        path: 'dev/components',
        element: <DevComponentsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <LandingPage />,
  },
];
