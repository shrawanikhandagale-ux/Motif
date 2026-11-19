import { MetricInsight } from '../../../types';
import { MOCK_METRICS, MOCK_INSIGHTS } from './mock/metrics';

export async function getMetrics() {
  return MOCK_METRICS;
}

export async function getInsights(): Promise<MetricInsight[]> {
  return MOCK_INSIGHTS;
}

export async function loopBackToLearn(_pathId: string, _headline: string): Promise<boolean> {
  return true;
}
