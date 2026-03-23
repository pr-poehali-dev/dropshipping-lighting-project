import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const stats = [
  { value: '5000+', label: 'довольных клиентов' },
  { value: '1200+', label: 'товаров в каталоге' },
  { value: '7', label: 'лет на рынке' },
];

const values = [
  {
    icon: 'Award',
    title: 'Качество',
    description:
      'Работаем только с проверенными производителями и тщательно контролируем каждый этап -- от закупки до доставки.',
  },
  {
    icon: 'Lightbulb',
    title: 'Инновации',
    description:
      'Следим за последними трендами в мире освещения и первыми привозим новинки LED-технологий в Россию.',
  },
  {
    icon: 'Headphones',
    title: 'Сервис',
    description:
      'Консультируем по подбору освещения, помогаем с дизайн-проектами и обеспечиваем послепродажную поддержку.',
  },
  {
    icon: 'Leaf',
    title: 'Экология',
    description:
      'Продвигаем энергосберегающие решения и сотрудничаем с брендами, которые заботятся об окружающей среде.',
  },
];

const contacts = [
  {
    icon: 'Mail',
    label: 'Email',
    value: 'info@lumina-store.ru',
    href: 'mailto:info@lumina-store.ru',
  },
  {
    icon: 'Phone',
    label: 'Телефон',
    value: '+7 (495) 123-45-67',
    href: 'tel:+74951234567',
  },
  {
    icon: 'MapPin',
    label: 'Адрес',
    value: 'г. Москва, ул. Тверская, д. 18, стр. 1',
    href: undefined,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-10">
        {/* Page heading */}
        <div className="mb-6 opacity-0 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            О <span className="text-gradient">нас</span>
          </h1>
          <p className="font-body text-foreground/50 mt-2">
            Узнайте больше о магазине LUMINA
          </p>
        </div>

        {/* Hero text */}
        <div
          className="glass rounded-lg p-8 md:p-12 mb-16 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-snug max-w-3xl">
            <span className="text-gradient">LUMINA</span> -- это магазин
            современного освещения, где дизайн встречает технологии
          </h2>
          <p className="font-body text-foreground/60 mt-6 max-w-2xl leading-relaxed">
            Мы создаем пространства, наполненные светом. С 2019 года помогаем
            нашим клиентам находить идеальные решения для домов, офисов и
            коммерческих объектов. Наша команда вдохновлена одной простой идеей --
            правильный свет меняет все.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass rounded-lg p-8 text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <span className="font-display text-5xl md:text-6xl font-bold text-amber-400 leading-none">
                {stat.value}
              </span>
              <p className="font-body text-sm text-foreground/50 mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            Наши <span className="text-gradient">ценности</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((item, index) => (
              <div
                key={item.title}
                className="glass rounded-lg p-6 md:p-8 transition-all duration-300 hover:glow-amber-sm hover:border-amber-400/20 opacity-0 animate-fade-in"
                style={{ animationDelay: `${(index + 6) * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 shrink-0">
                    <Icon name={item.icon} size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-foreground/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-16">
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.0s' }}
          >
            <span className="text-gradient">Контакты</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <div
                key={contact.label}
                className="glass rounded-lg p-6 opacity-0 animate-fade-in"
                style={{ animationDelay: `${(index + 11) * 0.1}s` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/10 mb-4">
                  <Icon name={contact.icon} size={20} className="text-amber-400" />
                </div>
                <p className="font-body text-xs text-foreground/40 mb-1">
                  {contact.label}
                </p>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="font-body text-sm text-foreground hover:text-amber-400 transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="font-body text-sm text-foreground">
                    {contact.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="glass rounded-lg p-8 md:p-12 text-center glow-amber opacity-0 animate-fade-in"
          style={{ animationDelay: '1.4s' }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Готовы преобразить пространство?
          </h2>
          <p className="font-body text-foreground/50 mb-6 max-w-lg mx-auto">
            Загляните в наш каталог и найдите свет, который подчеркнет ваш стиль
          </p>
          <Button asChild size="lg" className="font-body text-base glow-amber">
            <Link to="/catalog">
              Перейти в каталог
              <Icon name="ArrowRight" size={18} />
            </Link>
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

export default About;
