import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { CustomMethodResponse } from './custom-method-response';

export interface OpenApiPathProps {
  readonly lambda: LambdaFunction;
  readonly requiredParameters: string[];
  readonly requestModels: { [key: string]: string };
  readonly methodResponses: CustomMethodResponse[];
}
