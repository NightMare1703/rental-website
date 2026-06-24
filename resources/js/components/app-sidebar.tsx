import { Link } from '@inertiajs/react';
import { Box, CreditCard, LayoutDashboard, ShoppingCart, Star, User, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
// import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutDashboard,
    },
    {
        title: 'Items',
        href: route('admin.item.index'),
        icon: Box,
    },
    {
        title: 'Rentals',
        href: route('admin.rental.index'),
        icon: ShoppingCart,
    },
    {
        title: 'Payments',
        href: '#',
        icon: CreditCard,
    },
    {
        title: 'Reviews',
        href: '#',
        icon: Star,
    },
    {
        title: 'Customers',
        href: '#',
        icon: Users,
    },
    {
        title: 'Users',
        href: '#',
        icon: User,
    },
];
export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
