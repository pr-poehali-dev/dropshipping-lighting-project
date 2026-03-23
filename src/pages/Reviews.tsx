import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { reviews } from '@/data/products';

const overallRating =
  Math.round(
    (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10
  ) / 10;

const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
  star,
  count: reviews.filter((r) => r.rating === star).length,
  percentage: Math.round(
    (reviews.filter((r) => r.rating === star).length / reviews.length) * 100
  ),
}));

const renderStars = (rating: number, size = 16) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name="Star"
        size={size}
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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const Reviews = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-10">
        {/* Page heading */}
        <div className="mb-12 opacity-0 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Отзывы <span className="text-gradient">покупателей</span>
          </h1>
          <p className="font-body text-foreground/50 mt-2">
            Что говорят о нас наши клиенты
          </p>
        </div>

        {/* Overall Rating Summary */}
        <div
          className="glass rounded-lg p-8 md:p-10 mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Big number */}
            <div className="text-center shrink-0">
              <span className="font-display text-6xl md:text-7xl font-bold text-amber-400 leading-none">
                {overallRating}
              </span>
              <div className="flex items-center justify-center gap-1 mt-3">
                {renderStars(overallRating, 20)}
              </div>
              <p className="font-body text-sm text-foreground/40 mt-2">
                {reviews.length} отзывов
              </p>
            </div>

            {/* Distribution bars */}
            <div className="flex-1 w-full space-y-2">
              {ratingDistribution.map((row) => (
                <div key={row.star} className="flex items-center gap-3">
                  <span className="font-body text-sm text-foreground/60 w-4 text-right shrink-0">
                    {row.star}
                  </span>
                  <Icon name="Star" size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all duration-700"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="font-body text-xs text-foreground/30 w-8 shrink-0">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="glass rounded-lg p-6 transition-all duration-300 hover:glow-amber-sm hover:border-amber-400/20 opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              {/* Header: avatar, name, date */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10 shrink-0">
                  <span className="font-display text-lg font-bold text-amber-400">
                    {review.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold truncate">
                    {review.name}
                  </h3>
                  <p className="font-body text-xs text-foreground/30">
                    {formatDate(review.date)}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {renderStars(review.rating, 14)}
              </div>

              {/* Text */}
              <p className="font-body text-sm text-foreground/70 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="font-body text-foreground/40 text-sm mb-4">
            Купили товар в LUMINA? Поделитесь впечатлениями!
          </p>
          <Button className="font-body glow-amber">
            <Icon name="MessageSquarePlus" size={18} />
            Оставить отзыв
          </Button>
        </div>
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

export default Reviews;
