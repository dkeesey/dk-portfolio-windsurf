/// <reference path="../.astro/types.d.ts" />
import type {} from '../.astro/types';
import './types/components';

/// <reference types="astro/client" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_TRACKING_ID: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
