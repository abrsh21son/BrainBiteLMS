export default defineNuxtPlugin(() => {
  const client = useSupabaseClient();
  const router = useRouter();

  // Handle auth state changes
  client.auth.onAuthStateChange(async (event, session) => {
    // Handle email verification callback
    if (event === 'SIGNED_IN' && session?.user && process.client) {
      const urlParams = new URLSearchParams(window.location.search);
      const type = urlParams.get('type');
      const token = urlParams.get('token');
      const hash = urlParams.get('hash');
      
      // Check if this is coming from email verification link
      // Supabase adds type=signup and token/hash params when verifying email
      if (type === 'signup' && (token || hash)) {
        // User just verified their email via the link
        // Sign them out so they need to log in with password
        await client.auth.signOut();
        
        // Clean up URL params and redirect to login page with verified flag
        await router.replace({ path: '/login', query: { verified: 'true' } });
        return;
      }
    }

    // Handle token refresh - if user is already logged in, keep them logged in
    if (event === 'TOKEN_REFRESHED' && session?.user) {
      // User is already authenticated, no redirect needed
      return;
    }
  });
});

