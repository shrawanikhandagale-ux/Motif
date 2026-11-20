# MOTIF — Unified Content Registry & Provider Ingestion Pipeline

> **Status:** Specification & Architecture Blueprint (Batch 01)  
> **Product Direction:** Hybrid Academy — Original MOTIF Curriculum + Curated External Providers  
> **Scope:** Discovery Pipeline, Ingestion Adapters, Content Verification, and Attribution Engine  

---

## 1. Hybrid Academy Architecture

MOTIF's Department 01 (LEARN) operates as a **Hybrid Academy**. Rather than attempting to rewrite thousands of hours of foundational marketing or UX material from scratch, MOTIF combines:
1. **Original MOTIF Curriculum:** Irreverent, studio-grade creative business education. Gritty typography, tactile risograph layout, anti-template editorial systems, contrarian positioning, and underground release mechanics.
2. **Curated External Provider Content:** Top-tier certifications and open educational resources (OER) from vetted industry institutions (HubSpot, Google, Meta, Figma, Canva, OpenLearn, MIT, YouTube).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DISCOVERY & INGESTION TIER                      │
│                                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   HubSpot    │  │Google/Meta   │  │ Canva/Figma  │  │OpenLearn/  │  │
│  │   Academy    │  │  Skillshop   │  │Design School │  │  MIT OCW   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │
│         │ Official API    │ Documented Feeds│ Permitted OER  │ Public  │
└─────────┼─────────────────┼─────────────────┼────────────────┼─────────┘
          │                 │                 │                │
          ▼                 ▼                 ▼                ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   PROVIDER ADAPTER INTERFACE LAYER                     │
│               ContentProviderAdapter.discoverResources()              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                STAGING & REVIEW REGISTRY (UNPUBLISHED)                 │
│         Review Status: unreviewed · automated checks · quarantined      │
│  *External discovery NEVER automatically publishes to main catalog*    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                      Editorial Verification & Approval
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               UNIFIED PUBLISHED CATALOG (LEARN / LIBRARY)              │
│       Skills Mapped · Durations Verified · Direct Attribution Active   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Unified Content Registry Specification

Every resource in the MOTIF catalog adheres to the unified specification defined in `src/types/learning.ts`.

### 2.1 The 13 Core Metadata Attributes

| Field Name | Type | Description | Example Value |
|---|---|---|---|
| `id` | `string` | Unique immutable record identifier | `res-hubspot-inbound-01` |
| `providerId` | `string` | Reference to verified provider | `prv-hubspot` (or `prv-motif`) |
| `title` | `string` | Human-readable editorial title | `Inbound Marketing & Flywheel Architecture` |
| `description` | `string` | Comprehensive summary of what is learned | `Lead generation, high-intent editorial funnels, and retention.` |
| `subject` | `SkillDomain` | Primary domain taxonomy | `'Marketing'` (or `'Branding'`, `'Design'`, `'UI/UX'`) |
| `resourceType` | `ResourceType` | Granular structural format | `'course'`, `'specimen'`, `'tool'`, `'template'`, `'guide'`, `'video'` |
| `skillIds` | `string[]` | Associated MOTIF competency graph IDs | `['sk-mkt-01', 'sk-mkt-04']` |
| `difficultyLevel` | `SkillLevel` | Competency depth tier | `'foundation'`, `'intermediate'`, `'advanced'`, `'offscript'` |
| `estimatedDurationMinutes` | `number` | Time investment in minutes | `240` (4 hours) |
| `pricingType` | `PricingType` | Commercial classification | `'free'`, `'freemium'`, `'paid'` |
| `originalSourceUrl` | `string` | Canonical link to official provider | `https://academy.hubspot.com/courses/inbound` |
| `attributionAndLicensing` | `Object` | Provider name, license, author | `{ providerName: 'HubSpot', license: 'Free Access' }` |
| `publicationStatus` | `PublicationStatus` | Editorial state in MOTIF | `'draft'`, `'pending_review'`, `'published'`, `'archived'` |
| `verificationDate` | `string` (ISO 8601)| Last manual or automated audit | `2026-11-20T10:00:00Z` |
| `discoveryMethod` | `DiscoveryMethod`| How resource entered pipeline | `'manual_curation'`, `'api_sync'`, `'community_submission'` |
| `contentAvailabilityStatus` | `AvailabilityStatus` | Health check state | `'active'`, `'broken_link'`, `'deprecated'`, `'restricted'` |

