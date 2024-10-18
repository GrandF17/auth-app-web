import { AbiCoder, keccak256 } from "ethers";
import { Hash } from "./interface";

const coder = AbiCoder.defaultAbiCoder();
const SALT = keccak256(coder.encode(
    ["string"],
    ["Hubba Bubba"]
));

export const protectPassword = (password: string) => {
    return keccak256(
        coder.encode(
            ["string", "string"],
            [password, SALT]
        )) as Hash;
}