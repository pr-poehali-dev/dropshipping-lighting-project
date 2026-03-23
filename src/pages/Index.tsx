import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/data/products';

const categoryCards = [
  {
    icon: 'Sparkles',
    name: 'Люстры',
    description: 'Элегантные решения для главного освещения',
  },
  {
    icon: 'Lamp',
    name: 'Светильники',
    description: 'Настольные и напольные модели',
  },
  {
    icon: 'Zap',
    name: 'LED-ленты',
    description: 'Гибкая подсветка для любых поверхностей',
  },
  {
    icon: 'LampWallDown',
    name: 'Бра',
    description: 'Настенные светильники для уюта',
  },
];

const benefits = [
  {
    icon: 'Truck',
    title: 'Бесплатная доставка',
    description: 'При заказе от 5 000 ₽ по всей России',
  },
  {
    icon: 'Shield',
    title: 'Гарантия 2 года',
    description: 'На всю продукцию от производителя',
  },
  {
    icon: 'RotateCcw',
    title: 'Быстрый возврат',
    description: 'Возврат в течение 14 дней без вопросов',
  },
];

const featuredProducts = products.slice(0, 4);

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name="Star"
        size={14}
        className={
          i <= Math.round(rating)
            ? 'fill-amber-400 text-amber-400'
            : 'text-muted-foreground/30'
        }
      />
    );
  }
  return stars;
};

const Index = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://cdn.poehali.dev/projects/def95538-480f-4b35-8cd1-92ad43904416/files/1b4a58ef-1785-4aa0-982b-0a010e078725.jpg")',
          }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-wide text-foreground opacity-0 animate-fade-in">
            Свет, который{' '}
            <span className="text-gradient">вдохновляет</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-foreground/60 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Дизайнерские светильники, люстры и LED-решения для вашего
            пространства
          </p>
          <div className="mt-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              asChild
              size="lg"
              className="font-body text-base glow-amber hover:glow-amber"
            >
              <Link to="/catalog">Смотреть каталог</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <span className="font-body text-xs text-foreground/40">Листайте вниз</span>
          <div className="animate-bounce">
            <Icon name="ChevronDown" size={24} className="text-amber-400/60" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4 opacity-0 animate-fade-in">
            Наши <span className="text-gradient">категории</span>
          </h2>
          <p className="font-body text-center text-foreground/50 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Подберите идеальное освещение для каждой комнаты
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categoryCards.map((cat, index) => (
              <Link
                to="/catalog"
                key={cat.name}
                className="glass rounded-lg p-6 text-center transition-all duration-300 hover:glow-amber-sm hover:border-amber-400/30 group opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/10 transition-colors group-hover:bg-amber-400/20">
                  <Icon
                    name={cat.icon}
                    size={28}
                    className="text-amber-400"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-1">
                  {cat.name}
                </h3>
                <p className="font-body text-sm text-foreground/50">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold opacity-0 animate-fade-in">
                Хиты <span className="text-gradient">продаж</span>
              </h2>
              <p className="font-body text-foreground/50 mt-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Самые популярные товары нашего магазина
              </p>
            </div>
            <Link
              to="/catalog"
              className="hidden md:flex items-center gap-2 font-body text-sm text-amber-400 hover:text-amber-300 transition-colors opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Смотреть все
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="glass rounded-lg overflow-hidden group transition-all duration-300 hover:glow-amber-sm hover:border-amber-400/20 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.isNew && (
                      <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-background">
                        Новинка
                      </span>
                    )}
                    {product.isSale && (
                      <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
                        Скидка
                      </span>
                    )}
                  </div>
                </div>
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(product.rating)}
                    <span className="ml-1 font-body text-xs text-foreground/40">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-lg font-bold text-amber-400">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="font-body text-sm text-foreground/30 line-through">
                          {product.oldPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 hover:bg-amber-400/10 hover:text-amber-400"
                      onClick={() => {
                        addItem(product);
                        toast({ title: 'Добавлено в корзину', description: product.name });
                      }}
                    >
                      <Icon name="ShoppingCart" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile "see all" link */}
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10">
              <Link to="/catalog">
                Смотреть все
                <Icon name="ArrowRight" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="glass rounded-lg p-8 text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10">
                  <Icon
                    name={benefit.icon}
                    size={30}
                    className="text-amber-400"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm text-foreground/50">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-display text-xl font-bold tracking-wider text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              LUMINA
            </span>
            <p className="font-body text-sm text-foreground/40">
              &copy; 2026 LUMINA. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;