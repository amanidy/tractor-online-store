import { db } from "@/app/lib/db";
import { Attachment, Detail } from "@prisma/client";




interface GetDetailsProps{
    userId: string ;
    tractorId: string;
    detailId: string;
}

export const getDetail = async ({
  userId,
  tractorId,
  detailId,
}: GetDetailsProps) => {
  if (!userId || !tractorId || !detailId) {
    throw new Error("Missing required parameters");
  }

  try {
    const [purchase, tractor, detail] = await Promise.all([
      db.purchase.findUnique({
        where: {
          userId_tractorId: {
            userId,
            tractorId,
          },
        },
      }),
      db.tractor.findUnique({
        where: {
          isApproved: true,
          id: tractorId,
        },
        select: {
          price: true,
        },
      }),
      db.detail.findUnique({
        where: {
          id: detailId,
          isPublished: true,
        },
      }),
    ]);

    if (!detail || !tractor) {
      throw new Error("Tractor or detail not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextDetail: Detail | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          tractorId,
        },
      });
    }

    if (detail.isPublished || purchase) {
      const [muxDataResult, nextDetailResult] = await Promise.all([
        db.muxData.findUnique({
          where: {
            detailId,
          },
        }),
        db.detail.findFirst({
          where: {
            tractorId,
            isPublished: true,
            position: {
              gt: detail?.position,
            },
          },
          orderBy: {
            position: "asc",
          },
        }),
      ]);

      muxData = muxDataResult;
      nextDetail = nextDetailResult;
    }

    const UserProgress = await db.userProgress.findUnique({
      where: {
        userId_detailId: {
          userId,
          detailId,
        },
      },
    });

    return {
      detail,
      tractor,
      muxData,
      attachments,
      nextDetail,
      UserProgress,
      purchase,
    };
  } catch (error) {
    console.error("[GET_DETAILS]", error);
    return {
      detail: null,
      tractor: null,
      muxData: null,
      attachments: [],
      nextDetail: null,
      UserProgress: null,
      purchase: null,
    };
  }
};