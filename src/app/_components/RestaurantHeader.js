"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // For detecting active route
import { useEffect, useState } from "react";
import Logo from "./Logo";

const RestaurantHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [details, setDetails] = useState(null);
  

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if(!data){
      setDetails(null);
      router.push("/restaurant");
    }else if(data && pathname == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, [])

  const menuItems = details ? [
    { name: "Home", href: "/" },
  ] : [
    { name: "Home", href: "/" },
    { name: "SignUp/Login", href: "/restaurant" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    setDetails(null);
    router.push("/restaurant");
  }

  return (
    <div className="bg-[#150D0B] h-[120px] z-20">
      <div className="md:max-w-[90%] mx-auto p-2 flex items-center justify-between">
      {/* Logo */}
        <Logo />
      {/* Navigation Links */}
      <ul className="flex items-center gap-2.5 md:gap-6">
        {menuItems.map((item) => (
          <li key={item.name} className="group relative">
            <Link
              href={item.href}
              className={`transition-colors duration-300 text-lg font-medium  ${
                pathname === item.href
                  ? "text-orange-500" 
                  : "text-white hover:text-orange-500"
              }`}
            >
              {item.name}
            </Link>

            {/* Animated Underline */}
            <span
              className={`absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full ${
                pathname === item.href ? "w-full" : "w-0"
              }`}></span>
          </li>
        ))}

        {details ? (
          <button className="submit-button " onClick={handleLogout}>Logout</button>
        ) : null}
      </ul>
      </div>
    </div>
  );
};

export default RestaurantHeader;
