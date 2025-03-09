import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    basePath: `http://localhost:${process.env.PORT}`,
    host: `http://localhost:${process.env.PORT}`,

    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
    // basePath: process.env.BASE_URL,
    servers: [
      {
        name: "Local",
        url: `http://localhost:${process.env.PORT}`,
      },
      {
        name: "Remote",
        url: `${process.env.BASE_URL}`,
      },
    ],
    schemes: ["http"],
  },
  apis: ["./src/routes/**/*.ts", "./src/controllers/**/*.ts"], // Paths to files containing OpenAPI definitions
  
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};