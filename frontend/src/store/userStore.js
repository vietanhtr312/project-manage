import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            user: {
                name: null,
                email: null,
                id: null,
            },
            token: null,

            setUser: (user) => set(() => ({ user })),
            setToken: (token) => set(() => ({ token })),
            clearUser: () =>
                set(() => ({
                    user: { name: null, email: null, id: null },
                    token: null,
                })),
        }),
        {
            name: "user",
        }
    )
);

export default useUserStore;
