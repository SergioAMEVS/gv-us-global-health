import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticles } from '@/services/kontentService';
import { cache } from '@/lib/cache';

export default async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const cached = cache.get('articles');
  if (cached) {
    res.status(200).json(cached);
    return;
  }

  try {
    const articles = await getArticles();
    cache.set('articles', articles);
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
