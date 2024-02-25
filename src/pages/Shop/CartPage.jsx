import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../../assets/images/shop/del.png";
import CheckoutPage from "./CheckoutPage";

// import Razorpay from "razorpay";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";
import { auth } from "../../contexts/AuthProvider";
import Button from "react-bootstrap/Button";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const getCartItems = async () => {
    try {
      const localCartItem = [];
      const q = query(
        collection(firestore, "cart"),
        where("userId", "==", auth.currentUser.uid)
      );

      const cartItemsSnap = await getDocs(q);
      cartItemsSnap.forEach((doc) => {
        localCartItem.push({ _id: doc.id, ...doc.data() });
      });
      setCartItems(localCartItem);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = async (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);
    // Update local storage with the new cart items
    await updateDoc(doc(firestore, "cart", item._id), {
      quantity: item.quantity,
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);
      await updateDoc(doc(firestore, "cart", item._id), {
        quantity: item.quantity,
      });
      // Update local storage with the new cart items
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  // Handle item removal
  const handleRemoveItem = async (item) => {
    try {
      await deleteDoc(doc(firestore, "cart", item._id));
      const updatedCart = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      getCartItems();
      setCartItems(updatedCart);
      console.log("Deleted Doc");
    } catch (error) {
      console.log(error);
    }
  };
  const handleShow = () => {
  //   const addressInfo = {
  //     address,
  //     city,
  //     pincode,
  //   };

  //   // var options = {
  //   //   key: "rzp_test_Rw6OPD6Xd4oKht",
  //   //   key_secret: "Vr7Gx2UPc8Zd4H0VR2SsaOjv",
  //   //   amount: parseInt(orderTotal),
  //   //   currency: "USD",
  //   //   order_receipt: "order_rcptit_ShopCart",
  //   //   name: "Shop Cart",
  //   //   description: "payment module",
  //   //   handler: (res) => {
  //   //     console.log(res);
  //   //   },
  //   //   theme: { color: "#3399cc" },
  //   // };

  //   // var pay = new Razorpay(options);
  //   // pay.open();
  };



  // Calculate the cart subtotal
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div>
      <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, indx) => (
                    <tr key={indx}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to="/shop-single">
                            <img src={`${item.img}`} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to="/shop-single">{item.name}</Link>
                        </div>
                      </td>
                      <td className="cat-price">${item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            className="cart-plus-minus-box"
                            type="text"
                            name="qtybutton"
                            value={item.quantity}
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cat-toprice">
                        ${calculateTotalPrice(item)}
                      </td>
                      <td className="cat-edit">
                        <a href="#" onClick={() => handleRemoveItem(item)}>
                          <img src={delImgUrl} alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* cart bottom */}
            <div className="cart-bottom">
              {/* checkout box */}
              <div className="cart-checkout-box">
                <form className="coupon" action="/">
                  <input
                    type="text"
                    name="coupon"
                    placeholder="Coupon Code..."
                    className="cart-page-input-text"
                  />
                  <input type="submit" value="Apply Coupon" />
                </form>
                <form className="cart-checkout" action="/">
                  <input type="submit" value="Update Cart" />
                  {/* <Link to="/check-out"><input type="submit" value="Proceed to Checkout" /></Link> */}
                  <div><CheckoutPage
                      cartItems={cartItems}
                      address={address}
                      city={city}
                      pincode={pincode}
                    />
                  </div>
                </form>
              </div>

              {/* shopping box */}
              <div className="shiping-box">
                <div className="row">
                  {/* shipping  */}
                  <div className="col-md-6 col-6">
                    <div className="calculate-shiping">
                      <h3>Calculate Shipping</h3>

                      <input
                        type="text"
                        name="Address"
                        placeholder="Address"
                        value={address}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <input
                        type="text"
                        name="City"
                        placeholder="City"
                        value={city}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Postcode/ZIP"
                        value={pincode}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* cart total */}
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Totals</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart Subtotal</span>
                          <p className="pull-right">$ {cartSubtotal}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Shipping and Handling
                          </span>
                          <p className="pull-right">Free Shipping</p>
                        </li>
                        <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">
                            $ {orderTotal.toFixed(2)}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;