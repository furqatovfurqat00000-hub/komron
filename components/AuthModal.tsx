
import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
  lang: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, lang }) => {
  const t = translations[lang];
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(`+992 ${phone}`);
      reset();
    }, 1000);
  };

  const reset = () => {
    setStep('phone');
    setPhone('');
    setCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center border-b">
          <h2 className="text-xl font-bold text-gray-900">{t.authTitle}</h2>
          <button onClick={reset} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <p className="text-sm text-gray-500 text-center mb-6">{t.authPhoneLabel}</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+992</span>
                <input required autoFocus type="tel" placeholder="00 000 0000"
                  className="w-full border-2 border-gray-100 bg-gray-50 p-3 pl-16 rounded-xl focus:border-blue-500 transition-all text-lg"
                  value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))} />
              </div>
              <button disabled={phone.length < 9 || isLoading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50">{isLoading ? '...' : t.getCode}</button>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-6">
              <p className="text-sm text-gray-500 text-center">{t.authSmsLabel} <br/><span className="font-bold text-gray-900">+992 {phone}</span></p>
              <div className="flex justify-center">
                <input required autoFocus type="text" placeholder="0000"
                  className="w-32 border-2 border-gray-100 bg-gray-50 p-3 rounded-xl focus:border-blue-500 text-center text-2xl font-bold"
                  value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))} />
              </div>
              <div className="space-y-3">
                <button disabled={code.length !== 4 || isLoading} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition disabled:opacity-50">{isLoading ? '...' : t.verify}</button>
                <button type="button" onClick={() => setStep('phone')} className="w-full text-blue-600 text-sm font-medium hover:underline">{t.changePhone}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
