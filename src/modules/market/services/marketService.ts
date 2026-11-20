import { MarketListing } from '../types';
import { MOCK_LISTINGS } from './mock/mockListings';

const STORAGE_KEY = 'motif_market_listings';

export const marketService = {
  getListings(): MarketListing[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to defaults
    }
    return MOCK_LISTINGS;
  },

  getListing(id: string): MarketListing | null {
    const all = this.getListings();
    return all.find((l) => l.id === id) || null;
  },

  createListing(listing: Omit<MarketListing, 'id'>): MarketListing {
    const all = this.getListings();
    const id = `list-${Date.now().toString(36)}`;
    const newRecord: MarketListing = {
      ...listing,
      id,
    };
    const updated = [newRecord, ...all];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Silent error handling
    }
    return newRecord;
  },
};

