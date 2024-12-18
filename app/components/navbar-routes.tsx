 "use client"

import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname} from "next/navigation";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isSellerPage = pathname?.startsWith("/seller");
    const isBuyerPage = pathname?.includes("/tractors");
    const isAdminPage = pathname?.startsWith("/admin");
    const isDemoPage = pathname?.startsWith("/demo");
    const isPlayerPage = pathname?.includes("/tractors");

     return (  
         <div className="flex gap-x-2 ml-auto">
             {isSellerPage || isBuyerPage || isAdminPage || isDemoPage || isPlayerPage ? (
                 
                 <Link href="/">
                    < Button size="sm" variant="ghost">
                     <LogOut  className="h-4 w-4 mr-2 "/>
                     Exit
                 </Button>
                 </Link>
                 
             ) : (
                     <><Link href="/seller">
                         <Button size="sm" variant="ghost">
                             Seller Mode
                         </Button>
                     </Link>
                         <Link href="/demo/tractors/">
                             <Button size="sm" variant="ghost">
                                 Demo Mode
                             </Button>
                         </Link></>
             )}
             <UserButton
             afterSignOutUrl ="/"
             />
             
        
             
        </div>
    );
}
 
