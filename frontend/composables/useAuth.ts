import { handleApiError } from '~/utils/error-handler';

export const useAuth = () => {
  const client = useSupabaseClient();
  const router = useRouter();
  const loading = ref(false);
  const errorMsg = ref<string | null>(null);
  const successMsg = ref<string | null>(null);

  const normalizeErrorMessage = (error: any): string => {
    const message = error?.message || '';
    
    if (message.includes('Invalid API key') || message.includes('API key') || message.includes('JWT')) {
      return 'Configuration error: Please check your Supabase configuration. Ensure your environment variables are set correctly.';
    }
    
    if (message.includes('Email not confirmed') || message.includes('email_not_confirmed')) {
      return 'Please check your email and click the confirmation link before signing in. Check your spam folder if you don\'t see it.';
    }
    
    if (message.includes('Invalid login') || message.includes('Invalid credentials')) {
      return 'Invalid email or password. Please try again.';
    }
    
    if (message.includes('already registered')) {
      return 'This email is already registered. Please sign in instead.';
    }
    
    return handleApiError(error);
  };

  const handleLogin = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    errorMsg.value = null;
    successMsg.value = null;

    try {
      const { error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        await router.push(redirectPath);
      } else {
        await router.push('/courses');
      }
    } catch (error: any) {
      errorMsg.value = normalizeErrorMessage(error);
      console.error('Login error:', error);
    } finally {
      loading.value = false;
    }
  };

  const handleSignUp = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    errorMsg.value = null;
    successMsg.value = null;

    try {
      // Get frontend URL from environment or use current origin
      let frontendUrl = '';
      if (process.client) {
        const config = useRuntimeConfig();
        frontendUrl = (config.public.frontendUrl as string) || window.location.origin;
      } else {
        const config = useRuntimeConfig();
        frontendUrl = (config.public.frontendUrl as string) || '';
      }

      const { data, error } = await client.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${frontendUrl}/login?verified=true`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.user && data.session) {
        successMsg.value = 'Account created successfully! Redirecting to login...';
        setTimeout(async () => {
          await router.push('/login');
        }, 2000);
      } else {
        successMsg.value = 'Success! Please check your email for the confirmation link. You will be redirected to login.';
        setTimeout(async () => {
          await router.push('/login');
        }, 3000);
      }
    } catch (error: any) {
      errorMsg.value = normalizeErrorMessage(error);
      successMsg.value = null;
      console.error('Signup error:', error);
    } finally {
      loading.value = false;
    }
  };

  const resendConfirmationEmail = async (email: string): Promise<void> => {
    loading.value = true;
    errorMsg.value = null;
    successMsg.value = null;

    try {
      const { error } = await client.auth.resend({
        type: 'signup',
        email: email.trim(),
      });

      if (error) {
        throw error;
      }

      successMsg.value = 'Confirmation email sent! Please check your inbox.';
    } catch (error: any) {
      errorMsg.value = normalizeErrorMessage(error);
      successMsg.value = null;
      console.error('Resend confirmation error:', error);
    } finally {
      loading.value = false;
    }
  };

  const handlePasswordReset = async (email: string): Promise<void> => {
    loading.value = true;
    errorMsg.value = null;
    successMsg.value = null;

    try {
      // Get frontend URL from environment or use current origin
      let frontendUrl = '';
      if (process.client) {
        const config = useRuntimeConfig();
        frontendUrl = (config.public.frontendUrl as string) || window.location.origin;
      } else {
        const config = useRuntimeConfig();
        frontendUrl = (config.public.frontendUrl as string) || '';
      }

      const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${frontendUrl}/reset-password`,
      });

      if (error) {
        throw error;
      }

      successMsg.value = 'Password reset email sent! Please check your inbox.';
    } catch (error: any) {
      errorMsg.value = normalizeErrorMessage(error);
      successMsg.value = null;
      console.error('Password reset error:', error);
    } finally {
      loading.value = false;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await client.auth.signOut();
      await router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      await router.push('/login');
    }
  };

  const clearMessages = () => {
    errorMsg.value = null;
    successMsg.value = null;
  };

  return {
    loading: readonly(loading),
    errorMsg: readonly(errorMsg),
    successMsg: readonly(successMsg),
    handleLogin,
    handleSignUp,
    resendConfirmationEmail,
    handlePasswordReset,
    handleLogout,
    clearMessages,
  };
};
