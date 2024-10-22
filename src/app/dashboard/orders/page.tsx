"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

// Define the Order type
type Order = {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  price: number;
  delivered: boolean;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock fetch function to simulate fetching orders from an API
  const fetchOrders = () => {
    setOrders([
      {
        id: 1,
        customerName: "John Doe",
        productName: "Running Shoes",
        quantity: 2,
        price: 120,
        delivered: true,
      },
      {
        id: 2,
        customerName: "Alice Smith",
        productName: "Training Jacket",
        quantity: 1,
        price: 60,
        delivered: false,
      },
      {
        id: 3,
        customerName: "Bob Johnson",
        productName: "Yoga Mat",
        quantity: 3,
        price: 90,
        delivered: true,
      },
      {
        id: 4,
        customerName: "Jane Williams",
        productName: "Sports Shorts",
        quantity: 4,
        price: 80,
        delivered: false,
      },
    ]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleToggleDelivery = (id: number) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, delivered: !order.delivered } : order
      )
    );
  };

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
      <h1 className="text-2xl font-semibold mb-6">Order Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-neutral-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <th className="border border-neutral-300 p-3 text-left">Customer Name</th>
              <th className="border border-neutral-300 p-3 text-left">Product Name</th>
              <th className="border border-neutral-300 p-3 text-left">Quantity</th>
              <th className="border border-neutral-300 p-3 text-left">Price (USD)</th>
              <th className="border border-neutral-300 p-3 text-left">Delivery Status</th>
              <th className="border border-neutral-300 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td className="border border-neutral-300 p-3">{order.customerName}</td>
                <td className="border border-neutral-300 p-3">{order.productName}</td>
                <td className="border border-neutral-300 p-3">{order.quantity}</td>
                <td className="border border-neutral-300 p-3">${order.price}</td>
                <td className="border border-neutral-300 p-3">
                  <span
                    className={`font-semibold ${
                      order.delivered ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.delivered ? "Delivered" : "Pending"}
                  </span>
                </td>
                <td className="border border-neutral-300 p-3 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleToggleDelivery(order.id)}
                      className={`text-white rounded-md p-2 ${
                        order.delivered
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={order.delivered ? faTimes : faCheck}
                        className="h-5 w-5"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
