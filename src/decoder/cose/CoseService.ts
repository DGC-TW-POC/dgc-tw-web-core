import { CoseData } from "../model/CoseData";
import { VerificationResult } from "../model/VerificationResult";
import * as cbor from 'cbor';
import CborMap from "cbor/types/lib/map";
import * as _ from 'lodash';

interface ICoseService {
    decode(input: Buffer, verificationResult: VerificationResult): CoseData;
}

export class CoseService implements ICoseService{
    decode(input: Buffer, verificationResult: VerificationResult): CoseData {
        try {
            let messageObject = cbor.decode(input);
            let content: Buffer = messageObject.value[2];
            let protectedHeader = messageObject.value[0];
            let unprotectedHeader = messageObject.value[1];
            let kid = this.getKid(protectedHeader , unprotectedHeader);
            //let kidByteString = kid.toString("base64");
            let coseData = new CoseData(content , kid);
            return coseData;
        } catch(e) {
            console.error(e);
            return null;
        }
    }
    private getKid(protectedHeader, unprotectedHeader): Buffer{
        if (cbor.decode(protectedHeader)) {
            try {
                let decodedKid = cbor.decode(protectedHeader).get(4);
                return decodedKid;
            } catch (e) {
                console.error(e);
                if (_.isEmpty(unprotectedHeader)) return null;
                return unprotectedHeader.get(4);
            }
        } else {
            if (_.isEmpty(unprotectedHeader)) return null;
            return unprotectedHeader.get(4);
        }
    }
}