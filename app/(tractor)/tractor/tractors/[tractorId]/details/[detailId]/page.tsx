
import { Banner } from "@/app/components/banner";
import { redirect } from "next/navigation";
//import { getDetail } from "~/actions/get-details";
import { VideoPlayer } from "./_components/video-player";
import { auth } from "@clerk/nextjs/server";
import { TractorPurchaseButton } from "./_components/tractor-purchase-button";
import { Separator } from "@/app/components/ui/separator";

import { File } from "lucide-react";
import { TractorProgressButton } from "./_components/tractor-progress-button";
import Preview from "@/app/components/preview";
import { getDetail } from "@/actions/get-details";


type GeneratedPageProps = {
  params: {
    tractorId: string;
    detailId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function DetailIdPage(props: GeneratedPageProps) {
  const { params } = props;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  try {
    const {
      detail,
      tractor,
      muxData,
      UserProgress,
      nextDetail,
      attachments,
    } = await getDetail({
      userId,
      detailId: params.detailId,
      tractorId: params.tractorId,
    });

    if (!detail || !tractor) {
      return redirect("/tractor/tractors");
    }

    const completeOnEnd = !UserProgress?.isCompleted;

    return (
      <div className="min-h-screen">
        {UserProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed viewing this detail"
          />
        )}
        {!completeOnEnd && (
          <Banner
            variant="warning"
            label="Finish viewing the detail"
          />
        )}
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div className="p-4">
            <VideoPlayer
              tractorId={params.tractorId}
              title={detail.title}
              detailId={params.detailId}
              nextDetailId={nextDetail?.id}
              playbackId={muxData?.playbackId ?? "defaultPlaybackId"}
              completeOnEnd={completeOnEnd}
            />
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">
                {detail.title}
              </h2>
              <TractorProgressButton
                tractorId={params.tractorId}
                detailId={params.detailId}
                nextDetailId={nextDetail?.id}
                isCompleted={!!UserProgress?.isCompleted}
              />
              <TractorPurchaseButton
                tractorId={params.tractorId}
                price={tractor.price!}
              />
            </div>
            <Separator />
            <div>
              <Preview value={detail.description!} />
            </div>
            {!!attachments.length && (
              <>
                <Separator />
                <div className="p-4">
                  {attachments.map((attachment) => (
                    <a
                      href={attachment.url}
                      target="_blank"
                      key={attachment.id}
                      className="flex items-center w-full bg-sky-200 p-3 border text-sky-700 rounded-md hover:underline"
                    >
                      <File />
                      <p className="line-clamp-1">
                        {attachment.name}
                      </p>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading detail page:", error);
    return redirect("/error");
  }
}

export default DetailIdPage;