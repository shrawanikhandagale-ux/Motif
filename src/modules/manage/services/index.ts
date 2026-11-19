import { ClientRecord } from '../../../types';
import { storageService } from '../../../services/storage';
import { MOCK_CLIENTS, MOCK_DELIVERABLES } from './mock/clients';

export async function getClients(): Promise<ClientRecord[]> {
  return MOCK_CLIENTS;
}

export async function getTasks() {
  return MOCK_DELIVERABLES;
}

export async function reportToAnalyze(clientName: string): Promise<boolean> {
  storageService.addHandoffLog(
    'manage',
    'analyze',
    `Reported deliverables and live campaign metrics for ${clientName} to Analyze & Grow.`
  );
  return true;
}

