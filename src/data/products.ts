export interface Product {
  id: number;
  name: string;
  category: 'chandeliers' | 'lamps' | 'led-strips' | 'sconces';
  price: number;
  oldPrice?: number;
  power: string;
  style: 'modern' | 'classic' | 'minimalist' | 'loft';
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

const IMG_CHANDELIER =
  'https://cdn.poehali.dev/projects/def95538-480f-4b35-8cd1-92ad43904416/files/1b4a58ef-1785-4aa0-982b-0a010e078725.jpg';
const IMG_LED =
  'https://cdn.poehali.dev/projects/def95538-480f-4b35-8cd1-92ad43904416/files/25fe0eb7-7362-4068-b1d1-919c30788d16.jpg';
const IMG_SCONCE =
  'https://cdn.poehali.dev/projects/def95538-480f-4b35-8cd1-92ad43904416/files/5c316bed-7489-4917-82f3-5117434c2835.jpg';

export const products: Product[] = [
  // Chandeliers
  {
    id: 1,
    name: 'Люстра Aurora Gold',
    category: 'chandeliers',
    price: 18900,
    power: '120W',
    style: 'classic',
    image: IMG_CHANDELIER,
    rating: 4.9,
    reviews: 47,
    isNew: true,
  },
  {
    id: 2,
    name: 'Люстра Crystal Noir',
    category: 'chandeliers',
    price: 14500,
    oldPrice: 17800,
    power: '80W',
    style: 'modern',
    image: IMG_CHANDELIER,
    rating: 4.7,
    reviews: 32,
    isSale: true,
  },
  {
    id: 3,
    name: 'Люстра Minimal Ring',
    category: 'chandeliers',
    price: 11200,
    power: '60W',
    style: 'minimalist',
    image: IMG_CHANDELIER,
    rating: 4.8,
    reviews: 21,
  },

  // Lamps
  {
    id: 4,
    name: 'Светильник Loft Edison',
    category: 'lamps',
    price: 4300,
    power: '40W',
    style: 'loft',
    image: IMG_SCONCE,
    rating: 4.6,
    reviews: 58,
  },
  {
    id: 5,
    name: 'Светильник Sphere Opal',
    category: 'lamps',
    price: 6700,
    oldPrice: 8200,
    power: '25W',
    style: 'modern',
    image: IMG_SCONCE,
    rating: 4.8,
    reviews: 19,
    isSale: true,
  },
  {
    id: 6,
    name: 'Светильник Nova Arc',
    category: 'lamps',
    price: 8900,
    power: '35W',
    style: 'minimalist',
    image: IMG_SCONCE,
    rating: 5.0,
    reviews: 12,
    isNew: true,
  },

  // LED-strips
  {
    id: 7,
    name: 'LED-лента Warm White 5м',
    category: 'led-strips',
    price: 1200,
    power: '14W',
    style: 'modern',
    image: IMG_LED,
    rating: 4.5,
    reviews: 134,
  },
  {
    id: 8,
    name: 'LED-лента RGB Pro 5м',
    category: 'led-strips',
    price: 2800,
    oldPrice: 3500,
    power: '18W',
    style: 'modern',
    image: IMG_LED,
    rating: 4.7,
    reviews: 89,
    isSale: true,
  },
  {
    id: 9,
    name: 'LED-лента Neon Flex 3м',
    category: 'led-strips',
    price: 3400,
    power: '12W',
    style: 'minimalist',
    image: IMG_LED,
    rating: 4.4,
    reviews: 45,
    isNew: true,
  },

  // Sconces
  {
    id: 10,
    name: 'Бра Wall Amber',
    category: 'sconces',
    price: 3900,
    power: '15W',
    style: 'classic',
    image: IMG_SCONCE,
    rating: 4.6,
    reviews: 27,
  },
  {
    id: 11,
    name: 'Бра Industrial Pipe',
    category: 'sconces',
    price: 5200,
    oldPrice: 6400,
    power: '25W',
    style: 'loft',
    image: IMG_SCONCE,
    rating: 4.8,
    reviews: 36,
    isSale: true,
  },
  {
    id: 12,
    name: 'Бра Slim Line',
    category: 'sconces',
    price: 2900,
    power: '5W',
    style: 'minimalist',
    image: IMG_SCONCE,
    rating: 4.3,
    reviews: 15,
    isNew: true,
  },
];

export const categories = [
  { id: 'all', name: 'Все', icon: 'LayoutGrid' },
  { id: 'chandeliers', name: 'Люстры', icon: 'Sparkles' },
  { id: 'lamps', name: 'Светильники', icon: 'Lamp' },
  { id: 'led-strips', name: 'LED-ленты', icon: 'Zap' },
  { id: 'sconces', name: 'Бра', icon: 'LampWallDown' },
];

export interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
  avatar: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    text: 'Заказала люстру Aurora Gold -- она просто великолепна! Свет мягкий, теплый, вся гостиная преобразилась. Доставка была быстрой, упаковка надежная.',
    rating: 5,
    date: '2026-02-18',
    avatar: 'А',
  },
  {
    id: 2,
    name: 'Дмитрий Козлов',
    text: 'Покупал LED-ленту RGB Pro для подсветки кухни. Отличное качество, яркие цвета и удобное управление. За такую цену -- отличный вариант.',
    rating: 5,
    date: '2026-01-25',
    avatar: 'Д',
  },
  {
    id: 3,
    name: 'Елена Смирнова',
    text: 'Бра Industrial Pipe идеально вписалось в интерьер нашего лофта. Единственное -- инструкция могла быть подробнее, но установка все равно несложная.',
    rating: 4,
    date: '2026-03-05',
    avatar: 'Е',
  },
  {
    id: 4,
    name: 'Максим Орлов',
    text: 'Светильник Sphere Opal выглядит дороже своей цены. Приятный рассеянный свет, качественные материалы. Рекомендую для спальни.',
    rating: 5,
    date: '2025-12-12',
    avatar: 'М',
  },
  {
    id: 5,
    name: 'Ирина Волкова',
    text: 'Заказывала светильники для всего дома. Менеджер помог подобрать стиль, все пришло в срок. Очень довольна обслуживанием и качеством товара.',
    rating: 5,
    date: '2026-02-02',
    avatar: 'И',
  },
  {
    id: 6,
    name: 'Сергей Новиков',
    text: 'Люстра Crystal Noir красивая, но ожидал немного другой оттенок металла. В целом доволен покупкой, свет приятный и хорошо освещает комнату.',
    rating: 4,
    date: '2026-03-14',
    avatar: 'С',
  },
];

export default products;
