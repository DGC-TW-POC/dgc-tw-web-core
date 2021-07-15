export class KeyPairData {
    algo: string;
    keyPair: any;
    constructor(algo: string, keyPair) {
        this.algo = algo;
        this.keyPair = keyPair;
    }
}