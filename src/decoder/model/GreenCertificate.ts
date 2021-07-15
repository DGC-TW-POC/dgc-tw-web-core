import {JsonProperty, Serializable} from "typescript-json-serializer"
import { Person } from "./Person";
import { Vaccination } from "./Vaccination";
import { Test } from "./Test";
import { RecoveryStatement } from "./RecoveryStatement";
import _ from "lodash";
@Serializable()
export class GreenCertificate{

    @JsonProperty({name : "ver"})
    schemaVersion: String;

    @JsonProperty({name : "nam"})
    person: Person;

    @JsonProperty({name : "dob"})
    dateOfBirth: String;

    @JsonProperty({name : "v", type: Vaccination})
    vaccinations: Array<Vaccination>;

    @JsonProperty({name : "t"})
    tests: Array<Test>;

    @JsonProperty({name : "r"})
    recoveryStatements: Array<RecoveryStatement>;

    public getDgci(): string {
        try {
            console.log(this.vaccinations);
            if (!_.isEmpty(this.vaccinations)) {
                return this.vaccinations[this.vaccinations.length-1].certificateIdentifier;
            }
            return "";
        } catch (e) {
            return "";
        }
    }
}