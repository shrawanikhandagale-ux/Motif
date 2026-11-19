import { Skill, Path, Brief, Resource } from '../../../types';
import { MOCK_SKILLS } from './mock/mockSkills';
import { MOCK_PATHS } from './mock/mockPaths';
import { MOCK_BRIEFS } from './mock/mockBriefs';
import { MOCK_RESOURCES } from './mock/mockResources';

/**
 * Learn Service
 * All methods are asynchronous to allow seamless future swap with Supabase client queries.
 */
export const learnService = {
  async getSkills(domain?: string): Promise<Skill[]> {
    if (!domain) return MOCK_SKILLS;
    return MOCK_SKILLS.filter(
      (s) => s.domain.toLowerCase() === domain.toLowerCase()
    );
  },

  async getSkill(id: string): Promise<Skill | null> {
    return MOCK_SKILLS.find((s) => s.id === id) || null;
  },

  async getPaths(domain?: string): Promise<Path[]> {
    if (!domain) return MOCK_PATHS;
    return MOCK_PATHS.filter(
      (p) => p.domain.toLowerCase() === domain.toLowerCase()
    );
  },

  async getPath(idOrSlug: string): Promise<Path | null> {
    return (
      MOCK_PATHS.find(
        (p) => p.id === idOrSlug || p.slug === idOrSlug
      ) || null
    );
  },

  async getBriefs(): Promise<Brief[]> {
    return MOCK_BRIEFS;
  },

  async getBrief(id: string): Promise<Brief | null> {
    return MOCK_BRIEFS.find((b) => b.id === id) || null;
  },

  async getResources(domainOrCategory?: string): Promise<Resource[]> {
    if (!domainOrCategory) return MOCK_RESOURCES;
    const filter = domainOrCategory.toLowerCase();
    return MOCK_RESOURCES.filter(
      (r) =>
        r.domain.toLowerCase() === filter ||
        r.category.toLowerCase() === filter
    );
  },
};

export const {
  getSkills,
  getPaths,
  getPath,
  getBrief,
  getResources,
  getBriefs,
  getSkill,
} = learnService;

export default learnService;

