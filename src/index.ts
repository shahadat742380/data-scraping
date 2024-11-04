import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

// import routes
import v1_api_route from "./api/v1/routes";

const app = new Hono();

app.get("/", (c) => {
  return c.text("The Hono Server is running...!");
});

app.route("/api/v1", v1_api_route);

export const handler = handle(app);
