import * as cbor from 'cbor';
import * as CryptoJS from 'crypto-js';
import * as rs from 'jsrsasign' ;
import { KeyPairData } from './model/KeyPairData';

export const toHash = function (input) {
    const wordArray = CryptoJS.lib.WordArray.create((input as unknown) as number[]);
    return CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Base64);
}
const ECDSA_256 = -7
const RSA_PSS_256 = -37
export const generateKeyPair = function (input) {
    let messageObject = cbor.decode(input);
    let protectedHeader = cbor.decode(messageObject.value[0]);
    let alg = protectedHeader.get(1);
    if (alg == ECDSA_256) {
        let keyPair = rs.KEYUTIL.generateKeypair("EC" , "P-256");
        return new KeyPairData("SHA256withECDSA" , keyPair);
    } else if (alg == RSA_PSS_256) {
        let keyPair = rs.KEYUTIL.generateKeypair("RSA", 2048);
        return new KeyPairData("SHA256WithRSA" , keyPair);
    }
}