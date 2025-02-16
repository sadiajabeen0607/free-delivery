import LoginSignUp from "../_components/LoginSignUpPage";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";

const Restaurant = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-center">
        <RestaurantHeader />
        <div className="flex-grow">
          <h1 className="text-3xl font-bold gradient-text my-10">
            Restaurant SignUp/Login Page
          </h1>

          <LoginSignUp />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Restaurant;
