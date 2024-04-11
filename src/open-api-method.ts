import { OpenApiRequestBody } from './open-api-request-body';

export interface OpenApiMethodParameterSchemaProps {
  readonly type: string;
}

export interface OpenApiMethodParameterProps {
  readonly name: string;
  readonly in: string;
  readonly required: boolean;
  readonly schema: OpenApiMethodParameterSchemaProps;
}

export interface OpenApiMethodResponseProps {
  readonly description: string;
  readonly headers: Record<string, unknown>;
  readonly content: Record<string, unknown>;
}

export interface OpenApiMethodProps {
  readonly parameters: OpenApiMethodParameterProps[];
  readonly requestBody?: OpenApiRequestBody;
  readonly responses: {
    [key: string]: OpenApiMethodResponseProps;
  };
  readonly security: { [key: string]: any[] }[];
}
