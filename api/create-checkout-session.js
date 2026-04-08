import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { product } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],

      success_url: "https://www.taylorthrift.co.uk/success",
      cancel_url: "https://www.taylorthrift.co.uk/cancel",
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("STRIPE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}