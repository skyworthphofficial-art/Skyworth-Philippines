import type { CollectionConfig } from "payload";
import sharp from "sharp";
import { isAuthenticated } from "../access/isAuthenticated";

export const Media: CollectionConfig = {
  slug: "media",

  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },

  hooks: {
    beforeOperation: [
      async ({ operation, req }) => {
        if (operation !== "create" && operation !== "update") {
          return;
        }

        const file = req.file;

        // Process uploaded PNG files only.
        if (!file || file.mimetype !== "image/png") {
          return;
        }

        const metadata = await sharp(file.data).metadata();

        // Leave opaque and animated images unchanged.
        if (!metadata.hasAlpha || (metadata.pages || 1) > 1) {
          return;
        }

        const processed = await sharp(file.data)
          .trim({
            background: { r: 0, g: 0, b: 0, alpha: 0 },
            threshold: 0,
          })
          .png()
          .toBuffer();

        file.data = processed;
        file.size = processed.length;
      },
    ],
  },

  upload: {
    mimeTypes: ["image/*", "application/pdf"],
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};