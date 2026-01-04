
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-blue-600">MARKET</span>
              <span className="text-xl font-bold text-green-500">PRO</span>
            </div>
            <p className="text-gray-500 text-sm">
              Лучшая платформа для частных объявлений в Таджикистане. Покупайте и продавайте легко.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Помощь</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">Правила сайта</li>
              <li className="hover:text-blue-600 cursor-pointer">Как продать быстрее</li>
              <li className="hover:text-blue-600 cursor-pointer">Платные услуги</li>
              <li className="hover:text-blue-600 cursor-pointer">Контакты</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Соцсети</h4>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition">
                <span className="font-bold text-xs">IG</span>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition">
                <span className="font-bold text-xs">TG</span>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition">
                <span className="font-bold text-xs">FB</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Подписка</h4>
            <p className="text-xs text-gray-500 mb-3">Будьте в курсе новых предложений</p>
            <div className="flex space-x-2">
              <input type="email" placeholder="Email" className="bg-gray-50 border rounded-lg px-3 py-2 text-sm flex-1 outline-none" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">OK</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} MarketPlace Pro. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
