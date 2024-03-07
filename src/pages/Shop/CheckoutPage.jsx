import React, { useState } from "react";
import "../../components/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";
import { auth } from "../../contexts/AuthProvider";

const CheckoutPage = ({ cartItems, address, city, pincode, orderTotal }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleOrderConfirm = async () => {
    try {
      const orderData = {
        userID: auth.currentUser.uid,
        cartItems,
        address,
        city,
        pincode,
        orderTotal,
        date: new Date().toISOString(),
      }; 
      await addDoc(collection(firestore, "orders"), orderData);
      cartItems.forEach(async (item) => {
        await deleteDoc(doc(firestore, "cart", item._id));
      });
      toast.success("Your order placed successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayNowClick = () => {
      handleOrderConfirm();
    
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      console.log("Script Element created ", script);
      script.src = src;
      script.onload = () => {
        resolve(true);
        console.log("Resolve True ", resolve);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
      console.log("Script append to body", script);
    });
  };
  // Function to save the booking data to Firestore
  const saveBookingData = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log("Razor pay", res);
    if (!res) {
      alert("Payment Failed...");
      return;
    }
    const options = {
      key: "rzp_test_Rw6OPD6Xd4oKht",
      currency: "USD",
      amount: amount * 100,
      description: "Thank you for Purchasing, Now you are The One",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment is Successful");
        addData();
      },
      prefill: { name: "Hemangi" },
      // if(response.razorpay_payment_id)
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    const addData = async () => {
      console.log("Customer Data");
      console.log("Purchase Data");
      try {
        handlePayNowClick();
        alert("Purchase Ordered successfully!");

        // Clear the booking form data if needed (You can set them to empty strings)
      } catch (error) {
        alert("Enter Valid Details");
        console.error("Error adding document: ", error);
      }
    };
  };

  return (
    <div className="modalCard">
      <Button variant="primary" onClick={()=>saveBookingData(orderTotal)} className="py-2">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CheckoutPage;
