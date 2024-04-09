import { readdirSync } from 'fs';
import { join as pathJoin } from 'path';
import {
  JsonSchema,
  JsonSchemaVersion,
  ModelOptions,
} from 'aws-cdk-lib/aws-apigateway';
import { createGenerator } from 'ts-json-schema-generator';

/**
 * Generates a model options object for a given interface name and schema properties.
 *
 * @param interfaceName - The name of the interface.
 * @param schemaProps - The JSON schema properties.
 * @returns The model options object.
 */
export const interfaceTemplate = (
  interfaceName: string,
  schemaProps: JsonSchema,
): ModelOptions => ({
  contentType: 'application/json',
  modelName: `${interfaceName}Model`,
  schema: {
    ...schemaProps,
    schema: JsonSchemaVersion.DRAFT7,
    title: `${interfaceName}Model`,
  },
});

/**
 * Retrieves the configuration object for the given tsconfig and path.
 *
 * @param tsconfig - The path to the tsconfig file.
 * @param path - The path to the file.
 * @returns The configuration object.
 */
export const getConfig = (tsconfig: string, path: string) => ({
  path,
  tsconfig,
  type: '*',
});

/**
 * Checks if the given object has a reference property.
 * @param obj - The object to check.
 * @returns A boolean indicating whether the object has a reference property.
 */
export const hasRef = (
  obj: unknown,
): obj is { ref?: string; $ref?: string } => {
  return (
    !!obj &&
    typeof obj === 'object' &&
    ('ref' in (obj as Record<string, unknown>) ||
      '$ref' in (obj as Record<string, unknown>))
  );
};

/**
 * Checks if an object has additional properties.
 *
 * @param obj - The object to check.
 * @returns A boolean indicating whether the object has additional properties.
 */
export const hasAdditionalProperties = (
  obj: unknown,
): obj is { additionalProperties?: unknown } => {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'additionalProperties' in (obj as Record<string, unknown>)
  );
};

/**
 * Updates the API references in the given object by replacing the $ref property with a ref property
 * that contains the updated URL.
 * Additionally, removes the additionalProperties property from the object.
 * Recursively updates the references in nested objects.
 *
 * @param obj - The object to update the API references in.
 * @param restApi - The ID of the REST API.
 */
export const updateApiRefs = (
  obj: unknown | Record<string, unknown>,
  restApi: string,
): void => {
  if (typeof obj !== 'object' || obj === null) return;
  if (hasRef(obj) && obj.$ref) {
    const refSplit = obj.$ref.split('/');
    obj.ref = `https://apigateway.amazonaws.com/restapis/${restApi}/models/${
      refSplit[refSplit.length - 1]
    }Model`;
    delete obj.$ref;
  }
  if (hasAdditionalProperties(obj)) {
    // TODO: additional properties tend to cause problems with openapi specs... remove for now
    delete obj.additionalProperties;
  }
  Object.keys(obj).forEach((key) => {
    updateApiRefs((obj as Record<string, unknown>)[key], restApi);
  });
};

/**
 * Converts the API object to a specification object.
 * @param obj - The API object to convert.
 */
export const apiToSpec = (obj: unknown | Record<string, unknown>): void => {
  if (typeof obj !== 'object' || obj === null) return;
  if (hasRef(obj) && obj.ref) {
    const refSplit = obj.ref.split('/');
    obj.$ref = `#/components/schemas/${refSplit[refSplit.length - 1]}`;
    delete obj.ref;
  }
  Object.keys(obj).forEach((key) => {
    apiToSpec((obj as Record<string, unknown>)[key]);
  });
};

/**
 * Retrieves the schemas for the specified REST API.
 *
 * @param tsconfigPath - The path to the tsconfig.json file.
 * @param modelPath - The path to the directory containing the model files.
 * @param restApi - The name of the REST API.
 * @returns An object containing the schemas for the REST API.
 */
export const getSchemas = (
  tsconfigPath: string,
  modelPath: string,
  restApi: string,
): { [key: string]: ModelOptions } => {
  // get all the interface file paths
  const filePaths: string[] = readdirSync(modelPath).map((file) =>
    pathJoin(modelPath, file),
  );

  const interfaces = filePaths
    .map((filePath) => getConfig(tsconfigPath, filePath))
    .map((config) => createGenerator(config).createSchema(config.type))
    .reduce(
      (p, schema): { [key: string]: ModelOptions } => {
        const processedSchemas: { [key: string]: ModelOptions } = Object.keys(
          schema.definitions as { definitions: Record<string, unknown> },
        ).reduce(
          (processed, def) => {
            const schemaDefinition = (
              schema as { definitions: Record<string, JsonSchema> }
            ).definitions[def];
            return {
              ...processed,
              [def]: interfaceTemplate(def, schemaDefinition as JsonSchema),
            };
          },
          {} as { [key: string]: ModelOptions },
        );
        return {
          ...p,
          ...processedSchemas,
        };
      },
      {} as { [key: string]: ModelOptions },
    );
  updateApiRefs(interfaces, restApi);

  return interfaces;
};
