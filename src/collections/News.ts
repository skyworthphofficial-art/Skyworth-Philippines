import type { CollectionConfig } from "payload";
import { isAuthenticated, publishedOrAuthenticated } from "../access/isAuthenticated";

export const News: CollectionConfig = {
  slug: "news",
  admin: { useAsTitle: "title" },
  versions: { drafts: true },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "excerpt", type: "textarea" },
    { name: "body", type: "richText", required: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
  ],
};
