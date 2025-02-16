import Logo from "./Logo";

const Footer = () => {

  return (
    <footer className="bg-[#150D0B] text-gray-200 py-10">
      <div className="md:max-w-[90%] mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & About */}
          <div>
          <Logo />
            <p className="text-sm pt-3">
              Your one-stop destination for delicious meals, delivered hot and
              fresh to your doorstep. Savor the taste of convenience!
            </p>
          </div>

          {/* Contact Info */}
          <div className="">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>📍 123 Foodie St, Flavor Town, USA</li>
              <li>📞 (555) 123-4567</li>
              <li>✉️ support@foodiehub.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 ">
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-orange-400"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495V14.708H9.689v-3.42h3.131V8.168c0-3.097 1.893-4.789 4.655-4.789 1.325 0 2.463.099 2.795.144v3.24l-1.917.001c-1.505 0-1.796.715-1.796 1.764v2.312h3.59l-.468 3.42h-3.121V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-orange-400"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 2c-.944.562-1.989.971-3.099 1.192A4.92 4.92 0 0 0 16.616.86a4.92 4.92 0 0 0-4.92 4.92c0 .386.044.762.126 1.124C7.69 6.805 4.064 4.863 1.64 1.678a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.213 2.188 4.099A4.904 4.904 0 0 1 .964 8.1v.05c0 2.388 1.699 4.381 3.953 4.828a4.902 4.902 0 0 1-2.212.085 4.926 4.926 0 0 0 4.6 3.417 9.865 9.865 0 0 1-6.104 2.105c-.396 0-.787-.023-1.175-.07A13.896 13.896 0 0 0 7.548 21c9.054 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.637A10.025 10.025 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-orange-400"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.336 3.608 1.311.975.975 1.25 2.241 1.311 3.608.059 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.241 1.25-3.608 1.311-1.265.059-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.25-2.241-1.311-3.608-.059-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.062-1.366.336-2.633 1.311-3.608C4.33 2.498 5.596 2.224 6.962 2.163 8.227 2.105 8.607 2.096 12 2.096m0-2.163C8.668 0 8.258.011 7.072.071 5.859.133 4.717.383 3.742 1.358c-.975.975-1.225 2.117-1.286 3.33C2.011 5.742 2 6.152 2 9.484v5.032c0 3.32.011 3.741.071 4.939.062 1.366.336 2.633 1.311 3.608.975.975 2.241 1.25 3.608 1.311 1.197.059 1.619.069 4.94.069 3.321 0 3.741-.011 4.939-.071 1.366-.062 2.633-.336 3.608-1.311.975-.975 1.25-2.241 1.311-3.608.059-1.198.069-1.619.069-4.939s-.011-3.742-.071-4.939c-.062-1.366-.336-2.633-1.311-3.608-.975-.975-2.241-1.25-3.608-1.311-1.198-.059-1.619-.069-4.939-.069s-3.742.011-4.94.071C5.741 2.243 4.365 2.363 3.742 3.358.698" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 text-center border-t border-gray-700 pt-4 text-sm">
          <p>© 2025 Restaurant Since 1989. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
