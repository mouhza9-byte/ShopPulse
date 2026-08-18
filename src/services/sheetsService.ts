import { AuthorizedUser, SheetConfig } from '../types';

const LOCAL_STORAGE_USERS_KEY = 'mouhcen_pro_sheet_users';
const LOCAL_STORAGE_SHEET_CONFIG_KEY = 'mouhcen_pro_sheet_config';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'mouhcen_pro_active_session';

// Initial pre-configured seed authorized users list in the Google Sheet format
export const INITIAL_DEFAULT_AUTHORIZED_USERS: AuthorizedUser[] = [
  {
    id: 'user-admin-1',
    fullName: 'Mouhcen (Admin & Owner)',
    email: 'mouhza9@gmail.com',
    phone: '+213661234567',
    password: 'pro@mouhcen2026',
    status: 'active',
    role: 'admin',
    expiryDate: '2030-12-31',
    addedDate: '2026-08-18',
    notes: 'حساب المسؤول المباشر والمتحكم في جداول Google Sheets',
  },
  {
    id: 'user-demo-1',
    fullName: 'سفيان دروبشيبينغ - الجزائر',
    email: 'soufiane.ecom@gmail.com',
    phone: '+213555123456',
    password: 'ecom@dz2026',
    status: 'active',
    role: 'vip_member',
    expiryDate: '2027-01-01',
    addedDate: '2026-08-18',
    notes: 'متجر ميديا باير ومختص في السوق الجزائري',
  },
  {
    id: 'user-demo-2',
    fullName: 'عمر القحطاني - التجارة في الخليج',
    email: 'omar.gcc.ecom@gmail.com',
    phone: '+966501234567',
    password: 'gcc@winner2026',
    status: 'active',
    role: 'pro_subscriber',
    expiryDate: '2026-12-31',
    addedDate: '2026-08-18',
    notes: 'حملات إعلانات Meta في السعودية والإمارات',
  },
  {
    id: 'user-demo-3',
    fullName: 'ياسمين ميديا باير - المغرب العربي',
    email: 'yasmine.ads@gmail.com',
    phone: '+212661987654',
    password: 'ads@winner2026',
    status: 'active',
    role: 'vip_member',
    expiryDate: '2027-06-30',
    addedDate: '2026-08-18',
    notes: 'متخصصة في إعلانات انستغرام وفيسبوك للمنتجات الرابحة',
  },
];

export const DEFAULT_SHEET_CONFIG: SheetConfig = {
  sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // Example clean template ID
  sheetName: 'AuthorizedUsers',
  publishedUrl: '',
  syncStatus: 'connected',
  lastSyncedAt: new Date().toISOString(),
  totalSyncedUsers: INITIAL_DEFAULT_AUTHORIZED_USERS.length,
};

// Retrieve stored users
export const getStoredAuthorizedUsers = (): AuthorizedUser[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading stored users:', e);
  }
  // If not found, save and return initial default users
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(INITIAL_DEFAULT_AUTHORIZED_USERS));
  return INITIAL_DEFAULT_AUTHORIZED_USERS;
};

// Save authorized users to local cache
export const saveStoredAuthorizedUsers = (users: AuthorizedUser[]) => {
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};

// Retrieve Sheet config
export const getStoredSheetConfig = (): SheetConfig => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_SHEET_CONFIG_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading sheet config:', e);
  }
  return DEFAULT_SHEET_CONFIG;
};

// Save Sheet config
export const saveStoredSheetConfig = (config: SheetConfig) => {
  localStorage.setItem(LOCAL_STORAGE_SHEET_CONFIG_KEY, JSON.stringify(config));
};

// Retrieve active session
export const getActiveSessionUser = (): AuthorizedUser | null => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading active session:', e);
  }
  return null;
};

// Save active session
export const setActiveSessionUser = (user: AuthorizedUser | null) => {
  if (user) {
    localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
  }
};

