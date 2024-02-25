import React, { useState } from "react";
import "../../components/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("visa"); // Initial active tab
  const [isFormValid, setIsFormValid] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // order confirmation and redirect to home page
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleOrderConfirm = () => {
      alert("Your order placed successfully!")
      localStorage.removeItem("cart");
      navigate(from, { replace: true });
  }

  const validateCardholderName = (value) => {
    return /^[a-zA-Z\s]*$/.test(value);
  };

  // Function to validate card number (should accept 16 digits)
  const validateCardNumber = (value) => {
    return /^\d{16}$/.test(value);
  };

  // Function to validate expiry date (should accept date in mm/yy format)
  const validateExpiryDate = (value) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
  };

  // Function to validate CVV (should accept 3 digits)
  const validateCVV = (value) => {
    return /^\d{3}$/.test(value);
  };

  const handleInputChange = () => {
    // Check if all required fields are filled
    const isRequiredFieldsFilled = Array.from(document.querySelectorAll('.modalCard input[required]')).every(input => input.value.trim() !== '');

    const cardholderNameInput = document.querySelector('#cardholderName');
    const cardNumberInput = document.querySelector('#cardNumber');
    const expiryDateInput = document.querySelector('#expiryDate');
    const cvvInput = document.querySelector('#cvv');

    const isCardholderNameValid = validateCardholderName(cardholderNameInput.value);
    const isCardNumberValid = validateCardNumber(cardNumberInput.value);
    const isExpiryDateValid = validateExpiryDate(expiryDateInput.value);
    const isCVVValid = validateCVV(cvvInput.value);

    const isFormValid = isRequiredFieldsFilled && isCardholderNameValid && isCardNumberValid && isExpiryDateValid && isCVVValid;
    setIsFormValid(isFormValid);
  };

  // Event handler for input changes
  const handleInputBlur = () => {
    handleInputChange();
  };

  // Event handler for Pay Now button click
  const handlePayNowClick = () => {
    if (isFormValid) {
      handleOrderConfirm();
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  return (
    <div className="modalCard">
      <Button variant="primary" onClick={handleShow} className="py-2">
        Proceed to Checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">Select Your Payment Method</h5>
          <div className="modal-content">
            <div className="modal-body">
              <div className="tabs mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${
                        activeTab === "visa" ? "active" : ""
                      }`}
                      id="visa-tab"
                      data-toggle="tab"
                      href="#visa"
                      role="tab"
                      aria-controls="visa"
                      aria-selected={activeTab === "visa"}
                      onClick={() => handleTabChange("visa")}
                    >
                      <img src="https://i.imgur.com/sB4jftM.png" width="80" />
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    {/* Add 'Cash on Delivery' option */}
                    <a
                      className={`nav-link ${
                        activeTab === "cashOnDelivery" ? "active" : ""
                      }`}
                      id="cashOnDelivery-tab"
                      data-toggle="tab"
                      href="#cashOnDelivery"
                      role="tab"
                      aria-controls="cashOnDelivery"
                      aria-selected={activeTab === "cashOnDelivery"}
                      onClick={() => handleTabChange("cashOnDelivery")}
                    >
                      Cash on Delivery
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  {/* visa content */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "visa" ? "show active" : ""
                    }`}
                    id="visa"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    {/* Visa tab content */}
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Credit card</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            name="cardholderName"  // Use a unique name for each input field
                            id="cardholderName"  
                            className="form-control"
                            required="required"
                            onBlur={handleInputChange}
                          />
                          <span>Cardholder Name</span>
                        </div>
                        <div className="inputbox">
                          <input
                            type="text"
                            name="cardNumber"      // Use a unique name for each input field
                            id="cardNumber" 
                            min="1"
                            max="999"
                            className="form-control"
                            required="required"
                            onBlur={handleInputChange}
                          />
                          <span>Card Number</span> <i className="fa fa-eye"></i>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="expiryDate"      // Use a unique name for each input field
                              id="expiryDate"  
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                              onBlur={handleInputChange}
                            />
                            <span>Expiration Date</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              id="cvv"              // Add an id for easier selection
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                              onBlur={handleInputChange}
                            />
                            <span>CVV</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* cash on delivery content */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "cashOnDelivery" ? "show active" : ""
                    }`}
                    id="cashOnDelivery"
                    role="tabpanel"
                    aria-labelledby="cashOnDelivery-tab"
                  >
                    {/* Cash on Delivery content */}
                    <div className="mx-4 mt-4">
                      <div className="text-center">
                        <h5>Cash on Delivery</h5>
                      </div>
                      <div className="form mt-3">
                        <p>Pay with cash when your order is delivered to your doorstep.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* payment disclaimer */}
              <p className="mt-3 px-4 p-Disclaimer">
                <em>Payment Disclaimer:</em> In no event shall payment or partial payment by Owner for any material or service
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success btn-block" onClick={handlePayNowClick} disabled={!isFormValid}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
