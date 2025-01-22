// This file was generated by [rspc](https://github.com/specta-rs/rspc). Do not edit this file manually.

export type Procedures = {
    queries: 
        { key: "auth.signin", input: SigninRequestDto, result: null } | 
        { key: "comment.read", input: number, result: CommentDto } | 
        { key: "post.read", input: number, result: PostDto } | 
        { key: "profile.read", input: string, result: ProfileDto } | 
        { key: "user.read", input: string, result: UserDto },
    mutations: 
        { key: "auth.signup", input: SignupRequestDto, result: null } | 
        { key: "comment.create", input: CreateCommentDto, result: CommentDto } | 
        { key: "comment.delete", input: number, result: string } | 
        { key: "post.create", input: CreatePostDto, result: PostDto } | 
        { key: "post.delete", input: number, result: string } | 
        { key: "user.delete", input: string, result: string },
    subscriptions: never
};

export type CommentDto = { id: number; content: string; pid: number; rid: number | null; uid: number | null; created_at: string }

export type CreateCommentDto = { content: string; pid: number; rid: number | null; uid: number | null }

export type CreatePostDto = { content: string; tags: string[] | null; title: string; uid: number | null }

export type PostDto = { id: number; content: string; tags: string[]; title: string }

export type ProfileDto = { id: number; about: string | null; created_at: string; username: string; url: string | null }

export type SigninRequestDto = { username: string; password: string }

export type SignupRequestDto = { email: string; password: string; username: string }

export type UserDto = { id: number; created_at: string; email: string; encrypted_password: string; salt: string; username: string }
