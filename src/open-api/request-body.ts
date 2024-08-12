export type OpenApiRequestBody = {
  content: Record<string, Record<string, { $ref: string }>>;
  required: boolean;
};