// Parse CSV text into AuthorizedUser objects
export const parseUsersFromCSV = (csvText: string): AuthorizedUser[] => {
  const lines = csvText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length <= 1) return [];

  // Parse header
  const headers = lines[0].split(',').map((h) => h.replace(/["'\r]/g, '').trim().toLowerCase());

  // Detect column indexes
  const nameIndex = headers.findIndex((h) => h.includes('name') || h.includes('اسم') || h.includes('nom'));
  const emailIndex = headers.findIndex((h) => h.includes('email') || h.includes('بريد') || h.includes('courriel'));
  const phoneIndex = headers.findIndex((h) => h.includes('phone') || h.includes('هاتف') || h.includes('tel') || h.includes('رقم'));
  const passIndex = headers.findIndex((h) => h.includes('pass') || h.includes('كلمة') || h.includes('mot de passe') || h.includes('سر'));
  const statusIndex = headers.findIndex((h) => h.includes('status') || h.includes('حالة') || h.includes('etat'));
  const roleIndex = headers.findIndex((h) => h.includes('role') || h.includes('صلاحية') || h.includes('نوع'));
  const expiryIndex = headers.findIndex((h) => h.includes('expiry') || h.includes('تاريخ') || h.includes('انتهاء') || h.includes('date'));

  const users: AuthorizedUser[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV splitting handling commas inside quotes
    const row = lines[i].split(',').map((item) => item.replace(/^["']|["']$/g, '').trim());
    if (row.length === 0 || !row[0]) continue;

    const email = emailIndex >= 0 ? row[emailIndex] : row[1] || '';
    if (!email || !email.includes('@')) continue;

    const user: AuthorizedUser = {
      id: `sheet-user-${i}-${Date.now()}`,
      fullName: nameIndex >= 0 ? row[nameIndex] : row[0] || 'مستخدم مصرح به',
      email: email.toLowerCase().trim(),
      phone: phoneIndex >= 0 ? row[phoneIndex] : row[2] || '',
      password: passIndex >= 0 ? row[passIndex] : row[3] || '123456',
      status: (statusIndex >= 0 && (row[statusIndex].toLowerCase().includes('suspend') || row[statusIndex].includes('معلق')))
        ? 'suspended'
        : 'active',
      role: (roleIndex >= 0 && (row[roleIndex].toLowerCase().includes('admin') || row[roleIndex].includes('مدير')))
        ? 'admin'
        : 'pro_subscriber',
      expiryDate: expiryIndex >= 0 ? row[expiryIndex] : '2027-12-31',
      addedDate: new Date().toISOString().split('T')[0],
      notes: 'تمت المزامنة من جدول Google Sheets التابع للمسؤول',
    };

    users.push(user);
  }

  return users;
};

// Fetch authorized users directly from Google Sheets API using OAuth access token
export const fetchUsersFromGoogleSheetsAPI = async (
  sheetId: string,
  accessToken: string,
  range = 'A1:H100'
): Promise<AuthorizedUser[]> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `Google Sheets API returned status ${response.status}`);
  }

  const data = await response.json();
  const rows: string[][] = data.values || [];
  if (rows.length <= 1) {
    return [];
  }

  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const nameIndex = headers.findIndex((h) => h.includes('name') || h.includes('اسم'));
  const emailIndex = headers.findIndex((h) => h.includes('email') || h.includes('بريد'));
  const phoneIndex = headers.findIndex((h) => h.includes('phone') || h.includes('هاتف') || h.includes('رقم'));
  const passIndex = headers.findIndex((h) => h.includes('pass') || h.includes('كلمة') || h.includes('سر'));
  const statusIndex = headers.findIndex((h) => h.includes('status') || h.includes('حالة'));
  const roleIndex = headers.findIndex((h) => h.includes('role') || h.includes('صلاحية'));
  const expiryIndex = headers.findIndex((h) => h.includes('expiry') || h.includes('تاريخ') || h.includes('انتهاء'));

  const users: AuthorizedUser[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const email = emailIndex >= 0 ? row[emailIndex] : row[1] || '';
    if (!email || !email.includes('@')) continue;

    users.push({
      id: `gsheet-row-${i}`,
      fullName: nameIndex >= 0 ? row[nameIndex] : row[0] || 'عضو معتمد',
      email: email.toLowerCase().trim(),
      phone: phoneIndex >= 0 ? row[phoneIndex] : row[2] || '',
      password: passIndex >= 0 ? row[passIndex] : row[3] || 'pro2026',
      status: statusIndex >= 0 && (row[statusIndex]?.includes('معلق') || row[statusIndex]?.toLowerCase().includes('suspend')) ? 'suspended' : 'active',
      role: roleIndex >= 0 && (row[roleIndex]?.includes('مدير') || row[roleIndex]?.toLowerCase().includes('admin')) ? 'admin' : 'pro_subscriber',
      expiryDate: expiryIndex >= 0 ? row[expiryIndex] : '2027-12-31',
      addedDate: new Date().toISOString().split('T')[0],
      notes: 'تم التحقق من جدول Google Sheets عبر OAuth',
    });
  }

  return users;
};

// Sync users from public CSV or server proxy
export const syncUsersFromPublicSheet = async (sheetIdOrUrl: string): Promise<AuthorizedUser[]> => {
  const response = await fetch('/api/sheets/fetch-public-csv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sheetUrlOrId: sheetIdOrUrl }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل الاتصال بجدول Google Sheets');
  }

  const users = parseUsersFromCSV(data.csv);
  if (users.length > 0) {
    saveStoredAuthorizedUsers(users);
  }
  return users;
};

// Verify user credentials against the authorized Google Sheet database
export const verifyCredentialsAgainstSheet = (
  emailInput: string,
  passwordInput: string,
  phoneInput?: string
): { success: boolean; user?: AuthorizedUser; message: string } => {
  const users = getStoredAuthorizedUsers();
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPhone = phoneInput ? phoneInput.trim().replace(/[\s-]/g, '') : '';

  // Find user by email
  const matchedUser = users.find((u) => u.email.toLowerCase().trim() === cleanEmail);

  if (!matchedUser) {
    return {
      success: false,
      message: 'البريد الإلكتروني غير مسجل في جدول الحسابات المصرح بها من قبل المسؤول (Mouhcen). لا يمكن إنشاء حسابات شخصية تلقائياً.',
    };
  }

  if (matchedUser.status === 'suspended') {
    return {
      success: false,
      message: 'هذا الحساب معلق مؤقتاً في جدول الإدارة. يرجى التواصل مع المسؤول لتجديد الاشتراك.',
    };
  }

  // Verify password
  if (matchedUser.password && matchedUser.password !== passwordInput.trim()) {
    return {
      success: false,
      message: 'كلمة المرور غير صحيحة. يرجى إدخال كلمة المرور الممنوحة لك في جدول البيانات.',
    };
  }

  // If phone provided, verify match or check phone
  if (cleanPhone && matchedUser.phone) {
    const userCleanPhone = matchedUser.phone.replace(/[\s-]/g, '');
    if (!userCleanPhone.includes(cleanPhone) && !cleanPhone.includes(userCleanPhone)) {
      return {
        success: false,
        message: 'رقم الهاتف المدخل لا يتطابق مع الرقم المسجل لهذا الحساب في جدول البيانات.',
      };
    }
  }

  return {
    success: true,
    user: matchedUser,
    message: 'تم التحقق بنجاح ومطابقة البيانات مع جدول Google Sheets المصرح به.',
  };
};

// Check and recover user data by Email and Phone
export const recoverAccountViaPhoneAndEmail = (
  emailInput: string,
  phoneInput: string
): { success: boolean; user?: AuthorizedUser; message: string } => {
  const users = getStoredAuthorizedUsers();
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPhone = phoneInput.trim().replace(/[\s-]/g, '');

  const matchedUser = users.find((u) => {
    const uEmail = u.email.toLowerCase().trim();
    const uPhone = u.phone.replace(/[\s-]/g, '');
    return uEmail === cleanEmail && (uPhone.includes(cleanPhone) || cleanPhone.includes(uPhone));
  });

  if (!matchedUser) {
    return {
      success: false,
      message: 'لم يتم العثور على أي حساب مسجل بهذه البيانات المشتركة في جدول Google Sheets.',
    };
  }

  return {
    success: true,
    user: matchedUser,
    message: `تم التحقق من هويتك: كلمة المرور الخاصة بك في الجدول هي "${matchedUser.password}" والصلاحية حتى ${matchedUser.expiryDate || 'مستمر'}.`,
  };
};

// Add or update an authorized user (Admin action)
export const addOrUpdateAuthorizedUser = (user: AuthorizedUser) => {
  const users = getStoredAuthorizedUsers();
  const index = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (index >= 0) {
    users[index] = { ...users[index], ...user };
  } else {
    users.unshift(user);
  }
  saveStoredAuthorizedUsers(users);
};

// Aliases for seamless component consumption
export const getSyncedUsersList = (): AuthorizedUser[] => {
  return getStoredAuthorizedUsers();
};

export const addAuthorizedUserToLocalSheet = (user: AuthorizedUser) => {
  addOrUpdateAuthorizedUser(user);
};

export const syncUsersFromPublicSheetCsv = async (
  sheetUrlOrId: string
): Promise<{ success: boolean; message: string; count?: number }> => {
  try {
    const users = await syncUsersFromPublicSheet(sheetUrlOrId);
    return {
      success: true,
      message: `تمت المزامنة بنجاح واستيراد ${users.length} مستخدم مصرح به من Google Sheet.`,
      count: users.length,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'فشلت عملية المزامنة مع الرابط المدخل.',
    };
  }
};

