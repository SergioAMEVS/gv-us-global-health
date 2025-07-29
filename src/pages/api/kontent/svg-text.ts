import type { NextApiRequest, NextApiResponse } from 'next';
import { getSvgText } from '@/services/kontentService';
import { cache } from '@/lib/cache';

export default async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const cached = cache.get('svg_text');
  if (cached) {
    res.status(200).json(cached);
    return;
  }

  try {
    const articles = await getSvgText();
    cache.set('svg_text', articles);
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
