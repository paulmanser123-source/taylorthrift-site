import Stripe from "stripe";

export default async function handler(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if (req.method !== "POST") {
      return res.status(405).send("Method not allowed");
    }

    const { product, cart } = req.body;

    // 🔥 HANDLE BOTH CASES
    let items = [];

    if (cart && cart.length) {
      items = cart;
    } else if (product) {
      items = [product];
    } else {
      return res.status(400).json({ error: "No product or cart provided" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // safer
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      success_url: "https://taylorthrift.co.uk/success",
      cancel_url: "https://taylorthrift.co.uk/cancel",
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("STRIPE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}