import { ClientRecord } from '../../../../types';

export const MOCK_CLIENTS: ClientRecord[] = [
  {
    id: 'cli-01',
    name: 'Offscript Press',
    industry: 'Independent Publishing',
    status: 'active',
    activeProjectsCount: 2,
    contactEmail: 'editor@offscriptpress.org',
  },
  {
    id: 'cli-02',
    name: 'Kilo Apparel',
    industry: 'Streetwear & Goods',
    status: 'active',
    activeProjectsCount: 1,
    contactEmail: 'ops@kiloapparel.co',
  },
  {
    id: 'cli-03',
    name: 'Sundown Records',
    industry: 'Vinyl Imprint',
    status: 'lead',
    activeProjectsCount: 0,
    contactEmail: 'a-and-r@sundownrecs.fm',
  },
];

export const MOCK_DELIVERABLES = [
  { id: 'del-1', title: 'Editorial Type Specimen Sign-off', client: 'Offscript Press', status: 'Done' },
  { id: 'del-2', title: 'Drop Campaign Content Schedule', client: 'Offscript Press', status: 'In Review' },
  { id: 'del-3', title: 'Acid Halftone Separations', client: 'Kilo Apparel', status: 'Doing' },
  { id: 'del-4', title: 'Contract & Retainer Scope', client: 'Sundown Records', status: 'Queued' },
];

