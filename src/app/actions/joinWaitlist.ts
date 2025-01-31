"use server";
import { WaitlistForm, waitlistFormSchema } from "@/lib/schema";
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || "",
  readKey: process.env.COSMIC_READ_KEY || "",
  writeKey: process.env.COSMIC_WRITE_KEY || "",
});

export const joinWaitlist = async (data: WaitlistForm) => {
  const { data: parsedData, success } = waitlistFormSchema.safeParse(data);

  if (!success) {
    throw new Error("Invalid Data");
  }

  const { name, email } = parsedData;

  try {
    await cosmic.objects.insertOne({
      title: name,
      type: "subscribers",
      metadata: {
        name,
        email,
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
