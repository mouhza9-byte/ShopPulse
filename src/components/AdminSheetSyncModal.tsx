import React, { useState } from 'react';
import {
  X,
  Sheet,
  UserPlus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Shield,
  Phone,
  Mail,
  User,
  ExternalLink,
  Copy,
  Check,
  FileSpreadsheet,
} from 'lucide-react';
import { AuthorizedUser } from '../types';
import {
  getSyncedUsersList,
  addAuthorizedUserToLocalSheet,
  syncUsersFromPublicSheetCsv,
} from '../services/sheetsService';

interface AdminSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthorizedUser | null;
  onUsersUpdated: () => void;
}

export const AdminSheetSyncModal: React.FC<AdminSheetSyncModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUsersUpdated,
}) => {
  if (!isOpen) return null;

  const [users, setUsers] = useState<AuthorizedUser[]>(getSyncedUsersList());
  const [csvUrl, setCsvUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'add' | 'sync' | 'template'>('users');
  const [copied, setCopied] = useState(false);

  // New user form state
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'subscriber' | 'viewer'>('subscriber');

  const handleRefreshList = () => {
    setUsers(getSyncedUsersList());
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail || !newPassword || !newPhone) {
      setSyncStatusMsg('يرجى ملء جميع الحقول المطلوبة للمستخدم الجديد.');
      setIsSuccess(false);
      return;
    }

    const newUser: AuthorizedUser = {
      id: `usr-${Date.now()}`,
      fullName: newFullName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      password: newPassword.trim(),
      role: newRole,
      status: 'active',
      addedDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-12-31',
    };

    addAuthorizedUserToLocalSheet(newUser);
    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setNewPassword('');
    handleRefreshList();
    onUsersUpdated();

    setSyncStatusMsg(`تمت إضافة المستخدم "${newUser.fullName}" بنجاح إلى قاعدة المستخدمين المصرح بها!`);
    setIsSuccess(true);
    setActiveTab('users');
  };

  const handleSyncCsv = async () => {
    if (!csvUrl.trim()) {
      setSyncStatusMsg('يرجى إدخال رابط Google Sheet المنشور كـ CSV.');
      setIsSuccess(false);
      return;
    }

    setIsSyncing(true);
    setSyncStatusMsg(null);

    const result = await syncUsersFromPublicSheetCsv(csvUrl.trim());
    setIsSyncing(false);
    setSyncStatusMsg(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      handleRefreshList();
      onUsersUpdated();
    }
  };

  const handleCopyTemplate = () => {
    const template = `FullName,Email,Phone,Password,Role,Status,ExpiryDate
Mohsen Admin,mohsen@ecommercepro.com,+213550123456,AdminPro2026!,admin,active,2030-12-31
Ahmed Benali,ahmed.dz@gmail.com,+213661987654,DzWinner2026,subscriber,active,2027-12-31
Sami Al-Otaibi,sami.sa@gmail.com,+966501122334,GccPro2026,subscriber,active,2027-12-31`;

    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">إدارة ومزامنة Google Sheets</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  لوحة المسؤول (Mouhcen)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                التحكم المركزي في حسابات المستخدمين، كلمات المرور، وأرقام الهواتف المصرح لها فقط
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'users' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            المستخدمين المعتمدين ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'add' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            إضافة مستخدم جديد للجدول
          </button>
          <button
            onClick={() => setActiveTab('sync')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'sync' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            مزامنة رابط Google Sheet CSV
          </button>
          <button
            onClick={() => setActiveTab('template')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'template' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            هيكل وأعمدة Google Sheets
          </button>
        </div>

        {/* Status Message */}
        {syncStatusMsg && (
          <div
            className={`mx-6 mt-4 p-3 rounded-2xl text-xs flex items-center gap-2 ${
              isSuccess
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            )}
            <span>{syncStatusMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {/* TAB 1: USERS LIST */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  فقط هؤلاء المستخدمين يمكنهم تسجيل الدخول واستعادة كلمات المرور:
                </span>
                <button
                  onClick={handleRefreshList}
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تحديث القائمة</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">الاسم الكامل</th>
                      <th className="p-3">البريد الإلكتروني</th>
                      <th className="p-3">رقم الهاتف</th>
                      <th className="p-3">كلمة المرور</th>
                      <th className="p-3">نوع الحساب</th>
                      <th className="p-3">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-3 font-bold text-white flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{u.fullName}</span>
                        </td>
                        <td className="p-3 font-mono text-slate-300" dir="ltr">{u.email}</td>
                        <td className="p-3 font-mono text-slate-300" dir="ltr">{u.phone}</td>
                        <td className="p-3 font-mono text-amber-300 bg-slate-900/40 rounded px-2" dir="ltr">
                          {u.password || '••••••••'}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              u.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {u.role === 'admin' ? 'مدير عام (Mouhcen)' : 'مشترك معتمد'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                            مفعل
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ADD USER MANUALLY */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddUser} className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <span>إضافة مستخدم جديد مصرح له بالدخول:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الاسم الكامل:
                  </label>
                  <input
                    type="text"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="مثال: يوسف القادري"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    البريد الإلكتروني:
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="youssef@gmail.com"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    رقم الهاتف:
                  </label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+213... أو +966..."
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    كلمة المرور المحددة للمستخدم:
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="MouhcenPro2026!"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  نوع الصلاحية:
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white"
                >
                  <option value="subscriber">مشترك معتمد (وصول كامل للإعلانات والتحليل)</option>
                  <option value="admin">مسؤول عام (صلاحيات الإدارة والجدول)</option>
                  <option value="viewer">مشاهد فقط</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
              >
                حفظ وإضافة المستخدم المصرح به
              </button>
            </form>
          )}

          {/* TAB 3: CSV URL SYNC */}
          {activeTab === 'sync' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>مزامنة مباشرة من رابط Google Sheets (Publish to Web as CSV):</span>
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                إذا قمت بإنشاء جدول في حسابك على Google Sheets وتريد مزامنة حسابات المشتركين تلقائياً:
                <br />
                1. افتح الجدول في Google Sheets ثم اضغط <strong>File → Share → Publish to the web</strong>.
                <br />
                2. اختر الصيغة <strong>Comma-separated values (.csv)</strong> ثم اضغط Publish.
                <br />
                3. الصق الرابط هنا واضغط مزامنة.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  رابط Google Sheets المنشور بصيغة CSV:
                </label>
                <input
                  type="url"
                  value={csvUrl}
                  onChange={(e) => setCsvUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white font-mono"
                  dir="ltr"
                />
              </div>

              <button
                type="button"
                onClick={handleSyncCsv}
                disabled={isSyncing}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSyncing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>جاري سحب وتحديث الحسابات من Google Sheets...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>مزامنة وتحديث جدول المستخدمين الآن</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 4: TEMPLATE & SCHEMA */}
          {activeTab === 'template' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>عناوين الأعمدة المطلوبة في Google Sheet:</span>
                </h4>

                <button
                  onClick={handleCopyTemplate}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الهيكل</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-slate-300 overflow-x-auto" dir="ltr">
                FullName | Email | Phone | Password | Role | Status | ExpiryDate
              </div>

              <div className="text-xs text-slate-400 space-y-1.5">
                <div>• <strong className="text-white">FullName</strong>: اسم العميل أو المشترك.</div>
                <div>• <strong className="text-white">Email</strong>: البريد الإلكتروني الخاص به لتسجيل الدخول.</div>
                <div>• <strong className="text-white">Phone</strong>: رقم الهاتف (لتأمين الدخول واستعادة البيانات).</div>
                <div>• <strong className="text-white">Password</strong>: كلمة المرور الممنوحة له من طرفك.</div>
                <div>• <strong className="text-white">Role</strong>: admin أو subscriber.</div>
                <div>• <strong className="text-white">Status</strong>: active أو disabled.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
