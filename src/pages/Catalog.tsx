import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { products, categories } from '@/data/products';

type PowerRange = 'low' | 'mid' | 'high';
type StyleKey = 'modern' | 'classic' | 'minimalist' | 'loft';

const powerOptions: { id: PowerRange; label: string }[] = [
  { id: 'low', label: 'до 20W' },
  { id: 'mid', label: '20-60W' },
  { id: 'high', label: '60W+' },
];

const styleOptions: { id: StyleKey; label: string }[] = [
  { id: 'modern', label: 'Модерн' },
  { id: 'classic', label: 'Классика' },
  { id: 'minimalist', label: 'Минимализм' },
  { id: 'loft', label: 'Лофт' },
];

const categoryLabelMap: Record<string, string> = {
  chandeliers: 'Люстры',
  lamps: 'Светильники',
  'led-strips': 'LED-ленты',
  sconces: 'Бра',
};

const styleLabelMap: Record<string, string> = {
  modern: 'Модерн',
  classic: 'Классика',
  minimalist: 'Минимализм',
  loft: 'Лофт',
};

const parsePower = (power: string): number => parseInt(power.replace(/\D/g, ''), 10);

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

const Catalog = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedPower, setSelectedPower] = useState<PowerRange[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<StyleKey[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const togglePower = (id: PowerRange) => {
    setSelectedPower((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleStyle = (id: StyleKey) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setActiveCategory('all');
    setPriceMin('');
    setPriceMax('');
    setSelectedPower([]);
    setSelectedStyles([]);
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    priceMin !== '' ||
    priceMax !== '' ||
    selectedPower.length > 0 ||
    selectedStyles.length > 0;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;

      // Price
      const min = priceMin ? Number(priceMin) : 0;
      const max = priceMax ? Number(priceMax) : Infinity;
      if (product.price < min || product.price > max) return false;

      // Power
      if (selectedPower.length > 0) {
        const w = parsePower(product.power);
        const matchesPower = selectedPower.some((range) => {
          if (range === 'low') return w < 20;
          if (range === 'mid') return w >= 20 && w <= 60;
          if (range === 'high') return w > 60;
          return false;
        });
        if (!matchesPower) return false;
      }

      // Style
      if (selectedStyles.length > 0 && !selectedStyles.includes(product.style)) return false;

      return true;
    });
  }, [activeCategory, priceMin, priceMax, selectedPower, selectedStyles]);

  /* ---------- Sidebar Filter Content (shared between desktop & mobile) ---------- */
  const filterContent = (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Категория</h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setMobileFiltersOpen(false);
              }}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-left font-body text-sm transition-colors ${
                activeCategory === cat.id
                  ? 'bg-amber-400/10 text-amber-400'
                  : 'text-foreground/60 hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <Icon name={cat.icon} size={18} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Цена, ₽</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="от"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="h-9 bg-white/5 border-white/10 font-body text-sm"
          />
          <span className="text-foreground/30">-</span>
          <Input
            type="number"
            placeholder="до"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="h-9 bg-white/5 border-white/10 font-body text-sm"
          />
        </div>
      </div>

      {/* Power */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Мощность</h3>
        <div className="flex flex-col gap-3">
          {powerOptions.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <Checkbox
                id={`power-${opt.id}`}
                checked={selectedPower.includes(opt.id)}
                onCheckedChange={() => togglePower(opt.id)}
              />
              <Label
                htmlFor={`power-${opt.id}`}
                className="font-body text-sm text-foreground/70 cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Стиль</h3>
        <div className="flex flex-col gap-3">
          {styleOptions.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <Checkbox
                id={`style-${opt.id}`}
                checked={selectedStyles.includes(opt.id)}
                onCheckedChange={() => toggleStyle(opt.id)}
              />
              <Label
                htmlFor={`style-${opt.id}`}
                className="font-body text-sm text-foreground/70 cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="border-white/10 text-foreground/60 hover:text-foreground font-body text-sm"
          onClick={clearAllFilters}
        >
          <Icon name="X" size={14} />
          Сбросить фильтры
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-10">
        {/* Page heading */}
        <div className="mb-8 opacity-0 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Каталог</span>
          </h1>
          <p className="font-body text-foreground/50 mt-2">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1
              ? 'товар'
              : filteredProducts.length < 5
                ? 'товара'
                : 'товаров'}
          </p>
        </div>

        {/* Mobile filter trigger */}
        <div className="mb-6 lg:hidden">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-white/10 font-body text-sm gap-2"
              >
                <Icon name="SlidersHorizontal" size={16} />
                Фильтры
                {hasActiveFilters && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-background">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background border-white/10 overflow-y-auto">
              <SheetTitle className="font-display text-xl font-bold mb-6">Фильтры</SheetTitle>
              {filterContent}
            </SheetContent>
          </Sheet>
        </div>

        {/* Active filter badges */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {activeCategory !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer font-body bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20"
                onClick={() => setActiveCategory('all')}
              >
                {categoryLabelMap[activeCategory] || activeCategory}
                <Icon name="X" size={12} />
              </Badge>
            )}
            {priceMin && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer font-body bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20"
                onClick={() => setPriceMin('')}
              >
                от {Number(priceMin).toLocaleString('ru-RU')} ₽
                <Icon name="X" size={12} />
              </Badge>
            )}
            {priceMax && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer font-body bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20"
                onClick={() => setPriceMax('')}
              >
                до {Number(priceMax).toLocaleString('ru-RU')} ₽
                <Icon name="X" size={12} />
              </Badge>
            )}
            {selectedPower.map((p) => (
              <Badge
                key={p}
                variant="secondary"
                className="gap-1 cursor-pointer font-body bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20"
                onClick={() => togglePower(p)}
              >
                {powerOptions.find((o) => o.id === p)?.label}
                <Icon name="X" size={12} />
              </Badge>
            ))}
            {selectedStyles.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="gap-1 cursor-pointer font-body bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20"
                onClick={() => toggleStyle(s)}
              >
                {styleLabelMap[s]}
                <Icon name="X" size={12} />
              </Badge>
            ))}
            <button
              onClick={clearAllFilters}
              className="font-body text-xs text-foreground/40 hover:text-foreground/70 transition-colors ml-2"
            >
              Сбросить все
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="glass rounded-lg p-6 sticky top-24">
              {filterContent}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center opacity-0 animate-fade-in">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                  <Icon name="SearchX" size={36} className="text-foreground/30" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="font-body text-sm text-foreground/40 mb-6">
                  Попробуйте изменить параметры фильтрации
                </p>
                <Button
                  variant="outline"
                  className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 font-body"
                  onClick={clearAllFilters}
                >
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="glass rounded-lg overflow-hidden group transition-all duration-300 hover:glow-amber-sm hover:border-amber-400/20 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
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
                      {/* Category & Power */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-xs text-foreground/40 uppercase tracking-wider">
                          {categoryLabelMap[product.category]}
                        </span>
                        <span className="flex items-center gap-1 font-body text-xs text-foreground/40">
                          <Icon name="Zap" size={12} className="text-amber-400/60" />
                          {product.power}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-semibold mb-1 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Style tag */}
                      <span className="inline-block rounded-full bg-white/5 px-2 py-0.5 font-body text-[11px] text-foreground/40 mb-3">
                        {styleLabelMap[product.style]}
                      </span>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(product.rating)}
                        <span className="ml-1 font-body text-xs text-foreground/40">
                          {product.rating}
                        </span>
                        <span className="font-body text-xs text-foreground/30">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price & Cart */}
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
                          size="sm"
                          className="font-body text-xs gap-1.5 glow-amber-sm"
                          onClick={() => {
                            addItem(product);
                            toast({ title: 'Добавлено в корзину', description: product.name });
                          }}
                        >
                          <Icon name="ShoppingCart" size={14} />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="font-display text-xl font-bold tracking-wider text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              LUMINA
            </Link>
            <p className="font-body text-sm text-foreground/40">
              &copy; 2026 LUMINA. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Catalog;