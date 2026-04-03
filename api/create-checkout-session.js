import Stripe from "stripe";

export default async function handler(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if (req.method !== "POST") {
      return res.status(405).send("Method not allowed");
    }

    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://taylorthrift.co.uk",
      cancel_url: "https://taylorthrift.co.uk",
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}