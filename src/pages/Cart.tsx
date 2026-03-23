import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import { products } from '@/data/products';

interface CartItem {
  product: (typeof products)[number];
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { product: products[0], quantity: 1 },
  { product: products[3], quantity: 2 },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-10">
        {/* Page heading */}
        <div className="mb-10 opacity-0 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Корзина</span>
          </h1>
          {!isEmpty && (
            <p className="font-body text-foreground/50 mt-2">
              {cartItems.length}{' '}
              {cartItems.length === 1
                ? 'товар'
                : cartItems.length < 5
                  ? 'товара'
                  : 'товаров'}
            </p>
          )}
        </div>

        {isEmpty ? (
          /* ---------- Empty State ---------- */
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
          /* ---------- Cart Content ---------- */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items List */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.product.id}
                  className="glass rounded-lg p-4 md:p-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Thumbnail */}
                    <div className="relative h-24 w-24 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    </div>

                    {/* Details */}
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
                        {/* Quantity */}
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

                        {/* Price */}
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

                        {/* Remove */}
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

            {/* Order Summary */}
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
                      {subtotal.toLocaleString('ru-RU')} ₽
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
                    {subtotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="font-body text-xs text-foreground/40 mb-2 block">
                    Промокод
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите код"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="h-9 bg-white/5 border-white/10 font-body text-sm flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 font-body text-xs shrink-0"
                    >
                      Применить
                    </Button>
                  </div>
                </div>

                <Button className="w-full font-body glow-amber text-base h-12">
                  <Icon name="CreditCard" size={18} />
                  Оформить заказ
                </Button>

                <Link
                  to="/catalog"
                  className="flex items-center justify-center gap-2 mt-4 font-body text-xs text-foreground/40 hover:text-amber-400 transition-colors"
                >
                  <Icon name="ArrowLeft" size={14} />
                  Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="font-display text-xl font-bold tracking-wider text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]"
            >
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

export default Cart;
