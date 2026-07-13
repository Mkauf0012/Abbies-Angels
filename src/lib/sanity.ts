import { createClient } from '@sanity/client';

export const SANITY_PROJECT_ID = '7o31gm3n';
export const SANITY_DATASET = 'production';

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

/**
 * Fetches a singleton document deterministically.
 *
 * The dataset contains duplicate singletons (a plain-id copy and a newer
 * `singleton-*` copy) whose content can diverge. Prefer the `singleton-*`
 * doc, fall back to the plain id, then to any doc of the type, so pages
 * never show an arbitrary duplicate.
 */
export function getSingleton<T = any>(type: string): Promise<T> {
  const sid = `singleton-${type.replace(/_/g, '-')}`;
  return client.fetch(
    `coalesce(*[_id == $sid][0], *[_id == $pid][0], *[_type == $type][0])`,
    { sid, pid: type, type }
  );
}

export interface SanityImage {
  asset?: { _ref?: string };
}

/**
 * Builds a Sanity CDN URL from an image reference.
 * Returns '' when the image has no usable asset reference.
 */
export function sanityImage(img: SanityImage | null | undefined): string {
  const ref = img?.asset?._ref;
  if (!ref) return '';
  const parts = ref.split('-');
  const ext = parts[parts.length - 1];
  const dimensions = parts[parts.length - 2];
  const id = parts.slice(1, parts.length - 2).join('-');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${ext}`;
}
