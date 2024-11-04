import { Hono } from "hono";

const chapter = new Hono();

// auth routes
chapter.get("/", (c) => {
  return c.text("The Hono Server is running...!");
});

export default chapter;
