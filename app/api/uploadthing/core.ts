import { isSeller } from "@/app/lib/seller";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  const isAuthorized = isSeller(userId);

    if (!userId || !isAuthorized) throw new Error("Unauthorized");
    return { userId };
}


export const ourFileRouter = {
  tractorImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  tractorAttachment: f(["text", "image", "pdf", "audio", "video"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  demoVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
