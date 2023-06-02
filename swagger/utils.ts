interface Schema {
  request?: any;
  body?: string;
  bodyRequired: boolean;
  response: {
    reference: string;
    description?: string;
    required: boolean;
  };
}

function generatedEndpoint(endpoint: {
  tag: string;
  summary: string;
  description: string;
  operationalId: string;
  schemas: Schema;
}) {
  const result = {
    tags: [endpoint.tag],
    summary: endpoint.summary,
    description: endpoint.description,
    operationalId: endpoint.operationalId,
    parameters: [
      ...(endpoint.schemas.request || []),
      {
        in: "body",
        name: "body",
        schema: {
          $ref: endpoint.schemas.body,
        },
        required: endpoint.schemas.bodyRequired,
      },
    ],
    responses: {
      200: {
        description: endpoint.schemas.response.description,
        content: {
          "application/json": {
            schema: {
              $ref: endpoint.schemas.response.reference,
            },
          },
        },
      },
    },
  };
  return result;
}

export default generatedEndpoint;
