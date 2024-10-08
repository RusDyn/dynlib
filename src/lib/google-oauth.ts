import type { Auth } from 'googleapis';
import { google } from 'googleapis';

export const getGoogleOauth2Client = (
  tokens: Auth.Credentials
): Auth.OAuth2Client => {
  const googleOauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );
  googleOauth2Client.setCredentials(tokens);
  return googleOauth2Client;
};

export const getTokensFromCode = async (
  code: string
): Promise<Auth.Credentials> => {
  const googleOauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );
  const { tokens } = await googleOauth2Client.getToken(code);
  return tokens;
};
