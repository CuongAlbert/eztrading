import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "eztrading",

  projectId: "v1tcv7w2",
  dataset: "production",
  basePath: "/admin",
  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
