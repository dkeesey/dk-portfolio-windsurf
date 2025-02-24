import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { GetImageResult } from 'astro';

export interface OptimizedImage {
  src: string;
  width: number;
  height: number;
  format: string;
}

interface OptimizeImageOptions {
  src: string | ImageMetadata;
  width?: number;
  height?: number;
  format?: 'avif' | 'webp' | 'png' | 'jpg';
  quality?: number;
}

export async function optimizeImage({
  src,
  width,
  height,
  format = 'webp',
  quality = 80,
}: OptimizeImageOptions): Promise<OptimizedImage> {
  try {
    const image: GetImageResult = await getImage({
      src,
      width,
      height,
      format,
      quality,
    });

    return {
      src: image.src,
      width: image.attributes.width,
      height: image.attributes.height,
      format: format,
    };
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw new Error('Failed to optimize image');
  }
}

export async function generateSrcSet(
  image: ImageMetadata,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920],
  formats: ('webp' | 'avif')[] = ['webp', 'avif']
): Promise<Record<string, OptimizedImage[]>> {
  const srcSets: Record<string, Promise<OptimizedImage>[]> = {};

  for (const format of formats) {
    srcSets[format] = widths.map((width) =>
      optimizeImage({
        src: image,
        width,
        format,
      })
    );
  }

  return Promise.all(
    Object.entries(srcSets).map(async ([format, promises]) => {
      const images = await Promise.all(promises);
      return [format, images];
    })
  ).then(Object.fromEntries);
}

export function getSrcSet(images: OptimizedImage[]): string {
  return images
    .map((image) => `${image.src} ${image.width}w`)
    .join(', ');
}

export function getAspectRatio(width: number, height: number): number {
  return Math.round((height / width) * 100) / 100;
} 