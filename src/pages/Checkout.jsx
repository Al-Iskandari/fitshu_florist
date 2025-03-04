import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { saveTransaction } from '../services/googleSheetsService';
import { sendWhatsAppMessage } from '../services/whatsappService';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cart, dispatch } = useShop();
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [delivery, setDelivery] = useState({ date: '', time: '', instructions: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDelivery({ ...delivery, [name]: value });
  };

  const handleCheckout = async () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      toast.error('Please fill in all customer details');
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      customer,
      items: cart,
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      shipping: 5.00, // Flat rate shipping
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5.00,
      delivery,
    };

    try {
      await saveTransaction(transaction);
      sendWhatsAppMessage(transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
      toast.success('Transaction successful!');
    } catch (error) {
      toast.error(`Failed to complete transaction found this error ${error}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-dark mb-4">Customer Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleInputChange}
            className="input mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleInputChange}
            className="input mb-4"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleInputChange}
            className="input mb-4"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleInputChange}
            className="input mb-4"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-dark mb-4">Delivery Details</h2>
          <input
            type="date"
            name="date"
            value={delivery.date}
            onChange={handleDeliveryChange}
            className="input mb-4"
          />
          <input
            type="time"
            name="time"
            value={delivery.time}
            onChange={handleDeliveryChange}
            className="input mb-4"
          />
          <textarea
            name="instructions"
            placeholder="Special Instructions"
            value={delivery.instructions}
            onChange={handleDeliveryChange}
            className="input mb-4"
          />
        </div>
      </div>
      <button onClick={handleCheckout} className="btn btn-primary mt-6">
        Complete Purchase
      </button>
    </div>
  );
}