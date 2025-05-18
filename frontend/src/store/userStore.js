import { create } from "zustand";

const useUserStore = create((set) => ({

    user: {
        name: null,
        email: null,
        id: null
    },
    token: null,

    setUser: (user) => set({ user }),

    setToken: (token) => set({ token }),

    clearUser: () => set({ user: {}, token: null }),

}));

export default useUserStore;