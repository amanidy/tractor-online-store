import { auth } from "@clerk/nextjs/server";
import { db } from "../../../../lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "../../../../../actions/get-progress";
import { TractorSidebar } from "./_components/tractor-sidebar";
import { TractorNavbar } from "./_components/tractor-navbar";

const TractorLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tractorId: string }>;
}): Promise<JSX.Element> => {
  const { userId } = await auth();

  console.log("=== TractorLayout ===");
  console.log("userId:", userId);

  if (!userId) {
    console.log("No userId — redirecting to /");
    return redirect("/");
  }

  const { tractorId } = await params;
  console.log("tractorId:", tractorId);

  const tractor = await db.tractor.findUnique({
    where: { id: tractorId },
    include: {
      details: {
        where: { isPublished: true },
        include: { UserProgress: { where: { userId } } },
        orderBy: { position: "asc" },
      }
    }
  });

  console.log("tractor found:", tractor?.id ?? "NULL");
  console.log("details count:", tractor?.details?.length ?? 0);

  if (!tractor) {
    console.log("No tractor — redirecting to /");
    return redirect("/");
  }

  const progressCount = await getProgress({ userId, tractorId: tractor.id });

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <TractorNavbar tractor={tractor} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <TractorSidebar tractor={tractor} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  );
};

export default TractorLayout;