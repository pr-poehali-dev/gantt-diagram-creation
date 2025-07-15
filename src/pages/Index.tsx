import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import GanttChart from '@/components/GanttChart';

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('shop');

  const perfumes = [
    {
      id: 1,
      name: "Элегантный Мускус",
      price: 4500,
      originalPrice: 5200,
      stock: 12,
      image: "/img/12949b89-0109-482f-800f-1bf47f0c3b23.jpg",
      category: "Унисекс",
      description: "Изысканный аромат с нотами белого мускуса и жасмина"
    },
    {
      id: 2,
      name: "Роскошная Роза",
      price: 6200,
      originalPrice: 7000,
      stock: 8,
      image: "/img/e5dc8b51-3b15-4310-9c7a-6c77d2cf1cf1.jpg",
      category: "Женский",
      description: "Благородный цветочный аромат с нотами дамасской розы"
    },
    {
      id: 3,
      name: "Дерзкий Сандал",
      price: 5800,
      originalPrice: 6500,
      stock: 5,
      image: "/img/12949b89-0109-482f-800f-1bf47f0c3b23.jpg",
      category: "Мужской",
      description: "Глубокий древесный аромат с нотами сандала и кедра"
    },
    {
      id: 4,
      name: "Морской Бриз",
      price: 3900,
      originalPrice: 4500,
      stock: 15,
      image: "/img/e5dc8b51-3b15-4310-9c7a-6c77d2cf1cf1.jpg",
      category: "Унисекс",
      description: "Свежий морской аромат с нотами озона и соли"
    }
  ];

  const addToCart = (perfume) => {
    setCartItems([...cartItems, perfume]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">PARFUM</h1>
              <nav className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setActiveTab('shop')}
                  className={`text-gray-700 hover:text-black transition-colors ${activeTab === 'shop' ? 'text-black font-medium' : ''}`}
                >
                  Магазин
                </button>
                <button 
                  onClick={() => setActiveTab('gantt')}
                  className={`text-gray-700 hover:text-black transition-colors ${activeTab === 'gantt' ? 'text-black font-medium' : ''}`}
                >
                  Проект
                </button>
                <a href="#about" className="text-gray-700 hover:text-black transition-colors">О нас</a>
                <a href="#contact" className="text-gray-700 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setIsContactOpen(true)}>
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsLoginOpen(true)}>
                <Icon name="User" size={20} />
                Войти
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs px-1">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTab === 'shop' ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-gray-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-5xl font-bold text-black mb-6">
                Изысканные ароматы<br />
                для особых моментов
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Откройте для себя коллекцию премиальных парфюмов, 
                созданных для тех, кто ценит качество и уникальность
              </p>
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3">
                Смотреть каталог
              </Button>
            </div>
          </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4">Каталог ароматов</h3>
            <p className="text-gray-600">Выберите свой идеальный аромат из нашей коллекции</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="women">Женский</TabsTrigger>
              <TabsTrigger value="men">Мужской</TabsTrigger>
              <TabsTrigger value="unisex">Унисекс</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {perfumes.map((perfume) => (
                  <Card key={perfume.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg bg-gray-50">
                        <img 
                          src={perfume.image} 
                          alt={perfume.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-black text-white">
                          {perfume.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2">{perfume.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600 mb-3">
                        {perfume.description}
                      </CardDescription>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-black">{perfume.price.toLocaleString()} ₽</span>
                          <span className="text-sm text-gray-400 line-through">{perfume.originalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {perfume.stock > 0 ? `В наличии: ${perfume.stock}` : 'Нет в наличии'}
                        </Badge>
                      </div>
                      <Button 
                        className="w-full bg-black hover:bg-gray-800 text-white"
                        onClick={() => addToCart(perfume)}
                        disabled={perfume.stock === 0}
                      >
                        {perfume.stock > 0 ? 'Добавить в корзину' : 'Нет в наличии'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-black mb-6">О нашем магазине</h3>
              <p className="text-gray-600 mb-6">
                Мы специализируемся на продаже премиальных парфюмов от ведущих мировых брендов. 
                Каждый аромат в нашей коллекции тщательно отобран и проверен на подлинность.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Гарантия подлинности</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Быстрая доставка</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Возврат в течение 14 дней</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h4 className="text-xl font-bold text-black mb-4">Документы</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-black transition-colors">
                  <Icon name="FileText" size={16} className="inline mr-2" />
                  Пользовательское соглашение
                </a>
                <a href="#" className="block text-gray-600 hover:text-black transition-colors">
                  <Icon name="FileText" size={16} className="inline mr-2" />
                  Публичная оферта
                </a>
                <a href="#" className="block text-gray-600 hover:text-black transition-colors">
                  <Icon name="FileText" size={16} className="inline mr-2" />
                  Договор купли-продажи
                </a>
                <a href="#" className="block text-gray-600 hover:text-black transition-colors">
                  <Icon name="Shield" size={16} className="inline mr-2" />
                  Политика конфиденциальности
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">PARFUM</h5>
              <p className="text-gray-400">
                Премиальные ароматы для особых моментов вашей жизни
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Контакты</h6>
              <div className="space-y-2 text-gray-400">
                <p>+7 (495) 123-45-67</p>
                <p>info@parfum.ru</p>
                <p>Москва, ул. Примерная, 123</p>
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Режим работы</h6>
              <div className="space-y-2 text-gray-400">
                <p>Пн-Пт: 10:00 - 20:00</p>
                <p>Сб-Вс: 11:00 - 18:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PARFUM. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Вход в личный кабинет</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full bg-black hover:bg-gray-800 text-white">
              Войти
            </Button>
            <div className="text-center text-sm text-gray-600">
              Нет аккаунта? <a href="#" className="text-black hover:underline">Регистрация</a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

        </>
      ) : (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GanttChart />
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Обратная связь</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" placeholder="Ваше имя" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Сообщение</Label>
              <Textarea id="message" placeholder="Ваше сообщение..." rows={4} />
            </div>
            <Button className="w-full bg-black hover:bg-gray-800 text-white">
              Отправить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;