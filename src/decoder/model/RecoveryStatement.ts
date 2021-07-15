import { JsonProperty, Serializable } from "typescript-json-serializer";
@Serializable()
export class RecoveryStatement{

    @JsonProperty({name: "tg"})
    disease: string;

    @JsonProperty({name: "fr"})
    dateOfFirstPositiveTest: string;

    @JsonProperty({name: "co"})
    countryOfVaccination: string;

    @JsonProperty({name: "is"})
    certificateIssuer: string;

    @JsonProperty({name: "df"})
    certificateValidFrom: string;

    @JsonProperty({name: "du"})
    certificateValidUntil: string;

    @JsonProperty({name: "ci"})
    certificateIdentifier: string;

}