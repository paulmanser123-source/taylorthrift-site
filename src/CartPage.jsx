function CartPage({ cart, removeFromCart }) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );
const handleCheckout = async () => {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

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
    </div>
  );
}
<button
  onClick={handleCheckout}
  style={{ marginTop: "20px" }}
>
  Checkout
</button>
export default CartPage;