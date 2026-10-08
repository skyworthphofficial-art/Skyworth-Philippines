import type { CollectionConfig } from "payload";
import { isAuthenticated, publishedOrAuthenticated } from "../access/isAuthenticated";

export const Products: CollectionConfig = {
  slug: "products",
  admin: { useAsTitle: "name", defaultColumns: ["name", "modelCode", "category", "_status"] },
  versions: { drafts: true },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "modelCode", type: "text", required: true },
    { name: "series", type: "text" },
    { name: "category", type: "relationship", relationTo: "categories", required: true },
    { name: "summary", type: "textarea" },
    { name: "description", type: "richText" },
    { name: "sizesInches", type: "array", fields: [{ name: "size", type: "number", required: true }] },
    { name: "features", type: "array", fields: [{ name: "text", type: "text", required: true }] },
    { name: "specifications", type: "array", fields: [
      { name: "label", type: "text", required: true },
      { name: "value", type: "text", required: true },
    ] },
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    { name: "brochure", type: "upload", relationTo: "media" },
    { name: "seoTitle", type: "text" },
    { name: "seoDescription", type: "textarea" },
  ],
};
