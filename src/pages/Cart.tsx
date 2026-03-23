import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-10">
        <div className="mb-10 opacity-0 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Корзина</span>
          </h1>
          {!isEmpty && (
            <p className="font-body text-foreground/50 mt-2">
              {items.length}{' '}
              {items.length === 1
                ? 'товар'
                : items.length < 5
                  ? 'товара'
                  : 'товаров'}
            </p>
          )}
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center opacity-0 animate-fade-in">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
              <Icon name="ShoppingBag" size={44} className="text-foreground/20" />
            </div>
            <h2 className="font-display text-2xl font-semibold mb-2">
              Корзина пуста
            </h2>
            <p className="font-body text-sm text-foreground/40 mb-8 max-w-sm">
              Добавьте товары из каталога, чтобы оформить заказ
            </p>
            <Button asChild className="font-body glow-amber">
              <Link to="/catalog">
                <Icon name="ArrowLeft" size={16} />
                Перейти в каталог
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.product.id}
                  className="glass rounded-lg p-4 md:p-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4 md:gap-6">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <h3 className="font-display text-lg md:text-xl font-semibold truncate">
                          {item.product.name}
                        </h3>
                        <p className="font-body text-xs text-foreground/40 mt-1">
                          {item.product.power} / {item.product.style === 'modern' ? 'Модерн' : item.product.style === 'classic' ? 'Классика' : item.product.style === 'minimalist' ? 'Минимализм' : 'Лофт'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 gap-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-white/10 hover:bg-white/10"
                            onClick={() => updateQuantity(item.product.id, -1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="font-body text-sm w-8 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-white/10 hover:bg-white/10"
                            onClick={() => updateQuantity(item.product.id, 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-body text-lg font-bold text-amber-400">
                            {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </span>
                          {item.quantity > 1 && (
                            <span className="font-body text-xs text-foreground/30 hidden sm:inline">
                              {item.product.price.toLocaleString('ru-RU')} ₽ / шт
                            </span>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-foreground/30 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-80 xl:w-96 shrink-0">
              <div
                className="glass rounded-lg p-6 sticky top-24 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                <h2 className="font-display text-xl font-semibold mb-6">
                  Ваш заказ
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-foreground/60">Подытог</span>
                    <span className="text-foreground">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-foreground/60">Доставка</span>
                    <span className="text-green-400">Бесплатно</span>
                  </div>
                </div>

                <Separator className="bg-white/10 my-4" />

                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-lg font-semibold">Итого</span>
                  <span className="font-body text-2xl font-bold text-amber-400">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <div className="flex gap-2 mb-4">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Промокод"
                    className="h-10 bg-white/5 border-white/10 font-body text-sm"
                  />
                  <Button variant="outline" className="border-white/10 font-body text-sm shrink-0">
                    Применить
                  </Button>
                </div>

                <Button className="w-full font-body text-sm glow-amber gap-2" size="lg">
                  <Icon name="CreditCard" size={18} />
                  Оформить заказ
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    to="/catalog"
                    className="font-body text-xs text-foreground/40 hover:text-amber-400 transition-colors"
                  >
                    Продолжить покупки
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-white/10 py-12 mt-16">
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

export default Cart;
