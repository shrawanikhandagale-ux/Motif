import { ClientRecord } from '../../../types';
import { MOCK_CLIENTS, MOCK_DELIVERABLES } from './mock/clients';

export async function getClients(): Promise<ClientRecord[]> {
  return MOCK_CLIENTS;
}

export async function getTasks() {
  return MOCK_DELIVERABLES;
}

export async function reportToAnalyze(_clientName: string): Promise<boolean> {
  return true;
}
