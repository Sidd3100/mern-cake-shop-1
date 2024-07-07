import React from 'react';

const Dummy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Order 6442a5d0ce6f330d93a83a83</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Shipping</h3>
          <p><strong>Name:</strong> John Smith</p>
          <p><strong>Email:</strong> john@gmail.com</p>
          <p><strong>Address:</strong> 20 Main St, Boston, 01012, USA</p>
          <p className="text-red-500">Not Delivered</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <p><strong>Method:</strong> PayPal</p>
          <p className="text-green-500">Paid on 2023-04-21T18:24:17.129Z</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Items</h3>
          <div>
            <p><strong>Logitech G-Series Gaming Mouse</strong> - 1 x $49.99 = $49.99</p>
            <p><strong>Canon EOS 80D DSLR Camera</strong> - 2 x $929.99 = $1859.98</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <p><strong>Items:</strong> $1909.97</p>
          <p><strong>Shipping:</strong> $0</p>
          <p><strong>Tax:</strong> $286.5</p>
          <p><strong>Total:</strong> $2196.47</p>
          <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded w-full sm:w-auto">Mark As Delivered</button>
        </div>
      </div>
    </div>
  );
}

export default Dummy;
