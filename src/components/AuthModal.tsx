import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileSpreadsheet,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { AuthorizedUser } from '../types';
import {
  verifyCredentialsAgainstSheet,
  recoverAccountViaPhoneAndEmail,
  INITIAL_DEFAULT_AUTHORIZED_USERS,
} from '../services/sheetsService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthorizedUser) => void;
  onOpenAdminSheet: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenAdminSheet,
}) => {
  const [tab, setTab] = useState<'login' | 'recover' | 'info'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('يرجى ملء البريد الإلكتروني وكلمة المرور المسجلة في جدول البيانات.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = verifyCredentialsAgainstSheet(email, password, phone);
      setIsSubmitting(false);

      if (result.success && result.user) {
        setSuccessMsg(result.message);
        setTimeout(() => {
          onLoginSuccess(result.user!);
          onClose();
        }, 600);
      } else {
        setErrorMsg(result.message);
      }
    }, 400);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !phone) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني ورقم الهاتف المسجلين في جدول البيانات.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = recoverAccountViaPhoneAndEmail(email, phone);
      setIsSubmitting(false);
      if (result.success) {
        setSuccessMsg(result.message);
      } else {
        setErrorMsg(result.message);
      }
    }, 400);
  };

  const handlePreFill = (user: AuthorizedUser) => {
    setEmail(user.email);
    setPassword(user.password || '');
    setPhone(user.phone);
    setErrorMsg(null);
    setSuccessMsg(`تم تعبئة بيانات الحساب المعتمد: ${user.fullName}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header Header */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800">
          <button
            id="btn-close-auth-modal"
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">تسجيل الدخول والتحقق الآمن</h3>
              <p className="text-xs text-slate-400">
                نظام التحقق الصارم المطابق حصراً لجدول <span className="text-emerald-400 font-semibold">Google Sheets</span> المدار من قِبل المسؤول
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 bg-slate-950/60 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                setTab('login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => {
                setTab('recover');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                tab === 'recover'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              التحقق واستعادة البيانات
            </button>
            <button
              onClick={() => setTab('info')}
              className={`py-2 px-3 text-xs font-semibold rounded-xl transition-all ${
                tab === 'info'
                  ? 'bg-slate-800 text-cyan-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  البريد الإلكتروني المسجل في الجدول <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    id="input-auth-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  كلمة المرور الممنوحة لك <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    id="input-auth-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>رقم الهاتف للتحقق الإضافي (اختياري/موصى به)</span>
                  <span className="text-[10px] text-slate-500">حسب جدول البيانات</span>
                </label>
                <div className="relative">
                  <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    id="input-auth-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+213XXXXXXXXX أو +966XXXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-auth-login"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>التحقق والدخول للمنصة</span>
                  </>
                )}
              </button>

              {/* Quick Demo Pre-fills */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400">
                    حسابات معتمدة مسجلة في جدول Google Sheets للتجربة السريعة:
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {INITIAL_DEFAULT_AUTHORIZED_USERS.slice(0, 4).map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handlePreFill(u)}
                      className="p-2 text-right bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 rounded-xl transition-all text-[11px]"
                    >
                      <div className="font-semibold text-slate-200 truncate">{u.fullName}</div>
                      <div className="text-slate-500 truncate text-[10px]">{u.email}</div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {tab === 'recover' && (
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                أدخل البريد الإلكتروني ورقم الهاتف المسجلين في جدول <span className="text-white font-semibold">Google Sheets</span> الخاص بك للتحقق من الصلاحية واسترجاع كلمة المرور الممنوحة لك.
              </p>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  البريد الإلكتروني <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  رقم الهاتف المسجل <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+213... / +966..."
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <span>التحقق من بيانات الجدول واسترجاع الدخول</span>
                )}
              </button>
            </form>
          )}

          {tab === 'info' && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>كيف يعمل نظام الحسابات المصرح بها؟</span>
                </h4>
                <p className="leading-relaxed text-slate-400">
                  بناءً على طلب إدارة التطبيق (Mouhcen)، لا يسمح لأي مستخدم جديد بإنشاء حساب عشوائي. تتم إضافة الحسابات وصلاحيات الوصول والاشتراكات حصراً من خلال جدول <strong className="text-white">Google Sheets</strong> الذي يتحكم به المسؤول.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40">
                <h4 className="font-bold text-indigo-200 mb-1.5">هل أنت المسؤول (Mouhcen)؟</h4>
                <p className="text-slate-400 mb-3 leading-relaxed">
                  يمكنك إدارة رابط الجدول والمزامنة الفورية وإضافة حسابات جديدة مباشرة من لوحة إدارة Google Sheets.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdminSheet();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
                >
                  <span>فتح لوحة مزامنة Google Sheets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
