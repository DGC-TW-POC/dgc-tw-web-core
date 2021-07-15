import { VerificationResult } from '../decoder/model/VerificationResult';
import { Base45Service } from '../decoder/base45/Base45Service';
import { PrefixValidationService } from '../decoder/prefixvalidation/PrefixValidationService';
import { CompressorService } from '../decoder/compression/CompressorService';
import { CoseService } from '../decoder/cose/CoseService';
import { CborService } from '../decoder/cbor/CborService';
import { GreenCertificate } from '../decoder/model/GreenCertificate';
import * as _ from 'lodash';
import { getValidationDataFromCOSE } from '../decoder/SignatureExt';
import { generateKeyPair, toHash } from '../decoder/Extensions';
import { PublicKeyData } from './model/PublicKeyData';
//https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.Signature.html#sign
import * as rs from 'jsrsasign';
import { generateClaimSignature } from '../decoder/Util';
import { serialize  } from 'typescript-json-serializer';

const prefixValidationService = new PrefixValidationService();
const base45Service = new Base45Service();
const compressorService = new CompressorService();
const coseService = new CoseService();
const cborService = new CborService();

let cose = Buffer.alloc(0);
let greenCertificate : GreenCertificate = null;

function init (qrCodeText : string) {
    let verificationResult = new VerificationResult();
    let plainInput = prefixValidationService.decode(qrCodeText , verificationResult);
    let compressedCose = base45Service.decode(plainInput , verificationResult);
    cose =  Buffer.from(compressorService.decode(compressedCose , verificationResult));
    let coseData = coseService.decode(cose , verificationResult);
    if (coseData == null) {
        console.error("Verification failed: COSE not decoded");
    }
    
    greenCertificate = cborService.decode(coseData.cbor, verificationResult);
    let greenCertificateJson = serialize(greenCertificate);
    console.log(greenCertificateJson);
}

function save (qrCode: string, tan: string) {
    if (greenCertificate == null || _.isEmpty(cose)) {
        return;
    }
    let dgci = greenCertificate.getDgci();
    let certHash = toHash(getValidationDataFromCOSE(cose));
    let tanHash = toHash(Buffer.from(tan));

    let keyPairData = generateKeyPair(cose);
    let keyPair = keyPairData.keyPair
    let sigAlg = keyPairData.algo;

    let spki =  rs.KEYUTIL.getPEM(keyPair.pubKeyObj);
    let PEMItemRetrive = spki.split("\r\n");
    PEMItemRetrive.shift(); //remove -----BEGIN PUBLIC KEY-----
    PEMItemRetrive.pop(); //remove empty string
    PEMItemRetrive.pop();//remove -----END PUBLIC KEY-----
    let publicKeyBase64 = PEMItemRetrive.join("");
    let keyData = new PublicKeyData(keyPair.pubKeyObj.type , publicKeyBase64);
    let signature = generateClaimSignature(tanHash ,certHash, keyData.value, keyPair.prvKeyObj , sigAlg);
    console.log({
        "certhash":certHash,
        "DGCI":dgci,
        "publicKey":{
            "type":keyData.type,"value": keyData.value
        },
        "sigAlg":sigAlg,
        "signature": signature,
        "TANHash": tanHash
    })
}

export const claimRequestInit = init;
export const claimRequestSave = save;