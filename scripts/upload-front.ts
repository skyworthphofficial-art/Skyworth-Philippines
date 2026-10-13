
import { getPayload } from "payload";
import config from "@payload-config";
import { existsSync } from "node:fs";
import { basename } from "node:path";

async function main() {
  const filePath = process.env.FRONT_IMAGE_PATH;

  if (!filePath || !existsSync(filePath)) {
    throw new Error("Front.png not found.");
  }

  const payload = await getPayload({ config });
  const filename = basename(filePath);

  const existing = await payload.find({
    collection: "media",
    where: {
      filename: { equals: filename },
    },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log("ALREADY SAVED:", existing.docs[0].id);
    return;
  }

  const image = await payload.create({
    collection: "media",
    overrideAccess: true,
    data: {
      alt: "SKYWORTH 75X79K QD-Mini LED TV Front View",
    },
    filePath,
  });

  console.log("UPLOAD SUCCESS");
  console.log("ID:", image.id);
  console.log("FILENAME:", image.filename);
  console.log("URL:", image.url);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("UPLOAD FAILED:", error);
    process.exit(1);
  });
