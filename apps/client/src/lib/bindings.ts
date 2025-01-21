// This file was generated by [rspc](https://github.com/specta-rs/rspc). Do not edit this file manually.

export type Procedures = {
    queries: 
        { key: "profile.read", input: string, result: ProfileDto },
    mutations: 
        { key: "auth.signup", input: SignupRequestDto, result: SessionDto },
    subscriptions: never
};

export type AppMetadata = { provider: string | null; providers: string[] | null }

/**
 * <https://supabase.com/docs/guides/auth/identities>
 */
export type Identity = { identity_id: string; id: string; user_id: string; identity_data: IdentityData; provider: string; last_sign_in_at: string; created_at: string; updated_at: string; email: string | null }

export type IdentityData = { email: string | null; email_verified: boolean; phone_verified: boolean; sub: string }

export type ProfileDto = { id: string; username: string }

export type SessionDto = { provider_token: string | null; provider_refresh_token: string | null; access_token: string; token_type: string; expires_in: string; expires_at: string; refresh_token: string; user: User }

export type SignupRequestDto = { email: string; password: string; username: string }

/**
 * <https://supabase.com/docs/guides/auth/users>
 */
export type User = { id: string; aud: string; role: string; email: string; invited_at: string | null; confirmation_sent_at: string | null; email_confirmed_at: string | null; phone: string; phone_confirmed_at: string | null; confirmed_at: string | null; recovery_sent_at: string | null; last_sign_in_at: string | null; app_metadata: AppMetadata; user_metadata: UserMetadata; identities: Identity[]; created_at: string; updated_at: string; is_anonymous: boolean }

export type UserMetadata = { name: string | null; full_name: string | null; email: string | null; email_verified: boolean | null; phone_verified: boolean | null; picture: string | null; avatar_url: string | null }
