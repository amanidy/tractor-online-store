import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";


export async function PATCH(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tractorId, detailId } = params;

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
 

    const unpublishedDetail = await db.detail.update({
      where: {
        id: detailId,
        tractorId: tractorId,
      },
      data: {
        isPublished: false,
      },
    });
      
       const publishedDetailsInTractor = await db.detail.findMany({
         where: {
           tractorId: tractorId,
           isPublished: true,
         },
       });

       if (!publishedDetailsInTractor.length) {
         await db.detail.update({
           where: {
             id: tractorId,
           },
           data: {
             isPublished: false,
           },
         });
       }


    return NextResponse.json(unpublishedDetail);
  } catch (error) {
    console.log("[DETAIL_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
