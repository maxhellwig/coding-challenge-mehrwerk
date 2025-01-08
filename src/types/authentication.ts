export interface AuthRequestCredentials {
  client_id: string;
  client_secret: string;
  grant_type: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
}
