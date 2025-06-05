import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    (set) => ({
        user: {
            name: "vietanh1",
            email: 'vietanh@gmail.com',
            id: "68274bf51fc67ad4397bcc51",
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mjc0YmY1MWZjNjdhZDQzOTdiY2M1MSIsImlhdCI6MTc0NzYxODA4NCwiZXhwIjoxNzUwMjEwMDg0fQ.ENtt_NTjA0wdhCe0I5EMHIUdL0j3Rzw6cb550L0n48M',

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
);

export default useUserStore;
