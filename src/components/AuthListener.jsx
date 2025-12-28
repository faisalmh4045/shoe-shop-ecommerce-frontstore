import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession, setLoading } from "@/store/authSlice";
import authService from "@/lib/supabase/auth";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let subscription = null;

    const initializeAuth = async () => {
      // fetch initial session
      const { data } = await authService.getSession();
      dispatch(setSession(data?.session ?? null));

      // subscribe to auth changes
      subscription = authService.onAuthStateChange((_event, session) => {
        dispatch(setSession(session));
      });

      dispatch(setLoading(false));
    };

    initializeAuth();

    return () => subscription?.unsubscribe?.();
  }, [dispatch]);

  return null;
};

export default AuthListener;
