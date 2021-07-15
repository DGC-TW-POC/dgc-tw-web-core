export class VerificationResult {
    base45Decoded: Boolean;
    contextPrefix: string;
    zlibDecoded: Boolean;
    coseVerified: Boolean;
    cborDecoded: Boolean;
    isSchemaValid: Boolean;
    isIssuedTimeCorrect: Boolean;
    isNotExpired: Boolean;
    constructor(
        base45Decoded: Boolean = false,
        contextPrefix: string = null,
        zlibDecoded: Boolean = false,
        coseVerified: Boolean = false,
        cborDecoded: Boolean = false,
        isSchemaValid: Boolean = false,
        isIssuedTimeCorrect: Boolean = false,
        isNotExpired: Boolean = false
    ) {
        this.base45Decoded = base45Decoded;
        this.contextPrefix = contextPrefix;
        this.zlibDecoded = zlibDecoded;
        this.coseVerified = coseVerified;
        this.cborDecoded = cborDecoded;
        this.isSchemaValid = isSchemaValid;
        this.isIssuedTimeCorrect = isIssuedTimeCorrect;
        this.isNotExpired = isNotExpired;
    }
    toString() : string {
        return `VerificationResult: 
        "base45Decoded: ${this.base45Decoded}"
        `;
    }

}