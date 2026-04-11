import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
console.log("ENV KEY:", process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3001, () => console.log("✅ Server running on port 3001"));
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Stripe error" });
  }
});