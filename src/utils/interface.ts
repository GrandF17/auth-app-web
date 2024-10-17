export type MailsExt = "yandex.ru" | "gmail.com" | "mail.ru"; // add some emails' here
export type Hash = `0x${string}`;
export type Mail = `${string}@${MailsExt}`;

export interface Token {
    hash: Hash;
    expires: number;
}

/**
 * @param refreshToken token to get new accessToken
 * @param accessToken token to access to the website without mandatory login
 * @abstract!!!we do not store these tokens in DB for safety, only user cookies!!!
 */

/**
 * @param root Merkle Tree Root Hash:   H(H(H(mail) + H(password)) + H(H(RT) + H(JWT)))
 * @param RT refresh token with expiration timestamp (usually 1 month)
 * @param JWT access token with expiration timestamp (usually 1 hour)
 */
export interface User {
    root: Hash;
    password: Hash;
    RT: Token;
    JWT: Token;
    timestamp: number;
}

/**
 * no need to set timestamp for operationa 
 * than can be called only once for one mail
 */
export interface Register {
    mail: Mail;
    password: Hash;
    verificationCode: number;
    // timestamp: number;
}

export interface Auth {
    mail: Mail;
    proof: Hash[];
    timestamp: number;       // to avoid replay atacks
}

export interface Login {
    mail: Mail;
    password: Hash;
    timestamp: number;       // to avoid replay atacks
}

export interface ServerResp {
    success: boolean;
    root?: Hash;
    RTProof?: Hash[];
    RTExpires?: number;
    JWTProof?: Hash[];
    JWTExpires?: number;
}

export interface ExtendedResponce {
    status: number;
    response: ServerResp;
}
