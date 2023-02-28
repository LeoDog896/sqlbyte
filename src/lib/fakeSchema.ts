import { JSONSchemaFaker } from "json-schema-faker"
import { faker } from "@faker-js/faker"

JSONSchemaFaker.extend("faker", () => faker);

export const fakeSchema = (input: any) => {
    const fakeSchema = JSONSchemaFaker.generate(input);
    return fakeSchema;
}