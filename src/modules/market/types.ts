export type MarketCategory = 'all' | 'zines' | 'fonts' | 'templates' | 'services' | 'graphics';

export interface MarketListing {
  id: string;
  title: string;
  category: 'zines' | 'fonts' | 'templates' | 'services' | 'graphics';
  creatorName: string;
  creatorHandle: string;
  priceFormatted: string;
  coverColor: string;
  badge: string;
  description: string;
  deliverables: string[];
  tags: string[];
  rating?: string;
  featured?: boolean;
  availabilityStatus: 'available' | 'limited' | 'sold_out';
}

