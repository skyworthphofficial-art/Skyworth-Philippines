import type { CollectionConfig } from "payload";
import { isAuthenticated, publishedOrAuthenticated } from "../access/isAuthenticated";

export const Dealers: CollectionConfig = {
  slug: "dealers",
  admin: { useAsTitle: "name" },
  versions: { drafts: true },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "address", type: "textarea", required: true },
    { name: "city", type: "text", required: true },
    { name: "province", type: "text" },
    { name: "phone", type: "text" },
    { name: "website", type: "text" },
  ],
};
