
import { db } from "../app/lib/db";

type GetProgressParams = {
  userId: string;
  tractorId: string;
};

export const getProgress = async ({
  userId,
  tractorId,
}: GetProgressParams): Promise<number> => {
  try {
    const publishedDetails = await db.detail.findMany({
      where: {
        tractorId: tractorId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedDetailIds = publishedDetails.map((detail) => detail.id);

    if (publishedDetailIds.length === 0) {
      return 0;
    }

    const validCompletedDetails = await db.userProgress.count({
      where: {
        userId: userId,
        detailId: {
          in: publishedDetailIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedDetails / publishedDetailIds.length) * 100;
    return progressPercentage;
  } catch (error) {
    console.log("GET_PROGRESS", error);
    return 0;
  }
};
