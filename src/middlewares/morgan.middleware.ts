import morgan from "morgan";

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};
export const morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { skip }
);
