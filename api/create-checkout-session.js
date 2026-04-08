import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // ✅ DEFINE CART PROPERLY
    const cart = req.body.cart;

    if (!cart || !cart.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const validCart = cart.filter(item => Number(item.price) > 0);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: validCart.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name || "Item",
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: 1,
      })),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("STRIPE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}