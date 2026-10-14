
import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const ProductCollections: CollectionConfig = {
  slug: "product-collections",

  admin: {
    useAsTitle: "name",
    group: "Products",
    defaultColumns: [
      "name",
      "slug",
      "category",
      "sortOrder",
    ],
  },

  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },

  fields: [
    {
      name: "name",
      type: "text",
      label: "Collection Name",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Collection Slug",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "Use lowercase letters and hyphens, e.g. mini-led.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      label: "Main Product Category",
    },
    {
      name: "description",
      type: "textarea",
      label: "Collection Description",
    },
    {
      name: "sortOrder",
      type: "number",
      label: "Display Order",
      defaultValue: 0,
    },
  ],
};
