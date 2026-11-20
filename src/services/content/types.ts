import {
  LearningResource,
  ResourceType,
  PublicationStatus,
  DiscoveryMethod,
  AvailabilityStatus,
} from '../../types';

export interface DiscoveredResource {
  id: string;
  externalId: string;
  providerId: string;
  title: string;
  description: string;
  sourceUrl: string;
  resourceType: ResourceType;
  suggestedDomain: string;
  suggestedSkillIds: string[];
  difficultyLevel: 'foundation' | 'intermediate' | 'advanced' | 'offscript';
  estimatedDurationMinutes: number;
  pricingType: 'free' | 'freemium' | 'paid';
  attributionText: string;
  license: string;
  discoveredAt: string;
  reviewStatus: 'unreviewed' | 'approved' | 'rejected';
  rejectionReason?: string;
  discoveryMethod: DiscoveryMethod;
}

export interface ContentSyncResult {
  providerId: string;
  providerName: string;
  timestamp: string;
  discoveredCount: number;
  newItemsCount: number;
  errors?: string[];
  status: 'success' | 'partial' | 'failed';
}

export interface ContentFilter {
  providerId?: string;
  domain?: string;
  skillId?: string;
  resourceType?: ResourceType;
  pricingType?: 'free' | 'freemium' | 'paid';
  difficulty?: string;
  searchQuery?: string;
  publicationStatus?: PublicationStatus;
  availabilityStatus?: AvailabilityStatus;
}

export interface ContentProviderAdapter {
  providerId: string;
  name: string;
  isAutomated: boolean;
  discoverResources(filter?: ContentFilter): Promise<DiscoveredResource[]>;
  verifyAvailability(resourceId: string, url: string): Promise<AvailabilityStatus>;
  fetchResourceMetadata(externalUrl: string): Promise<Partial<LearningResource> | null>;
}
