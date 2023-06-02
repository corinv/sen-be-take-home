import generatedEndpoint from "./utils";

class ClassName {
  name: string = "<INSERT_TAG_NAME>";

  static getTag() {
    return {
      name: this.name,
      description: "<INSERT_DESCRIPTION>",
    };
  }

  static getSchema() {
    return {
      functionName: {
        title: "<INSERT_TITLE>",
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
        },
      },
    };
  }

  static getParameters() {
    return {
      parameters: [
        {
          in: "query",
          name: "name",
          schema: { type: "string" },
          required: true,
        },
        {
          in: "query",
          name: "password",
          schema: { type: "string" },
          required: false,
        },
      ],
    };
  }

  static getPaths() {
    return {
      "/endpoint-name": {
        get: generatedEndpoint({
          tag: this.name,
          summary: "returns specified user",
          description:
            "Takes a request with a username and maybe the password and returns the user back",
          operationalId: "getUser",
          schemas: {
            request: this.getParameters().parameters,
            body: "#/components/schemas/getUser",
            bodyRequired: true,
            response: {
              reference: "#/components/schemas/getUser",
              description: "Returned user object",
              required: true,
            },
          },
        }),
      },
    };
  }
}

export default ClassName;
