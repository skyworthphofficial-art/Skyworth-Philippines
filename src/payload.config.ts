import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { ProductCollections } from "./collections/ProductCollections";
import { Products } from "./collections/Products";
import { Dealers } from "./collections/Dealers";
import { Promotions } from "./collections/Promotions";
import { News } from "./collections/News";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  
collections: [ Users,Media, Categories, ProductCollections,Products, Dealers,Promotions,News,],

  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      // The current pg driver already treats these legacy modes as verify-full.
      // Normalize explicitly so TLS hostname/certificate verification remains
      // strict and pg-connection-string does not produce a dev error overlay.
      connectionString: (process.env.DATABASE_URL || "").replace(
        /([?&])sslmode=(prefer|require|verify-ca)(?=&|$)/gi,
        "$1sslmode=verify-full",
      ),
    },
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