---

## 3. Separation of Discovery from Publication

### Core Rule: Staging Quarantine
**External discovery must never automatically publish unreviewed resources into the main learning catalogue.**

Automatic sync from external APIs or RSS feeds deposits raw items into `DiscoveredResource` records in a quarantined staging collection:
1. **Ingest Phase:** The provider adapter scrapes permitted metadata or calls public APIs to collect title, summary, URL, duration, and provider attributes.
2. **Automated Triage Phase:**
   - URL resolution & HTTP 200 response check.
   - Paywall detection (rejecting paywalled or gated content if advertised as free).
   - Duplicate prevention (matching canonical URLs).
   - Keyword-based taxonomy suggestions (matching domain skills).
3. **Editorial Review Phase:** A MOTIF curator reviews the staged item:
   - Evaluates design and educational quality.
   - Adjusts skill tag associations.
   - Verifies licensing and attribution compliance.
4. **Promotion to Published Catalog:** Once approved via `contentService.approveResource()`, the resource is committed to the live `LearningResource` catalog and becomes searchable in `/learn/library` and path references.

---

## 4. Provider Adapter Interface Architecture

All external integrations conform to the `ContentProviderAdapter` contract defined in `src/services/content/types.ts`:

```typescript
export interface ContentProviderAdapter {
  providerId: string;
  name: string;
  isAutomated: boolean;
  
  /** Discover new or updated resources from the provider's official endpoint */
  discoverResources(filter?: ContentFilter): Promise<DiscoveredResource[]>;
  
  /** Perform active health-check verifying the resource URL is live and unrestricted */
  verifyAvailability(resourceId: string, url: string): Promise<AvailabilityStatus>;
  
  /** Fetch deep metadata (author, syllabus, prerequisites) for a specific external URL */
  fetchResourceMetadata(externalUrl: string): Promise<Partial<LearningResource> | null>;
}
```

This interface ensures that new providers (e.g. Coursera, Skillshare, Substack, edX) can be added as isolated adapter modules without modifying the core Learn UI or database schemas.

---

## 5. Detailed Provider Integration Specifications

### 5.1 HubSpot Academy
- **Target Domains:** Marketing, CRM, Inbound Strategy.
- **Provider ID:** `prv-hubspot`
- **Integration Mechanism:** HubSpot Academy Public Course API / Developer Catalog Feed.
- **Data Extracted:** Course Title, Certification status, Duration, Skill topics, Direct enrollment URL.
- **Compliance & Attribution:** Prominently displays: *"Official Certification provided by HubSpot Academy. Completed on external platform."* Direct link to HubSpot certification verification. No reproduction of proprietary video/quiz assets.

### 5.2 Google Skillshop
- **Target Domains:** Marketing, Analytics, Search & Performance.
- **Provider ID:** `prv-google-skillshop`
- **Integration Mechanism:** Google Skillshop public topic sitemaps & official developer knowledge feeds.
- **Data Extracted:** GA4, Google Ads, and Search Console learning paths, completion time estimates, skill prerequisites.
- **Compliance & Attribution:** Google LLC trademark disclaimer; zero content caching; direct outbound routing for interactive exam completion.

### 5.3 Meta Blueprint
- **Target Domains:** Marketing, Social Distribution, Campaign Strategy.
- **Provider ID:** `prv-meta-blueprint`
- **Integration Mechanism:** Meta Business Learning documented course index feeds.
- **Data Extracted:** Instagram campaign architecture, creative strategy, Reels storytelling, ad policy guidelines.
- **Compliance & Attribution:** Attributed to Meta Platforms, Inc. Outbound deep-linking to official course modules.

### 5.4 Canva Design School
- **Target Domains:** Design, Branding, Social Collateral.
- **Provider ID:** `prv-canva-design-school`
- **Integration Mechanism:** Canva Design School RSS / Public Course Directory.
- **Data Extracted:** Graphic design fundamentals, color theory, font combinations, social layout kits, template playground links.
- **Compliance & Attribution:** Direct integration with Canva Connect APIs (see Creative Workspace). Links directly to open canvas templates.

