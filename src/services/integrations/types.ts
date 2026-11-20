import { ToolIntegration, IntegrationStatus } from '../../types';

export interface ToolCapabilityDefinition {
  id: string;
  name: string;
  description: string;
}

export interface ToolRegistryEntry extends ToolIntegration {
  tier: 1 | 2 | 3 | 4;
  categoryLabel: string;
  websiteUrl?: string;
  launchUrl?: string;
  embedSupported: boolean;
  deepApiSupported: boolean;
  supportedInputTypes: string[];
  supportedOutputTypes: string[];
  documentationSummary: string;
  isNative: boolean;
}

export interface ToolConnectionCheck {
  toolId: string;
  toolKey: string;
  status: IntegrationStatus;
  lastCheckedAt: string;
  latencyMs?: number;
  message?: string;
}
