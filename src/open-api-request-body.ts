export interface OpenApiRequestBody {
  readonly content: { [key: string]: { [key: string]: { $ref: string } } };
  readonly required: boolean;
}
