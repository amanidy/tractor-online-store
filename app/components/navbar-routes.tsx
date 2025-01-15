 "use client"

import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname} from "next/navigation";
import { SearchInput } from "./search-input";
import { useAuth } from "@clerk/clerk-react";
import { isSeller } from "@/app/lib/seller";


export const NavbarRoutes = () => {
    const pathname = usePathname();

    const { userId } = useAuth();

    const isSellerPage = pathname?.startsWith("/seller");
    const isBuyerPage = pathname?.includes("/tractors");
    const isAdminPage = pathname?.startsWith("/admin");
    const isDemoPage = pathname?.startsWith("/demo");
    const isTractorPage = pathname?.includes("/tractor");

    const isSearchPage = pathname === "/seller/tractor";

    return ( 
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
         <div className="flex gap-x-2 ml-auto">
             {isSellerPage || isBuyerPage || isAdminPage || isDemoPage || isTractorPage ? (
                 
                 <Link href="/">
                    < Button size="sm" variant="ghost">
                     <LogOut  className="h-4 w-4 mr-2 "/>
                     Exit
                 </Button>
                 </Link>
                 
             ) : isSeller(userId) ?  (
                        <><Link href="/seller">
                            
                         <Button size="sm" variant="ghost">
                             Seller Mode
                         </Button>
                     </Link>
                         </>
             ): null}
             <UserButton
             afterSignOutUrl ="/"
             />
            </div>
            </> 
    );
}
 
