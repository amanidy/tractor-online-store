import { Detail, Tractor, UserProgress } from "@prisma/client";
import { NavbarRoutes } from "../../../../../components/navbar-routes";
import { TractorMobileSidebar } from "./tractor-mobile-sidebar";

interface TractorNavbarProps {
  tractor: Tractor & {
    details: (Detail & {
      UserProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const TractorNavbar = ({
  tractor,
  progressCount,
}: TractorNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <TractorMobileSidebar
        tractor={tractor}
        progressCount={progressCount}
      />
      <NavbarRoutes />
    </div>
  );
};