"use client";

import { useEffect, useState } from "react";
import Carousel from "./_components/Carousel";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import RestaurantListContainer from "./_components/restaurantListContainer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    FetchLocations();
    fetchRestaurants();
  }, []);

  const FetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/customers/locations`
      );

      const res = await response.json();
      // console.log("response", res);

      if (res.success) {
        setLoading(false);
        setLocations(res.result);
      }
    } catch (error) {
      console.log("Fail to fetch Locations", error);
      setLoading(false);
    }
  };

  const fetchRestaurants = async (params) => {
    // console.log("params", params);
    
    try {
      setLoading(true);
      let url = "http://localhost:3000/api/customers";
      if(params?.location) {
        url = `${url}?location=${params.location}`
      } else if(params?.restaurant) {
        url = `${url}?restaurant=${params.restaurant}`
      }
      const response = await fetch(url);

      const res = await response.json();
      if (res.success) {
        setLoading(false);
        setRestaurants(res.result);
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch Restaurants Data", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <div className="flex-grow">
        <Carousel
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          fetchRestaurants={fetchRestaurants}
        />
        <RestaurantListContainer loading={loading} restaurants={restaurants} />
      </div>
      <Footer />
    </div>
  );
}
