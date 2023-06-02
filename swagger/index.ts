import * as packageFile from "../package.json";
import Auth from "./auth.swagger";
import Users from "./users.swagger";

const swaggerEndpoints = [Auth, Users];

const swaggerTemplate = {
  openapi: "3.0.3",
  info: {
    description: packageFile.description,
    version: packageFile.version,
    title: "API documentation",
    contact: {
      email: packageFile.email,
      name: packageFile.author,
    },
  },
  tags: swaggerEndpoints.map((p) => p.getTag()),
  paths: generatePaths(),
  components: {
    schemas: generateSchema(),
  },
};

function generatePaths() {
  let endpointPaths = {};
  for (const endpoint of swaggerEndpoints) {
    endpointPaths = { ...endpointPaths, ...endpoint.getPaths() };
  }
  return endpointPaths;
}

function generateSchema() {
  let endpointSchema = {};
  for (const endpoint of swaggerEndpoints) {
    endpointSchema = { ...endpointSchema, ...endpoint.getSchema() };
  }
  return endpointSchema;
}

export default swaggerTemplate;
