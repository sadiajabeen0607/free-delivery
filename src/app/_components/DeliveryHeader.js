"use client";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [deliveryPartner, setDeliveryPartner] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPartner = JSON.parse(localStorage.getItem("deliveryPartner"));
      setDeliveryPartner(storedPartner);
    }
  }, []);

  const menuItems = [
    { name: "Home", href: "/", title: "Home" },

    !deliveryPartner
      ? { name: "SignUp/Login", href: "/user-auth", title: "SignUp/LoginUser" }
      : null,
    // : {
    //     name: `${deliveryPartner.username}`,
    //     href: "/myProfile",
    //     title: `${deliveryPartner.username}`,
    //   }, // Ensure null values are filtered
  ].filter(Boolean);

    // Handle Logout
    const handleLogout = () => {
      localStorage.removeItem("deliveryPartner"); // Remove user data
      setDeliveryPartner(null); // Update state
      router.push("/deliveryPartner");
    };

  return (
    <div className="bg-[#150D0B] z-20">
      <div className="w-full md:max-w-[90%] mx-auto ">
        <div className="flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Logo />
          {/* Navigation Links */}
          <ul className="flex items-center gap-3 md:gap-6">
            {menuItems.map((item) => (
              <li key={item.name} className="group relative flex items-center">
                <Link
                  href={item.href}
                  title={item.title}
                  className={`transition-colors duration-300 text-sm md:text-lg font-medium  ${
                    pathname === item.href
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  {/* Render icon or text */}
                  {item.name}
                </Link>

                {/* Animated Underline */}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full ${
                    pathname === item.href ? "w-full" : "w-0"
                  }`}
                ></span>
              </li>
            ))}

            {deliveryPartner ? (
              <button className="submit-button" onClick={handleLogout}>
                Logout
              </button>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHeader;
