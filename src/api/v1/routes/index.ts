import { Hono } from "hono";
import chapter from "./chapter";

const v1_api_route = new Hono();

// auth routes
v1_api_route.route("/chapter", chapter);

export default v1_api_route;
