import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "orders"));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-white p-4 shadow-md rounded-md transition duration-300 hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Order ID: {order.id}</span>
              <span className="text-gray-500">Date: {order.date}</span>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> {order.address}, {order.city}, {order.pincode}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {/* Additional order details can be displayed here */}
              <div>
                <strong>Total Items:</strong> {order.cartItems.length}
              </div>
              <div>
                <strong>Total Amount:</strong> ${order.totalAmount}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
