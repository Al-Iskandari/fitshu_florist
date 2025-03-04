import { useShop } from '../context/ShopContext';

export default function TransactionHistory() {
  const { transactions } = useShop();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Transaction History</h1>
      {transactions.length === 0 ? (
        <div>No transactions found.</div>
      ) : (
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div key={transaction.id} className="p-4 bg-white shadow-md rounded-md">
              <h2 className="text-lg font-semibold text-dark">Order #{transaction.id}</h2>
              <p className="text-gray-700">Customer: {transaction.customer.name}</p>
              <p className="text-gray-700">Total: ${transaction.total.toFixed(2)}</p>
              <p className="text-gray-700">Date: {new Date(transaction.id).toLocaleDateString()}</p>
              <ul className="mt-2">
                {transaction.items.map(item => (
                  <li key={item.id} className="text-gray-700">
                    {item.name} x{item.quantity} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}