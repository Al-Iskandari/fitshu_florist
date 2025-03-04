export function sendWhatsAppMessage(transaction) {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  
  // Format the items for WhatsApp message
  const items = transaction.items.map(item => 
    `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`
  ).join('\n');
  
  // Create the message
  const message = `
*New Order #${transaction.id}*

*Customer Details:*
Name: ${transaction.customer.name}
Email: ${transaction.customer.email}
Phone: ${transaction.customer.phone}
Address: ${transaction.customer.address}

*Order Items:*
${items}

*Order Summary:*
Subtotal: $${transaction.subtotal.toFixed(2)}
Shipping: $${transaction.shipping.toFixed(2)}
Total: $${transaction.total.toFixed(2)}

*Delivery Details:*
Date: ${transaction.delivery.date}
Time: ${transaction.delivery.time}
Special Instructions: ${transaction.delivery.instructions || 'None'}

Thank you for your order!
`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
  
  return true;
}