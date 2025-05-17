import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        name: null,
        email: null,
        id: null
    },
    token: null,

    setUser: (user, token) => set({ user, token }),
    clearUser: () => set({ user: null, token: null, email: null }),
}));

export default useUserStore;