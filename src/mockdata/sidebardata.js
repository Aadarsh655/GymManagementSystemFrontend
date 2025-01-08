import { LayoutDashboard, MdPayments, Settings, GrServices, FaUsers,  FaBlog, MdInventory  } from "react-icons/fa";
export const NavbarMenu =[
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Roles List",
      href: "/roles",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "User List",
      href: "/Users",
      icon: <FaUsers className="h-5 w-5" />,
    },
    {
      title: "Service Management",
      href: "/serviceManagement",
      icon: <GrServices className="h-5 w-5" />,
    },
    {
      title: "Payments",
      href: "/payments",
      icon: <MdPayments className="h-5 w-5" />,
    },
    {
      title: "Blogs",
      href: "/blogs",
      icon: < FaBlog  className="h-5 w-5" />,
      isActive: true,
    },
    {
      title: "Enquiries",
      href: "/enquiry",
      icon: <Settings className="h-5 w-5" />,
      isCollapsible: true,
    },
    {
        title: "Attendance",
        href: "/attendance",
        icon: <Settings className="h-5 w-5" />,
        isCollapsible: true,
      },
      {
        title: "Inventory",
        href: "/inventory",
        icon: <MdInventory className="h-5 w-5" />,
        isCollapsible: true,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: <Settings className="h-5 w-5" />,
        isCollapsible: true,
      },
]