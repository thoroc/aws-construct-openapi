export interface CustomMethodResponse {
  readonly statusCode: string;
  readonly responseParameters: {
    [key: string]: boolean;
  };
  readonly responseModels: {
    [key: string]: string;
  };
}
