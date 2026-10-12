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
  },
  fields: [
    { name: "alt", type: "text", required: true },
  ],
};
