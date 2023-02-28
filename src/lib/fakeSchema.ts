import { JSONSchemaFaker } from "json-schema-faker"

export const fakeSchema = (input: any) => {
    const fakeSchema = JSONSchemaFaker.generate(input);
    return fakeSchema;
}