import { awscdk } from 'projen';
import { NodePackageManager, TrailingComma } from 'projen/lib/javascript';

const dependencies = ['constructs@^10.0.5', 'aws-cdk-lib@^2.1.0'];

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
  packageManager: NodePackageManager.PNPM,
  jsiiVersion: '~5.2.0',
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
  bundledDeps: ['openapi-types', 'ts-json-schema-generator'],
  peerDeps: dependencies,
  devDeps: dependencies,
  sampleCode: false,
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
