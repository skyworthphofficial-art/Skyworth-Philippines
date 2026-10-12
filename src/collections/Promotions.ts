import type { CollectionConfig } from "payload";
import { isAuthenticated, publishedOrAuthenticated } from "../access/isAuthenticated";

export const Promotions: CollectionConfig = {
  slug: "promotions",
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
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" },
    { name: "description", type: "richText" },
    { name: "banner", type: "upload", relationTo: "media" },
  ],
};
