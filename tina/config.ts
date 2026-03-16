import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",

  clientId: "f20ee16d-b53a-4382-bff0-7fe8adf96472",
  token: "9da37bda035d1a40011b21dd8f4eb28a247fe65a",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
