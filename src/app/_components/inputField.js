"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const InputField = ({ type, placeholder, label, onChange, value, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative">
        <label
          htmlFor={name}
          className="block mb-0 text-sm font-medium text-orange-500 dark:text-white text-start"
        >
          {label}
        </label>

        {type !== "password" ? (
          <input
          id={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            className="border border-orange-200 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-orange-600 focus:shadow-md focus:shadow-orange-200 outline-none"
          />
        ) : (
          <div className="relative w-full">
            <input
            id={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              name={name}
              className="border border-orange-200 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 pr-10 focus:border-orange-600 focus:shadow-md focus:shadow-orange-200"
            />
            <div
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
            >
              {showPassword ? (
                <FaEye title="Hide password" />
              ) : (
                <FaEyeSlash title="Show password" />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputField;
