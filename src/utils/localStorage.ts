import { Mail, Proof, ServerResp } from "utils/interface";

/////////////////////////////////

export const saveEmail = (mail: Mail) => {
    localStorage.setItem(
        "mail",
        JSON.stringify(mail)
    );
}

export const saveJWT = (response: ServerResp) => {
    if (!response.JWT) return;

    localStorage.setItem(
        "JWTProof",
        JSON.stringify({
            proof: response.JWT.proof,
            expDate: response.JWT.expires,
        })
    );
}

export const saveRT = (response: ServerResp) => {
    if (!response.RT) return;

    localStorage.setItem(
        "RTProof",
        JSON.stringify({
            proof: response.RT.proof,
            expDate: response.RT.expires,
        })
    );
}

/////////////////////////////////

export const getMail = (): Mail | null => {
    return JSON.parse(localStorage.getItem("mail") ?? "null");
}

export const getRT = (): Proof | null => {
    return JSON.parse(localStorage.getItem("RTProof") ?? "null");
}

export const getJWT = (): Proof | null => {
    return JSON.parse(localStorage.getItem("JWTProof") ?? "null");
}