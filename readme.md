# dgc-tw-web-core
效仿[dgca-app-core-android](https://github.com/eu-digital-green-certificates/dgca-app-core-android)
做出對qrcode解碼的js。

## 功能
1. prefix decode (remove `HC1:`)
2. base45 decode
3. zlib decompress
4. cose decode
5. cbor decode

## example
### get greenCertificate data
```typescript
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
```