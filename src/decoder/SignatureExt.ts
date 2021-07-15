import * as cbor from 'cbor';

export const getValidationDataFromCOSE = function (input) {
    let messageObject = cbor.decode(input);
    let protectedHeader = messageObject.value[0];
    let content: Buffer = messageObject.value[2];
    let sigData = [
        'Signature1',
        protectedHeader,
        Buffer.alloc(0),
        content
    ];
    return cbor.encode(sigData);
}