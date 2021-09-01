import SwaggerParser from "@apidevtools/swagger-parser";
import Ajv from "ajv";

export async function loadApiSchemas() {
  return SwaggerParser.dereference("http://localhost/v2/swagger.json");
}

export function validate(schema: any, body: any) {
  const ajv = new Ajv({
    strict: false,
    allErrors: true,
    verbose: true,
    formats: {
      double: "[+-]?\\d*\\.?\\d+",
      int32:
        /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
      int64: /^\d+$/,
    },
  });
  const validator = ajv.compile(schema);
  const valid = validator(body);
  if (!valid) {
    throw new Error(
      `Error validation error ${JSON.stringify(
        {
          validationErrors: validator.errors,
        },
        null,
        2
      )}`
    );
  }
}
