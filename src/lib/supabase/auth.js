import { supabase } from "./client";

const authService = {
  onAuthStateChange(callback) {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return data.subscription;
  },

  getSession() {
    return supabase.auth.getSession();
  },

  signUp(fullName, email, password) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
  },

  signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  signOut() {
    return supabase.auth.signOut();
  },

  updatePassword(password) {
    return supabase.auth.updateUser({ password });
  },

  updateFullName(fullName) {
    return supabase.auth.updateUser({
      data: { full_name: fullName },
    });
  },

  resetPasswordForEmail(email) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
  },
};

export default authService;
