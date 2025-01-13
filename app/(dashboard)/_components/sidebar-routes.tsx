"use client"
import { Layout, Compass,ContactRound ,LogIn ,BookOpenText,FileSymlink, Home } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { 
  Clipboard, BarChart, MessageCircle, ShoppingCart
} from 'lucide-react';
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href:"/"
    },
    {
        icon: Compass,
        label: "Listings",
        href:"/buyer/search"
    },
    {
        icon: ContactRound,
        label: "Contact-us",
        href:"/contact"
    },
    {
        icon: LogIn,
        label: "Login",
        href:"/pages/login"
    },
    {
        icon: FileSymlink,
        label: "Register",
        href:"/pages/register"
    },
    {
        icon: BookOpenText,
        label: "About",
        href:"/about"
    },
]

const sellerRoutes = [
    { 
      icon: Home , 
      label: 'Dashboard', 
      href: '/seller' 
    },
    { 
      icon: Clipboard, 
      label: 'Add Tractor Listings', 
      href: '/pages/AddingForm' 
    },
    { 
      icon: BarChart, 
      label: 'Check Performance', 
      href: '/pages/performance' 
    },
    { 
      icon: MessageCircle, 
      label: 'Inquiries', 
      href: '/pages/inquiries' 
      },
    { 
      icon: ShoppingCart, 
      label: 'Sales Data', 
      href: '/pages/sales' 
    }

]

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isSellerPage = pathname?.includes("/seller");

    const routes = isSellerPage ? sellerRoutes : guestRoutes;
    return (
        <div className="w-full flex flex-col">
            {routes.map((route) => (
                
                <SidebarItem
                    key = { route.href }
                    icon={route.icon}
                    label={route.label}
                    href ={route.href}
                    
                
                />
                
                

            ))}

        </div>
    )
}