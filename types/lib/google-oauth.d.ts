import type { Auth } from 'googleapis';
export declare const getGoogleOauth2Client: (tokens: Auth.Credentials) => Auth.OAuth2Client;
export declare const getTokensFromCode: (code: string) => Promise<Auth.Credentials>;
