import { Proof } from "utils/interface";
import { timestamp } from "utils/time";

export const isNotExpired = (expiresAt: number) => {
    return timestamp() < expiresAt;
};

export const isValidToken = (token: Proof | null) => {
    if (!token) return false;
    return isNotExpired(token.expires);
};

export const isValidTokens = (tokens: (Proof | null)[]) => {
    tokens.forEach((token) => {
        if (!isValidToken(token)) return false;
    })
    return true;
};