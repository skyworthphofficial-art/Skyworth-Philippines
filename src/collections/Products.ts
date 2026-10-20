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
    { name: "collections",type: "relationship",relationTo: "product-collections",hasMany: true,label: "Product Collections",admin: { description: "Assign this product to one or more collections within its main category.", },},

    { name: "summary", type: "textarea" },
    { name: "description", type: "richText" },
    
{
  name: "sizesInches",
  type: "array",
  label: "Available TV Sizes",
  fields: [
    {
      name: "size",
      type: "number",
      required: true,
      label: "Screen Size (inches)",
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Images for this Size",
    },
  ],
},

    { name: "features", type: "array", fields: [{ name: "text", type: "text", required: true }] },
    { name: "specifications", type: "array", fields: [
      { name: "label", type: "text", required: true },
      { name: "value", type: "text", required: true },
    ] },
    {
  name: "specificationGroups",
  label: "Specification Titles",
  type: "array",
  maxRows: 7,
  labels: {
    singular: "Title",
    plural: "Titles",
  },
  admin: {
    initCollapsed: true,
    description:
      "Up to 7 titles, each with 10 label/value rows. Empty entries stay hidden on the website.",
  },
  defaultValue: () =>
    [
      "Basic Properties",
      "Product Type",
      "General Information",
      "Audio",
      "Display",
      "Connectivity",
      "Dimensions & Weight",
    ].map((title) => ({
      title,
      items: Array.from({ length: 10 }, () => ({
        label: "",
        value: "",
      })),
    })),
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    {
      name: "items",
      label: "Labels and Values",
      type: "array",
      maxRows: 10,
      labels: {
        singular: "Specification",
        plural: "Specifications",
      },
      defaultValue: () =>
        Array.from({ length: 10 }, () => ({
          label: "",
          value: "",
        })),
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              label: "Label",
              type: "text",
              admin: { width: "40%" },
            },
            {
              name: "value",
              label: "Value",
              type: "text",
              admin: { width: "60%" },
            },
          ],
        },
      ],
    },
  ],
},
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    { name: "brochure", type: "upload", relationTo: "media" },
    { name: "seoTitle", type: "text" },
    { name: "seoDescription", type: "textarea" },
  ],
};
