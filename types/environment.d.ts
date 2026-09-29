declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL?: string;
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;
    CYBERSABHA_ADMIN_EMAILS?: string;
    CYBERSABHA_NOTIFICATION_EMAIL?: string;
    CYBERSABHA_REPLY_TO?: string;
    CYBERSABHA_EMAIL_FROM?: string;
    RESEND_API_KEY?: string;
  }
}
