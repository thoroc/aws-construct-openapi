import { JsonSchema } from 'aws-cdk-lib/aws-apigateway';
import { OpenApiMethodProps } from './method';

type InfoTitle = string;
type InfoVersion = string;

export type OpenApiSpecComponentSchema = {
  title: string;
  required?: string[];
  type: string;
  properties: JsonSchema['properties'];
};

export type OpenApiSpecComponentsSecuritySchemes = {
  type: 'apiKey';
  name: 'Authorization';
  in: 'header';
  'x-amazon-apigateway-authtype': 'custom';
};

export type OpenApiSpecComponents = {
  schemas: Record<string, OpenApiSpecComponentSchema>;
  securitySchemes: Record<string, OpenApiSpecComponentsSecuritySchemes>;
};

export type OpenApiSpecPath = Record<string, OpenApiMethodProps>;

export type OpenApiSpec = {
  openapi: string;
  info: Record<InfoTitle, InfoVersion>;
  paths: Record<string, OpenApiSpecPath>;
  components: OpenApiSpecComponents;
};
