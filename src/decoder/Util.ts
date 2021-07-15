import { KJUR } from 'jsrsasign'
export const generateClaimSignature = function (
    tanHash: string,
    certHash: string,
    publicKey: string,
    privateKey: any,
    sigAlg: string
) {
    let sigValue = tanHash + certHash + publicKey;
    let signature = new KJUR.crypto.Signature({
        alg: sigAlg
    });
    signature.init(privateKey);
    signature.updateString(sigValue);
    let sigData = signature.sign();
    return Buffer.from(sigData,  'hex').toString('base64');
}