### 5.5 Figma Learning Resources
- **Target Domains:** UI/UX, Design Systems, Vector Production.
- **Provider ID:** `prv-figma-learn`
- **Integration Mechanism:** Figma Help Center public REST API / Community Playground feeds.
- **Data Extracted:** Auto-layout mastery, interactive prototyping, variable token setup, typography scale tutorials.
- **Compliance & Attribution:** Figma, Inc. attribution. Direct links to duplicate community playground files into user Figma workspaces.

### 5.6 OpenLearn (The Open University)
- **Target Domains:** Branding, Critical Writing, Business Ethics, Media History.
- **Provider ID:** `prv-openlearn`
- **Integration Mechanism:** OpenLearn OER XML/OAI-PMH Harvesting API.
- **Data Extracted:** University-accredited open courses, full syllabi, reading materials.
- **Compliance & Attribution:** Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA 4.0). Full legal OER attribution, badge accreditation display, and license text linking.

### 5.7 MIT OpenCourseWare (OCW)
- **Target Domains:** Design Theory, Computer Graphics, Media Studies.
- **Provider ID:** `prv-mit-ocw`
- **Integration Mechanism:** MIT OCW API (Open Education Platform REST API).
- **Data Extracted:** Lecture notes, syllabus structure, reading assignments, project prompts.
- **Compliance & Attribution:** Creative Commons (CC BY-NC-SA). Strict adherence to MIT OCW attribution guidelines.

### 5.8 YouTube Data API v3 (Curated Design Dispatches)
- **Target Domains:** Critiques, Risograph Printing, Font Foundry Walkthroughs.
- **Provider ID:** `prv-youtube-design`
- **Integration Mechanism:** YouTube Data API v3 (Search / PlaylistItems endpoints using channel whitelist).
- **Data Extracted:** Video title, creator channel, duration (ISO 8601 duration parsed), thumbnail, upload date.
- **Compliance & Attribution:** Consumes official YouTube embed player (IFrame Player API). Views and ad telemetry remain with original creators. Adheres to YouTube Developer Terms of Service (no background audio, no video stream downloading).

---

## 6. Skill Mapping & Competency Graph Alignment

Every published resource must connect to at least one node on MOTIF's 28-node competency graph:

```
┌────────────────────────────────────────────────────────┐
│             MOTIF COMPETENCY GRAPH (28 SKILLS)         │
│                                                        │
│  [Branding]           [Design]           [Marketing]   │
│  sk-br-01 Type        sk-ds-01 Grid      sk-mkt-01 Funnel │
│  sk-br-04 Risograph   sk-ds-04 Halftone  sk-mkt-04 Drops  │
└───────────────────────────▲────────────────────────────┘
                            │
              Tagged in LearningResource.skillIds
                            │
┌───────────────────────────┴────────────────────────────┐
│                    LEARNING RESOURCE                   │
│   e.g. "Figma Auto-Layout v4" ──► Linked: sk-ds-01     │
│   e.g. "HubSpot Inbound 2026" ──► Linked: sk-mkt-01    │
└────────────────────────────────────────────────────────┘
```

When a user completes an external course or internal lesson, the competency engine creates a `UserSkill` record with `SkillEvidence` referencing the verified external completion URL or uploaded certificate.

---

## 7. Legal, Copyright, and Fair Use Boundaries

1. **No Content Scraping:** MOTIF never executes headless browser scrapers against gated, paywalled, or login-restricted platforms.
2. **No Lesson Text Copying:** Proprietary lecture notes, video files, or quiz questions are never stored in MOTIF databases. MOTIF acts as an index, telemetry tracker, and curriculum orchestrator.
3. **Clear Source Attribution:** Every external resource card displays the provider badge, license type, original publisher, and an outbound icon indicating that the user is entering an external provider.
4. **Link Health Engine:** A scheduled cron job queries `verifyAvailability()` monthly. Resources returning HTTP 404, 410, or paywalls are automatically flagged as `'broken_link'` or `'restricted'` and removed from the active directory.

