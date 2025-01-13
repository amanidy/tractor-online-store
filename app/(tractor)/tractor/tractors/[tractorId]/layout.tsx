import { auth } from "@clerk/nextjs/server";

import { db } from "../../../../lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "../../../../../actions/get-progress";
import { TractorSidebar } from "./_components/tractor-sidebar";
import { TractorNavbar } from "./_components/tractor-navbar";


const TractorLayout = async ({
  children,
  params,
}:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
): Promise<JSX.Element> => {
  const { userId } = await auth();
  const tractorId = params;
  const node: React.ReactNode = children;


  
  if (!userId) {
    return redirect("/");
  }

  const tractor = await db.tractor.findUnique({
    where: {
      id: tractorId,
    },
    include: {
      details: {
        where: {
          isPublished: true,
        },
        include: {
          UserProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc",
        },
      }
    }
  });

  if (!tractor) {
    return redirect("/");
  }

  
  const progressCount = await getProgress({ userId, tractorId: tractor.id });

      
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 inset-y-0 w-full z-50">
        <TractorNavbar
          tractor={tractor}
          progressCount={progressCount}
        />
      </div>
      <div className="hidden md:flex h-full w-full fixed inset-y-0 flex-col z-50">
        <TractorSidebar
          tractor={tractor}
          progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {node}
      </main>
    </div>
  );
};

export default TractorLayout;