import zlib from 'browserify-zlib';
import { VerificationResult } from '../model/VerificationResult';

interface ICompressorService {
    decode(input: Buffer, verificationResult: VerificationResult): Buffer;
}

export class CompressorService implements ICompressorService {
    constructor() { }
    decode(input: Buffer, verificationResult: VerificationResult): Buffer {
        verificationResult.zlibDecoded = false;
        try {
            let decompressedData = zlib.inflateSync(input);
            verificationResult.zlibDecoded = true;
            return decompressedData;
        } catch (e){
            console.error(e);
            throw e;
        }
    }
}