import * as cbor from "cbor";
import CborMap from "cbor/types/lib/map";
import { CwtHeaderKeys } from "../cwt/CwtHeaderKeys";
import { GreenCertificate } from "../model/GreenCertificate";
import { VerificationResult } from "../model/VerificationResult";
import * as moment from "moment";
import { deserialize, serialize } from "typescript-json-serializer";

interface ICborService {
    decode(input: Buffer, verificationResult: VerificationResult): GreenCertificate;
}


class GreenCertificateData {
    issuingCountry: string;
    hcertJson: string;
    greenCertificate: GreenCertificate;
    issuedAt: number;
    expirationTime: number;
    constructor(
        issuingCountry: string, 
        hcertJson: string,
        greenCertificate: GreenCertificate,
        issuedAt: number,
        expirationTime: number
    ) {
        this.issuingCountry = issuingCountry;
        this.hcertJson = hcertJson;
        this.greenCertificate = greenCertificate;
        this.issuedAt = issuedAt;
        this.expirationTime = expirationTime;
    }
}


export class CborService implements ICborService {
    decode(input: Buffer, verificationResult: VerificationResult): GreenCertificate {
        return this.decodeData(input , verificationResult).greenCertificate;
    }

    decodeData (input: Buffer, verificationResult: VerificationResult): GreenCertificateData {
        verificationResult.cborDecoded = false;
        try {
            let map: CborMap = cbor.decode(input);

            let issuingCountry: string = map.get(CwtHeaderKeys.ISSUING_COUNTRY);

            let issuedAt = map.get(CwtHeaderKeys.ISSUED_AT)
            verificationResult.isIssuedTimeCorrect = moment(issuedAt).isBefore(Date.now());

            let expirationTime = map.get(CwtHeaderKeys.EXPIRATION);
            verificationResult.isNotExpired = moment(expirationTime).isAfter(Date.now());

            let hcert = map.get(CwtHeaderKeys.HCERT);

            let cborObject = hcert.get(1);
            let hcertv1 = cbor.encode(cborObject);

            let greenCertificate : GreenCertificate = deserialize<GreenCertificate>(cbor.decode(hcertv1) , GreenCertificate);
            verificationResult.cborDecoded = true;
            return new GreenCertificateData(issuingCountry, cborObject,greenCertificate, issuedAt, expirationTime);
        } catch(e) {
            console.error(e);
            return null;
        }
    }
}