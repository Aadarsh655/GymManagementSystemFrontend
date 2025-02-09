import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronFirst, LogOut, LayoutDashboard, Users, UserCheck, Cog, CreditCard, FileText, MessageSquare, Calendar, Package, Settings } from 'lucide-react';
import Logo from "../components/UI/Logo";
import { cn } from "@/lib/utils";
import { FaDumbbell } from "react-icons/fa6";

const menuItems = [
    { icon: <LayoutDashboard size={22} />, text: "Dashboard", to: "/dashboard" },
    { icon: <UserCheck size={22} />, text: "Roles List", to: "/roles" },
    { icon: <Users size={22} />, text: "User List", to: "/users" },
    { icon: <Cog size={22} />, text: "Service", to: "/service" },
    { icon: <CreditCard size={22} />, text: "Payments", to: "/payments" },
    { icon: <FileText size={22} />, text: "Blogs", to: "/blog" },
    { icon: <MessageSquare size={22} />, text: "Enquiries", to: "/enquiries" },
    { icon: <Calendar size={22} />, text: "Attendance", to: "/attendance" },
    { icon: <Package size={22} />, text: "Inventory", to: "/inventory" },
    { icon: <Settings size={22} />, text: "Settings", to: "/settings" },
];

export default function Sidebar({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login')
    }
    return (
        <div className="flex min-h-screen">
            <aside
                className={cn(
                    `fixed left-0 top-0 h-screen z-[100] bg-white shadow-sm transition-all duration-300`,
                    isCollapsed ? "w-20" : "w-60 md:w-72 lg:w-60"
                )}
            >
                <nav className="h-full flex flex-col bg-white">
                    {/* Logo and Collapse Button */}
                    <div className="p-4 pb-5 flex justify-between items-center border-b gap-5">
                        {!isCollapsed && (
                            <Logo
                                iconClassName="text-xl text-primary"
                                textClassName="text-xl"
                            />
                        )}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            aria-label="Toggle Sidebar"
                            className="rounded-lg bg-gray-50 border shadow-sm hover:bg-gray-100 flex justify-center items-center w-10 h-10"
                        >
                            {
                                isCollapsed ? <FaDumbbell className="text-primary size-5"/> :
                                    <ChevronFirst
                                        className={`transition-transform duration-300`}
                                    />
                            }
                        </button>
                    </div>

                    {/* Sidebar Items */}
                    <ul className="flex-1 text-xl px-3 py-4 space-y-3">
                        {menuItems.map((item, index) => (
                            <SidebarItem
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                to={item.to}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </ul>

                    {/* Logout Button */}
                    <div className="border-t p-5 flex">
                        <button
                            onClick={handleLogout}
                            aria-label="Logout"
                            className="flex items-center gap-3 hover:text-primary text-gray-800"
                        >
                            <LogOut size={22} />
                            {!isCollapsed && <span className="text-xl">Logout</span>}
                        </button>
                    </div>

                </nav>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${isCollapsed ? "ml-20" : "ml-60 md:ml-72 lg:ml-60"} transition-all duration-300 bg-[#F9FAFB] min-h-screen`}>
                {children}
            </main>
        </div>
    );
}

function SidebarItem({ icon, text, isCollapsed, to }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className="relative group">
            <Link
                to={to}
                className={cn(
                    `flex items-center p-2 rounded-lg `,
                    isActive
                        ? "bg-primary text-white"
                        : "text-gray-800 hover:bg-secondary hover:text-primary",
                    isCollapsed && 'flex justify-center'
                )}
                aria-label={text}
            >
                {icon}
                {!isCollapsed && <span className="whitespace-nowrap ml-3">{text}</span>}
            </Link>

            {isCollapsed && (
                <span
                    className="absolute ml-2 left-14 top-1/2 transform -translate-y-1/2 whitespace-nowrap bg-primary text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {text}
                </span>
            )}
        </li>
    );
}

