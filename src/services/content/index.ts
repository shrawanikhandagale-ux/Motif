export * from './types';
export * from './registry';
import { VERIFIED_PROVIDERS } from './registry';
import { LearningProvider, LearningResource } from '../../types';
import { DiscoveredResource, ContentFilter, ContentSyncResult } from './types';

// Mock in-memory staging table for discovered content awaiting editorial review
const STAGING_REGISTRY: DiscoveredResource[] = [
  {
    id: 'disc-01',
    externalId: 'hubspot-inbound-2026',
    providerId: 'prv-hubspot',
    title: 'Inbound Marketing & Editorial Flywheels',
    description: 'Comprehensive certification covering content mapping, high-intent landing architecture, and nurture flows.',
    sourceUrl: 'https://academy.hubspot.com/courses/inbound-marketing',
    resourceType: 'course',
    suggestedDomain: 'Marketing',
    suggestedSkillIds: ['sk-mkt-01', 'sk-mkt-04'],
    difficultyLevel: 'intermediate',
    estimatedDurationMinutes: 240,
    pricingType: 'free',
    attributionText: 'HubSpot Academy Inbound Course',
    license: 'Proprietary / Free Access',
    discoveredAt: '2026-11-18T10:00:00Z',
    reviewStatus: 'unreviewed',
    discoveryMethod: 'api_sync',
  },
  {
    id: 'disc-02',
    externalId: 'figma-autolayout-v4',
    providerId: 'prv-figma-learn',
    title: 'Advanced Dynamic Layouts & Component Tokens',
    description: 'Deep dive into responsive layout grids, min/max dimensions, and token mapping in Figma.',
    sourceUrl: 'https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout',
    resourceType: 'guide',
    suggestedDomain: 'UI/UX',
    suggestedSkillIds: ['sk-ui-02', 'sk-ui-05'],
    difficultyLevel: 'advanced',
    estimatedDurationMinutes: 90,
    pricingType: 'free',
    attributionText: 'Figma Official Learn Portal',
    license: 'Proprietary / Free Access',
    discoveredAt: '2026-11-19T14:30:00Z',
    reviewStatus: 'unreviewed',
    discoveryMethod: 'manual_curation',
  },
];

export const contentService = {
  async getProviders(): Promise<LearningProvider[]> {
    return VERIFIED_PROVIDERS;
  },

  async getProvider(idOrSlug: string): Promise<LearningProvider | null> {
    return (
      VERIFIED_PROVIDERS.find(
        (p) => p.id === idOrSlug || p.slug === idOrSlug
      ) || null
    );
  },

  async getDiscoveredResources(filter?: ContentFilter): Promise<DiscoveredResource[]> {
    let list = [...STAGING_REGISTRY];
    if (filter?.providerId) {
      list = list.filter((r) => r.providerId === filter.providerId);
    }
    if (filter?.domain) {
      list = list.filter((r) => r.suggestedDomain.toLowerCase() === filter.domain?.toLowerCase());
    }
    return list;
  },

  async approveResource(discoveredId: string): Promise<LearningResource | null> {
    const item = STAGING_REGISTRY.find((r) => r.id === discoveredId);
    if (!item) return null;
    item.reviewStatus = 'approved';

    const published: LearningResource = {
      id: `res-pub-${Date.now()}`,
      title: item.title,
      description: item.description,
      subject: item.suggestedDomain,
      resourceType: item.resourceType,
      skillIds: item.suggestedSkillIds,
      difficultyLevel: item.difficultyLevel,
      estimatedDurationMinutes: item.estimatedDurationMinutes,
      pricingType: item.pricingType,
      originalSourceUrl: item.sourceUrl,
      providerId: item.providerId,
      attributionAndLicensing: {
        providerName: item.attributionText,
        license: item.license,
      },
      publicationStatus: 'published',
      verificationDate: new Date().toISOString(),
      discoveryMethod: item.discoveryMethod,
      contentAvailabilityStatus: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return published;
  },

  async rejectResource(discoveredId: string, reason: string): Promise<boolean> {
    const item = STAGING_REGISTRY.find((r) => r.id === discoveredId);
    if (!item) return false;
    item.reviewStatus = 'rejected';
    item.rejectionReason = reason;
    return true;
  },

  async syncProvider(providerId: string): Promise<ContentSyncResult> {
    const provider = await this.getProvider(providerId);
    return {
      providerId,
      providerName: provider?.name || providerId,
      timestamp: new Date().toISOString(),
      discoveredCount: 2,
      newItemsCount: 1,
      status: 'success',
    };
  },
};

export default contentService;

