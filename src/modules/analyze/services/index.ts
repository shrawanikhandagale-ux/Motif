import { MetricInsight } from '../../../types';
import { storageService } from '../../../services/storage';
import { MOCK_METRICS, MOCK_INSIGHTS } from './mock/metrics';

export async function getMetrics() {
  return MOCK_METRICS;
}

export async function getInsights(): Promise<MetricInsight[]> {
  return MOCK_INSIGHTS;
}

export async function loopBackToLearn(pathId: string, headline: string): Promise<boolean> {
  storageService.addHandoffLog(
    'analyze',
    'learn',
    `Insight "${headline}" closed the loop back to Learn curriculum (${pathId}).`
  );
  return true;
}

