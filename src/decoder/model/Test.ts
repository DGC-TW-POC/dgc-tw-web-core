import { JsonProperty, Serializable } from 'typescript-json-serializer';
@Serializable()
export class Test {

    @JsonProperty({ name: "tg" })
    disease: string;

    @JsonProperty({ name: "tt" })
    typeOfTest: string;

    @JsonProperty({ name: "nm" })
    testName: string;

    @JsonProperty({ name: "ma" })
    testNameAndManufacturer: string;

    @JsonProperty({ name: "sc" })
    dateTimeOfCollection: string;

    @JsonProperty({ name: "dr" })
    dateTimeOfTestResult: string;

    @JsonProperty({ name: "tr" })
    testResult: string;

    @JsonProperty({ name: "tc" })
    testingCentre: string;

    @JsonProperty({ name: "co" })
    countryOfVaccination: string;

    @JsonProperty({ name: "is" })
    certificateIssuer: string;

    @JsonProperty({ name: "ci" })
    certificateIdentifier: string

}