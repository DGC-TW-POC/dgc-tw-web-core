import base45 from "../../wbase45";
import { VerificationResult } from "../model/VerificationResult"
const base45decode = (data: string): Buffer => {
    return base45.decode(data);
}

interface IBase45Service {
    decode(input: string, verificationResult: VerificationResult): Buffer
}

export class Base45Service implements IBase45Service {

    public decode(input : string , verificationResult : VerificationResult) {
        verificationResult.base45Decoded = false;
        try {
            return base45decode(input);
        } catch (e) {
            return Buffer.from(input);
        }
    }
}