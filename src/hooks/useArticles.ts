import useSWR from 'swr';
import { useEffect, useMemo, useRef } from 'react';
import { type StatePopulation } from '@/types/articles';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useArticles() {
  const blobUrlsRef = useRef<string[]>([]);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  const { data, error, isLoading } = useSWR<StatePopulation[]>(
    `${basePath}/api/kontent/articles`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // avoid refetching within 60s
    },
  );

  const iframeUrls = useMemo(() => {
    return (
      data?.map((article: StatePopulation) => {
        if (article.html) {
          const blob = new Blob([article.html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          blobUrlsRef.current.push(url);
          return url;
        }
        return '';
      }) ?? []
    );
  }, [data]);

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current = [];
    };
  }, []);

  return {
    articles: data ?? [],
    iframeUrls,
    isLoading,
    isError: !!error,
  };
}
