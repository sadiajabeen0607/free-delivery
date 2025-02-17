"use client";

import { useState } from "react";
import InputField from "./inputField";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const LoginSignUp = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    city: "",
    full_address: "",
    contact: "",
  });
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();
  const seatchParams = useSearchParams();
  const order = seatchParams.get("order");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response;
  
    try {
      if (!login) {
        // Validate password confirmation
        if (data.password !== data.confirm_password) {
          setPasswordError(true);
          setLoading(false);
          return;
        } else {
          setPasswordError(false);
        }
  
        // Check for empty fields
        if (
          !data.username ||
          !data.email ||
          !data.password ||
          !data.confirm_password ||
          !data.city ||
          !data.full_address ||
          !data.contact
        ) {
          setError(true);
          setLoading(false);
          return;
        }
  
        response = await fetch(`${API_BASE_URL}/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, login: true }),
        });
      }
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const res = await response.json();
  
      if (res.success) {
        toast.success(login ? "User Login Successfully" : "User Registered Successfully");
        setLoading(false);
  
        if (res.result) {
          // console.log("res", res.result);
          
          const userData = { ...res.result };
          delete userData.password; // Ensure password is not stored
          
          localStorage.setItem("user", JSON.stringify(userData));
          
        }
        if(order) {
          router.push("/order")
        } else {
          router.push("/");
        }
  
        setData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          city: "",
          full_address: "",
          contact: "",
        });
  
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };
  

  return (
    <div className="relative max-w-[600px] w-full mx-auto mt-8 my-10 p-[2px] rounded-md bg-gradient hover:shadow-lg hover:shadow-orange-500 transition-all duration-300">
      <div className="bg-white rounded-md p-5">
        <h3 className="text-3xl text-center my-4 gradient-text font-semibold">
          {login ? "User Login" : "User Sign Up"}
        </h3>

        <div className="p-5">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* User Name */}
            {!login ? (
              <>
                <InputField
                  type="text"
                  placeholder="Enter Username"
                  label="Username"
                  onChange={handleChange}
                  value={data.username}
                  name="username"
                />
                {error && !data.username && (
                  <span className="text-red-500 text-sm -mt-2 text-start">
                    Please enter valid email
                  </span>
                )}
              </>
            ) : null}
            {/* Email */}
            <InputField
              type="email"
              placeholder="Enter Your email address"
              label="Email"
              onChange={handleChange}
              value={data.email}
              name="email"
            />
            {error && !data.email && (
              <span className="text-red-500 text-sm -mt-2 text-start">
                Please enter valid email
              </span>
            )}
            {/* Password */}
            <InputField
              type="password"
              showPassword
              placeholder="Enter Your Password"
              label="Password"
              onChange={handleChange}
              value={data.password}
              name="password"
            />
            {passwordError && (
              <span className="text-red-500 text-sm -mt-2 text-start">
                Password and Confirm Password are not matched
              </span>
            )}
            {error && !data.password && (
              <span className="text-red-500 text-sm -mt-2 text-start">
                Please provide Password which must contain at least eight
                characters.
              </span>
            )}
            {!login ? (
              <>
                {/* Confirm Password */}
                <InputField
                  type="password"
                  showPassword
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  onChange={handleChange}
                  value={data.confirm_password}
                  name="confirm_password"
                />
                {passwordError && (
                  <span className="text-red-500 text-sm -mt-2 text-start">
                    Password and Confirm Password are not matched
                  </span>
                )}
                {error && !data.password && (
                  <span className="text-red-500 text-sm -mt-2 text-start">
                    Confirm your password
                  </span>
                )}
                {/* City Name */}
                <InputField
                  type="text"
                  placeholder="Enter City Name"
                  label="City"
                  onChange={handleChange}
                  value={data.city}
                  name="city"
                />
                {error && !data.city && (
                  <span className="text-red-500 text-sm -mt-2 text-start">
                    Please enter city name
                  </span>
                )}
                {/* Full Address */}
                <InputField
                  type="text"
                  placeholder="Enter Full Address"
                  label="Full Address"
                  onChange={handleChange}
                  value={data.full_address}
                  name="full_address"
                />
                {error && !data.full_address && (
                  <span className="text-red-500 text-sm -mt-2 text-start">
                    Please enter your full address
                  </span>
                )}
                {/* Contact */}
                <InputField
                  type="tel"
                  placeholder="Enter Contact Number"
                  label="Contact"
                  onChange={handleChange}
                  value={data.contact}
                  name="contact"
                />
                {error && !data.contact && (
                  <span className="text-red-500 text-sm -mt-2 text-start">
                    Please enter your contact number
                  </span>
                )}
              </>
            ) : null}

            <button
              type="submit"
              className="submit-button mt-4"
              disabled={loading}
            >
              {login
                ? loading
                  ? "Loading..."
                  : "Login"
                : loading
                ? "Loading..."
                : "Sign Up"}
            </button>
          </form>

          <p className="text-sm mt-4 block w-fit mx-auto">
            {login ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button" // Prevent accidental form submissions
              onClick={() => setLogin(!login)}
              className="hover:text-orange-600 underline pl-1 text-orange-500"
            >
              {login ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
