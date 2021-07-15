export class CoseData {
    cbor : Buffer;
    kid: Buffer;
    constructor(cbor: Buffer, kid: Buffer = null) {
        this.cbor = cbor;
        this.kid = kid;
    }
}