import { awscdk } from 'projen';

const dependencies = ['constructs', 'openapi-types', 'aws-cdk-lib'];

const project = new awscdk.AwsCdkConstructLibrary({
  name: 'aws-construct-openapi',
  author: 'thoroc',
  authorAddress: 'thomas.a.roche@gmail.com',
  authorName: 'Thomas Roche',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/thoroc/aws-construct-openapi.git',

  deps: dependencies,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
