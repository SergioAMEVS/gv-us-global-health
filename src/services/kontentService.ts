import { deliveryClient } from '@/lib/kontent/client';
import { alzheimerClient } from '@/lib/kontent/alzheimerClient';
import { type StatePopulation } from '@/types/articles';

export async function getArticles(): Promise<StatePopulation[]> {
  const response = await deliveryClient
    .items()
    .type('statepopulation')
    .elementsParameter(['state_name', 'year', 'population', 'html'])
    .toPromise();

  return response.data.items.map((item) => {
    return {
      codename: item.system.codename,
      collection: item.system.collection,
      id: item.system.id,
      language: item.system.language,
      lastModified: item.system.lastModified,
      name: item.system.name,
      state_name: item.elements.state_name.value,
      year: item.elements.year.value,
      population: item.elements.population.value,
      html: item.elements.html.value,
    };
  });
}

export async function getSvgText() {
  const response = await alzheimerClient
    .items()
    .type('svg_text')
    // .elementsParameter(['state_name', 'year', 'population', 'html'])
    .toPromise();
  console.log(response.data.items);
  return response.data.items.map((item) => {
    return {
      codename: item.system.codename,
      collection: item.system.collection,
      id: item.system.id,
      language: item.system.language,
      lastModified: item.system.lastModified,
      name: item.system.name,
      svg: item.elements.svg.value,
      text: item.elements.text.value,
    };
  });
}
