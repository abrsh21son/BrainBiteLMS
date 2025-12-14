import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  devServer: {
    port: 3001,
  },
  
  vite: {
    server: {
      hmr: {
        port: 24679,
      },
    },
  },
  
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
  ],
  
  css: ['~/assets/css/main.css'],
  
  supabase: {
    redirect: false,
    // Explicitly provide URL and key from environment variables
    // This ensures they're available during module initialization
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || 'https://brainbitelms-backend.onrender.com',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
  
  typescript: {
    strict: true,
    typeCheck: false, // Can enable in CI/CD
  },
  
  app: {
    head: {
      title: 'BrainBite - AI-Powered Learning',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Generate and learn from AI-powered courses',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
});
