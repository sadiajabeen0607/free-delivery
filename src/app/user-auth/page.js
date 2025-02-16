"use client";
import { Suspense } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUpLoginPage from "../_components/UserSignUpLoginPage";

const UserAuth = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <div className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <UserSignUpLoginPage />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default UserAuth;
