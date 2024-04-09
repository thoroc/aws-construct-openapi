import { awscdk } from 'projen';
import { TrailingComma } from 'projen/lib/javascript';

const dependencies = [
  'constructs',
  'openapi-types',
  'ts-json-schema-generator',
  'aws-cdk-lib',
];

const project = new awscdk.AwsCdkConstructLibrary({
  name: 'aws-construct-openapi',
  author: 'thoroc',
  authorAddress: 'thomas.a.roche@gmail.com',
  authorName: 'Thomas Roche',
  defaultReleaseBranch: 'main',
  keywords: ['aws', 'cdk', 'openapi', 'api', 'gateway', 'rest'],
  repositoryUrl: 'https://github.com/thoroc/aws-construct-openapi.git',
  description: 'AWS CDK Construct for OpenAPI',

  projenrcTs: true,
  jsiiVersion: '~5.0.0',
  cdkVersion: '2.1.0',
  jest: true,
  jestOptions: {
    configFilePath: 'jest.config.json',
  },
  eslint: true,
  eslintOptions: { dirs: ['src', 'test'], prettier: true },
  prettier: true,
  prettierOptions: {
    settings: { singleQuote: true, trailingComma: TrailingComma.ALL },
  },
  deps: dependencies,
  peerDeps: dependencies,
  devDeps: ['aws-cdk-lib'],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
