import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { CustomMethodResponse } from './custom-method-response';

type OpenApiPathRequestModel = Record<string, string>;

export interface OpenApiPathProps {
  readonly lambda: LambdaFunction;
  readonly requiredParameters: string[];
  readonly requestModels: OpenApiPathRequestModel;
  readonly methodResponses: CustomMethodResponse[];
}

export class OpenApiPath extends Construct {
  public lambda: LambdaFunction;
  public requiredParameters: string[];
  public requestModels: OpenApiPathRequestModel;
  public methodResponses: CustomMethodResponse[];

  constructor(context: Construct, id: string, props: OpenApiPathProps) {
    super(context, id);

    this.lambda = props.lambda;
    this.requiredParameters = props.requiredParameters;
    this.requestModels = props.requestModels;
    this.methodResponses = props.methodResponses;
  }
}
