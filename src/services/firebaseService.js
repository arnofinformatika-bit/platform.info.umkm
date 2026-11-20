import { app, rtdb } from '../firebase';
import { 
  ref, 
  set, 
  remove, 
  onValue, 
  get 
} from 'firebase/database';
import { initialUMKMData } from '../data/initialData';

// Status koneksi Firebase
let connectionState = {
  connected: false,
  rtdbAvailable: !!rtdb,
  lastSync: null,
  error: null
};

const listeners = new Set();
export const subscribeFirebaseStatus = (callback) => {
  listeners.add(callback);
  callback({ ...connectionState });
  return () => listeners.delete(callback);
};

const updateStatus = (updates) => {
  connectionState = { ...connectionState, ...updates };
  listeners.forEach((cb) => cb({ ...connectionState }));
};

// ==========================================
// 1. KELOLA DATA UMKM (ADMIN & USER)
// ==========================================

/**
 * Berlangganan data UMKM secara realtime dari Firebase Realtime Database.
 */
export const subscribeUMKM = (onSuccess, onError) => {
  if (!rtdb) {
    console.warn('[Firebase] RTDB instance tidak tersedia.');
    return () => {};
  }

  try {
    const umkmRef = ref(rtdb, 'umkm');
    const unsubscribe = onValue(
      umkmRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          let list = [];
          if (Array.isArray(val)) {
            list = val.filter(Boolean);
          } else if (typeof val === 'object' && val !== null) {
            list = Object.keys(val).map((k) => ({
              ...val[k],
              id: Number(val[k].id) || val[k].id || k
            }));
          }
          
          // Bersihkan data dummy (ID 1-8) baik dari tampilan maupun dari Firebase RTDB
          const dummyNames = [
            "Batik Nusantara", "Keripik Makmur", "Es Segar Jaya", "Anyaman Kita",
            "Glow Beauty", "Kopi Senja Merapi", "Gerabah Kasongan Artistik", "Tenun Ikat Sumba Indah"
          ];
          const realList = [];
          list.forEach((item) => {
            const numId = Number(item.id);
            const isDummyId = !isNaN(numId) && numId >= 1 && numId <= 8;
            if (isDummyId && dummyNames.includes(item.nama) && !item.isUserAdded) {
              try {
                remove(ref(rtdb, `umkm/${item.id}`));
              } catch (e) {
                console.warn('Gagal menghapus data dummy dari RTDB:', item.id, e);
              }
            } else {
              realList.push(item);
            }
          });

          updateStatus({ connected: true, error: null, lastSync: new Date() });
          onSuccess(realList);
        } else {
          // Jika kosong di database, biarkan kosong tanpa menyuntikkan dummy
          updateStatus({ connected: true, error: null, lastSync: new Date() });
          onSuccess([]);
        }
      },
      (err) => {
        console.error('[Firebase] Realtime Database error:', err.message);
        updateStatus({ connected: false, error: err.message });
        if (onError) onError(err);
      }
    );

    return () => unsubscribe();
  } catch (e) {
    console.error('[Firebase] Subscribe error:', e);
    return () => {};
  }
};

/**
 * Menyimpan / memperbarui UMKM ke Firebase Realtime Database
 */
export const saveUMKMToFirebase = async (item) => {
  if (!rtdb) return item;

  const cleanId = String(item.id || Date.now());
  const itemToSave = {
    ...item,
    id: Number(item.id) || item.id,
    updatedAt: new Date().toISOString()
  };

  try {
    await set(ref(rtdb, `umkm/${cleanId}`), itemToSave);
    updateStatus({ connected: true, error: null, lastSync: new Date() });
    console.log('[Firebase] UMKM berhasil disimpan ke RTDB:', cleanId);
  } catch (err) {
    console.error('[Firebase] Gagal simpan UMKM ke RTDB:', err);
    updateStatus({ error: err.message });
    throw err;
  }

  return itemToSave;
};

/**
 * Menghapus UMKM dari Firebase Realtime Database
 */
export const deleteUMKMFromFirebase = async (id) => {
  if (!rtdb) return;

  const cleanId = String(id);
  try {
    await remove(ref(rtdb, `umkm/${cleanId}`));
    updateStatus({ lastSync: new Date() });
    console.log('[Firebase] UMKM berhasil dihapus dari RTDB:', cleanId);
  } catch (err) {
    console.error('[Firebase] Gagal hapus UMKM dari RTDB:', err);
  }
};

/**
 * Seed data dummy awal ke Firebase Realtime Database
 */
export const seedInitialUMKMToFirebase = async (force = false) => {
  if (!rtdb) return false;
  if (!initialUMKMData || initialUMKMData.length === 0) return true;

  try {
    for (const item of initialUMKMData) {
      await set(ref(rtdb, `umkm/${item.id}`), {
        ...item,
        updatedAt: new Date().toISOString()
      });
    }
    updateStatus({ connected: true, error: null, lastSync: new Date() });
    return true;
  } catch (err) {
    console.error('[Firebase] Gagal seed data awal:', err);
    return false;
  }
};

// ==========================================
// 2. KELOLA PENGGUNA (USERS)
// ==========================================

export const saveUserToFirebase = async (userData) => {
  if (!rtdb) return userData;

  const uid = String(userData.id || Date.now());
  const cleanUser = {
    ...userData,
    id: userData.id || Date.now(),
    createdAt: userData.createdAt || new Date().toISOString()
  };

  try {
    await set(ref(rtdb, `users/${uid}`), cleanUser);
    console.log('[Firebase] User berhasil didaftarkan ke RTDB:', cleanUser.email);
  } catch (err) {
    console.error('[Firebase] Gagal simpan user ke RTDB:', err);
  }

  return cleanUser;
};

export const subscribeUsers = (onSuccess) => {
  if (!rtdb) return () => {};

  try {
    return onValue(ref(rtdb, 'users'), (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        let list = [];
        if (Array.isArray(val)) {
          list = val.filter(Boolean);
        } else if (typeof val === 'object' && val !== null) {
          list = Object.keys(val).map((k) => ({
            ...val[k],
            id: Number(val[k].id) || val[k].id || k
          }));
        }
        onSuccess(list);
      }
    });
  } catch (err) {
    console.error('[Firebase] subscribeUsers error:', err);
    return () => {};
  }
};

/**
 * Mengambil data pengguna secara realtime satu kali (misal saat login)
 */
export const fetchUsersOnce = async () => {
  if (!rtdb) return [];
  try {
    const snapshot = await get(ref(rtdb, 'users'));
    if (snapshot.exists()) {
      const val = snapshot.val();
      let list = [];
      if (Array.isArray(val)) {
        list = val.filter(Boolean);
      } else if (typeof val === 'object' && val !== null) {
        list = Object.keys(val).map((k) => ({
          ...val[k],
          id: Number(val[k].id) || val[k].id || k
        }));
      }
      return list;
    }
  } catch (err) {
    console.error('[Firebase] fetchUsersOnce error:', err);
  }
  return [];
};

// ==========================================
// 3. KELOLA KATEGORI & EVENT
// ==========================================

export const saveCategoryToFirebase = async (category) => {
  if (!rtdb) return;
  const catId = String(category.id || Date.now());
  try {
    await set(ref(rtdb, `categories/${catId}`), category);
  } catch (err) {
    console.error(err);
  }
};

export const saveEventToFirebase = async (eventItem) => {
  if (!rtdb) return;
  const evId = String(eventItem.id || Date.now());
  try {
    await set(ref(rtdb, `events/${evId}`), eventItem);
  } catch (err) {
    console.error(err);
  }
};
