function CartPage({ cart, removeFromCart }) {
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
    </div>
  );
}

export default CartPage;