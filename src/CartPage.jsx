function CartPage({ cart, removeFromCart }) {

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const text = await res.text();

let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("Non-JSON response:", text);
  alert("Server error — check logs");
  return;
}

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout error");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - £{item.price}

          <button onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: £{total.toFixed(2)}</h2>

      {/* ✅ BUTTON USES FUNCTION */}
      <button onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default CartPage;