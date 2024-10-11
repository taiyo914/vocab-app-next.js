import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";

interface AuthState {
  userId: string | null;
  error: string | null;
  getUserId: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  error: null,

  getUserId: async () => {
    const supabase = createClient();
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);
      set({ userId: user?.id || null });
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));

export default useAuthStore;
