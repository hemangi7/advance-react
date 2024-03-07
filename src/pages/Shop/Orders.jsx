import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";
import PageHeader from "../../components/PageHeader";
import { auth } from "../../contexts/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [toggleDrop, setToggleDrop] = useState(false);

  useEffect(() => {
    console.log("this is orders")
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ordersRef = collection(firestore, "orders");
          const q = query(ordersRef, where("userID", "==", user.uid));
          const orderSnap = await getDocs(q);
          const ordersData = orderSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <PageHeader title={"Your Orders"} curPage={"Orders"} />
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-white p-4 shadow-md rounded-md transition duration-300 hover:shadow-lg mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                Order ID: {order.id}
              </span>
              <span className="text-gray-500">Date: {order.date}</span>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> {order.address}, {order.city},{" "}
              {order.pincode}
            </p>
            <div className="flex justify-between items-center mb-2">
              <div>
                <strong>Total Items:</strong> {order.cartItems.length}
              </div>
              <div>
                <strong>Total Amount:</strong> $
                {order.orderTotal ? order.orderTotal.toFixed(2) : "N/A"}
              </div>
              <div
                className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                onClick={() => setToggleDrop(!toggleDrop)}
              >
                {toggleDrop ? <FaArrowUp /> : <FaArrowDown />}
              </div>
            </div>
            {toggleDrop && (
              <div className="cart-top mt-3">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.cartItems.map((item, indx) => (
                      <tr key={indx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`${item.img}`}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.quantity}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;