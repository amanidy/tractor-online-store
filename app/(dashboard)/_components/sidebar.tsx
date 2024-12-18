import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
const SideBar = () => {
    return (
        <div className="h-full flex flex-col border-r bg-white shadow-sm overflow-y-auto">
            <div className="p-6">
                <Logo />

            </div>

            <div className="w-full flex flex-col">
                <SidebarRoutes />

            </div>
        </div>
      );
}
 
export default SideBar;