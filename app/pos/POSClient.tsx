"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  lowStockThreshold: number;
  categoryId: number;
};
type CartItem = Product & {
  quantity: number;
};
export default function POSClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CARD" | "">("");
  const [amountPaid, setAmountPaid] = useState("");
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const cartTotal = cart.reduce(
  (total, item) =>
    total + Number(item.price) * item.quantity,
  0
);

const cashAmount = Number(amountPaid);

const change =
  paymentMethod === "CASH" && cashAmount >= cartTotal
    ? cashAmount - cartTotal
    : 0;
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/pos/products");
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to load products.");
          return;
        }

        setProducts(result.products);
      } catch {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function addToCart(product: Product) {
  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return currentCart;
      }

      return currentCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    if (product.stock <= 0) {
      return currentCart;
    }

    return [
      ...currentCart,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
}

  if (loading) {
    return (
      <p className="text-gray-400">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400">
        {error}
      </p>
    );
  }
  function increaseQuantity(productId: number) {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === productId && item.quantity < item.stock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}

function decreaseQuantity(productId: number) {
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

function removeFromCart(productId: number) {
  setCart((currentCart) =>
    currentCart.filter((item) => item.id !== productId)
  );
}
async function handleCheckout() {
  setPaymentError("");

  if (!paymentMethod) {
    setPaymentError("Please select a payment method.");
    return;
  }

  if (paymentMethod === "CASH") {
    if (amountPaid === "") {
      setPaymentError("Please enter the cash amount.");
      return;
    }

    if (cashAmount < cartTotal) {
      setPaymentError("Cash amount is less than the total.");
      return;
    }
  }

  try {
    setProcessingPayment(true);

    const response = await fetch("/api/pos/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        paymentMethod,
        amountPaid:
          paymentMethod === "CASH"
            ? cashAmount
            : undefined,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setPaymentError(result.error || "Payment failed.");
      return;
    }

    console.log("Checkout success:", result);

    setCompletedOrder({
  ...result,
  items: cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  })),
  createdAt: new Date().toISOString(),
});



setProducts((currentProducts) =>
  currentProducts.map((product) => {
    const soldItem = cart.find(
      (item) => item.id === product.id
    );

    if (!soldItem) {
      return product;
    }

    return {
      ...product,
      stock: product.stock - soldItem.quantity,
    };
  })
);

setCart([]);
setShowPayment(false);
setPaymentMethod("");
setAmountPaid("");

  } catch {
    setPaymentError("Unable to connect to the server.");
  } finally {
    setProcessingPayment(false);
  }
}
  return (
  <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
    {/* Products */}
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Products
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <h3 className="text-lg font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 text-blue-400">
              RM {Number(product.price).toFixed(2)}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Stock: {product.stock}
            </p>
          </button>
        ))}
      </div>
    </div>

    {/* Cart */}
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        Cart
      </h2>

      {cart.length === 0 ? (
        <p className="mt-4 text-gray-400">
          No items added yet.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          
          {cart.map((item) => (
  <div
    key={item.id}
    className="border-b border-slate-800 pb-4"
  >
    <div className="flex justify-between gap-4">
      <div>
        <p className="font-medium">
          {item.name}
        </p>

        <p className="text-sm text-gray-400">
          RM {Number(item.price).toFixed(2)} each
        </p>
      </div>

      <p className="font-semibold">
        RM {(Number(item.price) * item.quantity).toFixed(2)}
      </p>
    </div>

    <div className="mt-3 flex items-center gap-2">
      <button
        type="button"
        onClick={() => decreaseQuantity(item.id)}
        className="rounded-lg bg-slate-700 px-3 py-1 hover:bg-slate-600"
      >
        -
      </button>

      <span className="min-w-8 text-center">
        {item.quantity}
      </span>

      <button
        type="button"
        onClick={() => increaseQuantity(item.id)}
        disabled={item.quantity >= item.stock}
        className="rounded-lg bg-slate-700 px-3 py-1 hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>

      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        className="ml-auto rounded-lg bg-red-600 px-3 py-1 text-sm hover:bg-red-500"
      >
        Remove
      </button>
    </div>
  </div>
))}
                </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 border-t border-slate-700 pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>
              RM{" "}
              {cart
                .reduce(
                  (total, item) =>
                    total + Number(item.price) * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPayment(true)}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500"
          >
            Pay
          </button>
                    {showPayment && (
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800 p-4">
              <h3 className="text-lg font-semibold">
                Payment
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Select payment method
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CASH")}
                  className={`rounded-lg px-4 py-3 font-medium ${
                    paymentMethod === "CASH"
                      ? "bg-blue-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  Cash
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("CARD")}
                  className={`rounded-lg px-4 py-3 font-medium ${
                    paymentMethod === "CARD"
                      ? "bg-blue-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  Card
                </button>

              </div>
              {paymentMethod === "CASH" && (
  <div className="mt-4">
    <label className="mb-2 block text-sm font-medium">
      Amount Given
    </label>

    <input
      type="number"
      min="0"
      step="0.01"
      value={amountPaid}
      onChange={(event) => setAmountPaid(event.target.value)}
      placeholder="0.00"
      className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
    />

    <div className="mt-4 flex justify-between">
      <span className="text-gray-400">Change</span>

      <span className="font-semibold">
        RM {change.toFixed(2)}
      </span>
    </div>

    {amountPaid !== "" && cashAmount < cartTotal && (
      <p className="mt-2 text-sm text-red-400">
        Amount given is less than the total.
      </p>
    )}
  </div>
)}
{paymentError && (
  <p className="mt-4 text-sm text-red-400">
    {paymentError}
  </p>
)}

<button
  type="button"
  onClick={handleCheckout}
  disabled={
    processingPayment ||
    !paymentMethod ||
    (paymentMethod === "CASH" &&
      (amountPaid === "" || cashAmount < cartTotal))
  }
  className="mt-4 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-40"
>
  {processingPayment ? "Processing..." : "Confirm Payment"}
</button>
            </div>
          )}
        </div>
      )}
    </div>
    {completedOrder && (
  <div
  id="receipt"
  className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6"
>
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">
          Receipt
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Order #{completedOrder.orderId}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
  const receipt = document.getElementById("receipt");

  if (!receipt) {
    return;
  }

  const printWindow = window.open("", "_blank", "width=800,height=600");

  if (!printWindow) {
    return;
  }

  printWindow.document.write(`
  <html>
    <head>
      <title>Receipt</title>

      <style>
        @page {
          size: 58mm auto;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          width: 58mm;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.3;
          color: #000;
        }

        #receipt {
          width: 48mm;
          margin: 0 auto;
          padding: 3mm 0;
          border: none !important;
          background: #fff !important;
          color: #000 !important;
          box-shadow: none !important;
        }

        #receipt * {
          color: #000 !important;
        }
        .center {
  text-align: center;
}

.title {
  font-size: 14px;
}

.separator {
  border-top: 1px dashed #000;
  margin: 2mm 0;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 2mm;
  margin: 1mm 0;
}

.item {
  margin: 2mm 0;
}

.item-name {
  font-weight: bold;
}

.total {
  font-size: 12px;
  font-weight: bold;
}
        button {
          display: none !important;
        }
      </style>
    </head>

    <body>
  <div id="receipt">
    <div class="center">
      <strong class="title">POS RECEIPT</strong>
    </div>

    <div class="separator"></div>

    <div>Order #${completedOrder.orderId}</div>
    <div>${new Date(completedOrder.createdAt).toLocaleString()}</div>

    <div class="separator"></div>

    ${completedOrder.items
      .map(
        (item: any) => `
          <div class="item">
            <div class="item-name">${item.name}</div>

            <div class="row">
              <span>
                ${item.quantity} x RM ${Number(item.price).toFixed(2)}
              </span>

              <span>
                RM ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        `
      )
      .join("")}

    <div class="separator"></div>

    <div class="row total">
      <span>TOTAL</span>
      <span>RM ${Number(completedOrder.total).toFixed(2)}</span>
    </div>

    <div class="row">
      <span>Payment</span>
      <span>${completedOrder.paymentMethod}</span>
    </div>

    ${
      completedOrder.paymentMethod === "CASH"
        ? `
          <div class="row">
            <span>Paid</span>
            <span>RM ${Number(completedOrder.amountPaid).toFixed(2)}</span>
          </div>

          <div class="row">
            <span>Change</span>
            <span>RM ${Number(completedOrder.change).toFixed(2)}</span>
          </div>
        `
        : ""
    }

    <div class="separator"></div>

    <div class="center">
      THANK YOU!
    </div>
  </div>
</body>
  </html>
`);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  
}}
        className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
      >
        Print Receipt
      </button>

      <button
        type="button"
        onClick={() => setCompletedOrder(null)}
        className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500"
>
        New Sale
      </button>

    </div>

    <div className="mt-6 space-y-3">
      {completedOrder.items.map((item: any) => (
        <div
          key={item.id}
          className="flex justify-between border-b border-slate-800 pb-3"
        >
          <div>
            <p className="font-medium">
              {item.name}
            </p>

            <p className="text-sm text-gray-400">
              RM {Number(item.price).toFixed(2)} × {item.quantity}
            </p>
          </div>

          <p className="font-semibold">
            RM {(Number(item.price) * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>

    <div className="mt-6 space-y-2">
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>
          RM {Number(completedOrder.total).toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <span>Payment Method</span>
        <span>{completedOrder.paymentMethod}</span>
      </div>

      {completedOrder.paymentMethod === "CASH" && (
        <>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Amount Paid</span>
            <span>
              RM {Number(completedOrder.amountPaid).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <span>Change</span>
            <span>
              RM {Number(completedOrder.change).toFixed(2)}
            </span>
          </div>
        </>
      )}

      <div className="flex justify-between text-sm text-gray-400">
        <span>Date</span>
        <span>
          {new Date(completedOrder.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  </div>
)}


  </div>
);
}