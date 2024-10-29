// dar inja baraye sakht 'store' az 'create' dar 'zustand' estefade mikonim.
import { create } from "zustand";

// baraye namayesh vaziat 'store' dar mohit 'develope' az in estefade mikonim.
import { mountStoreDevtools } from "simple-zustand-devtools";

/*
  dar in khat baraye ma 'store' sakht mishe. hala baraye vorudi behesh 'set' baraye 'update va beruz resani' va 'get' baraye 'dastresi
  be vaziat feli' dadim.

  in 'create' bayad 'meghdar avalie ya initial' begire ke da inja 'allUserData' va 'loading' hastan.
*/
const useAuthStore = create((set, get) => ({
  allUserData: null,
  loading: false,

  // in 'function' baraye dastresi be 'allUserData' az 'get' estefade mikonad ta meghdar 'user_id, username, ...' data user ro begirad.
  user: () => ({
    user_id: get().allUserData?.user_id || null,
    usernames: get().allUserData?.username || null,
  }),

  // in 'function' baraye 'update' meghdar 'allUserData' az 'set' estefade mikonad.
  setUser: () => set({ allUserData: user }),

  setLoading: (loading) => set({ loading }),

  setLoggedIn: () => get().allUserData !== null,
}));

// in khat mige age mohit 'develope' bud az 'mountStoreDevtools' estefade kon; ke be ma vaziat 'store' ro neshun mide
if (import.meta.env.DEV) {
  mountStoreDevtools("Store", useAuthStore);
}

export { useAuthStore };
