import { Serializable, JsonProperty } from 'typescript-json-serializer';
@Serializable()
export class Person {
    @JsonProperty({
        name : "fnt"
    }) 
    public standardisedFamilyName: string;

    @JsonProperty({
        name : "fn"
    })
    public familyName: string;

    @JsonProperty({
        name : "gnt"
    })
    public standardisedGivenName: string;

    @JsonProperty({
        name : "gn"
    })
    public givenName: string;

}