import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const Media: CollectionConfig = {
  slug: "media",

  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },

  upload: {
    mimeTypes: ["image/*", "application/pdf"],
    trimOptions: {
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      threshold: 0,
    },
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};