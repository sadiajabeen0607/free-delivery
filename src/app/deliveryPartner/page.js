import Footer from "../_components/Footer";
import DeliveryPartnerSignUpLogin from '../_components/DeliveryPartnerSignUpLoginPage'
import DeliveryHeader from "../_components/DeliveryHeader";

const deliveryPartner = () => {
  
  return (
    <div className="min-h-screen flex flex-col">
      <DeliveryHeader />
      <div className="flex-grow">
        <DeliveryPartnerSignUpLogin />
      </div>
      <Footer />
    </div>
  )
}

export default deliveryPartner;