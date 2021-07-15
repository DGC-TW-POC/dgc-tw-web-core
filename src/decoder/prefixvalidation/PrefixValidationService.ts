import { VerificationResult } from "../model/VerificationResult";

interface IPrefixValidationService {
    decode(input: string, verificationResult: VerificationResult): string
}

export class PrefixValidationService implements IPrefixValidationService{
    private prefix: string = "HC1:";
    constructor(prefix:string = "HC1:") {
        this.prefix = prefix;
    }
    decode (input : string, verificationResult : VerificationResult) : string {
        if (input.startsWith(this.prefix)) {
            verificationResult.contextPrefix = this.prefix;
            return input.substring(this.prefix.length);
        } else {
            verificationResult.contextPrefix = null;
            return input;
        }
    }
}
