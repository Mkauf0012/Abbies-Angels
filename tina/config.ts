import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",

  clientId: "f59c2a31-2913-4e06-a5f1-36ad54eb6fc4",
  token: "13b83d4477d0ce33a0661d692976e1f1803c01cf",

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
