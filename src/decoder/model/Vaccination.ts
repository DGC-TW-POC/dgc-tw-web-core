import { JsonProperty , Serializable } from "typescript-json-serializer"
@Serializable()
export class Vaccination{

    @JsonProperty({
        name: "tg"
    })
    disease: string;

    @JsonProperty({
        name: "vp"
    })
    vaccine: string;

    @JsonProperty({
        name : "mp"
    })
    medicinalProduct: string;

    @JsonProperty({
        name: "ma"
    })
    manufacturer: string;

    @JsonProperty({
        name: "dn"
    })
    doseNumber: number;

    @JsonProperty({
        name: "sd"
    })
    totalSeriesOfDoses: number;

    @JsonProperty({
        name: "dt"
    })
    dateOfVaccination: string;

    @JsonProperty({
        name: "co"
    })
    countryOfVaccination: string;

    @JsonProperty({
        name: "is"
    })
    certificateIssuer: string;

    @JsonProperty({
        name: "ci"
    })
    certificateIdentifier: string;

}