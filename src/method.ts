import { OpenApiRequestBody } from './request-body';

export interface OpenApiMethod {
  readonly parameters: {
    name: string;
    in: string;
    required: boolean;
    schema: { type: string };
  }[];
  readonly requestBody?: OpenApiRequestBody;
  readonly responses: {
    [key: string]: {
      description: string;
      headers: Record<string, unknown>;
      content: Record<string, unknown>;
    };
  };
  readonly security: { [key: string]: [] }[];
}
