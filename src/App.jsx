import { Routes, Route, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import CartPage from "./CartPage";




const linkStyle = {
  margin: "0 15px",
  color: "#c4a484",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px"
};

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "white"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          zIndex: 1
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <header
          style={{
            padding: "10px",
            textAlign: "center",
            borderBottom: "1px solid #222",
            background: "rgba(0,0,0,0.6)",
            position: "relative"
          }}
        >

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <div
  onClick={() => setMenuOpen(!menuOpen)}
  style={{
    position: "absolute",
    left: "20px",
    top: "20px",
    fontSize: "28px",
    cursor: "pointer",
    transition: "0.3s",
    transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)"
  }}
>
  ☰
</div>
          )}

          {/* LOGO */}
          <Link to="/">
            <img
              src="/logo.png"
              alt="Taylor Thrift UK"
              style={{ height: "120px", maxWidth: "80%" }}
            />
          </Link>

          {/* DESKTOP NAV */}
          
            <nav
  style={{
    marginTop: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px"
  }}
>
  <Link to="/" style={linkStyle}>Home</Link>
  <Link to="/about" style={linkStyle}>About Us</Link>
  <Link to="/contact" style={linkStyle}>Contact Us</Link>
  <Link to="/donate" style={linkStyle}>Make a Donation</Link>
</nav>
          

          {/* MOBILE DROPDOWN */}
          {isMobile && (
  <>
    {/* BLUR OVERLAY */}
    <div
      onClick={() => setMenuOpen(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(6px)",
        background: "rgba(0,0,0,0.4)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
        zIndex: 9
      }}
    />

    {/* DRAWER */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "280px",
        background: "linear-gradient(180deg, #000, #111)",
        padding: "30px 25px",
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.35s ease",
        zIndex: 10,
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* CLOSE BUTTON */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          fontSize: "26px",
          marginBottom: "30px",
          cursor: "pointer",
          alignSelf: "flex-end"
        }}
      >
        ✖
      </div>

      {/* MENU TITLE */}
      <h2 style={{
        color: "#c4a484",
        marginBottom: "30px",
        letterSpacing: "2px"
      }}>
        MENU
      </h2>

      {/* LINKS */}
      {[
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Make a Donation", path: "/donate" }
      ].map((item, i) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={() => setMenuOpen(false)}
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "18px",
            marginBottom: "20px",
            transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
            opacity: menuOpen ? 1 : 0,
            transition: `all 0.3s ease ${i * 0.1}s`,
            letterSpacing: "1px"
          }}
        >
          {item.name}
        </Link>
      ))}

      {/* OPTIONAL FOOTER */}
      <div style={{ marginTop: "auto", fontSize: "12px", color: "#777" }}>
        © Taylor Thrift UK
      </div>

    </div>
  </>
)}
        </header>

        <main
          style={{
            padding: "30px 15px",
            textAlign: "center",
            maxWidth: "900px",
            width: "90%",
            margin: "40px auto",
            background: "rgba(0,0,0,0.25)",
            border: "3px solid rgba(253, 252, 250, 0.2)",
            borderRadius: "10px",
            backdropFilter: "blur(8px)"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

// 🏠 HOME
function Home() {
  return (
    <>
      {/* HERO */}
      <h1 style={{
        fontSize: "clamp(32px, 6vw, 64px)",
        marginBottom: "20px",
        letterSpacing: "2px"
      }}>
        TAYLOR THRIFT UK
      </h1>

      <p style={{
        fontSize: "clamp(16px, 2.5vw, 22px)",
        color: "#c4a484",
        marginBottom: "30px"
      }}>
        Authentic Clothing from across the world  
        <br />
        No Repops — All Pre-Loved
      </p>

      {/* CTA BUTTONS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "40px"
      }}>
        <Link to="/shop" style={primaryBtn}>
  Shop Coming Soon
</Link>

<Link to="/contact" style={secondaryBtn}>
  Contact Us
</Link>
    
      </div>

      {/* DIVIDER */}
      <div style={{
        height: "1px",
        background: "rgba(255,255,255,0.2)",
        margin: "40px auto",
        width: "60%"
      }} />

      {/* BRAND TEXT */}
      <p style={{
        maxWidth: "700px",
        margin: "0 auto 20px auto",
        lineHeight: "1.6"
      }}>
        Taylor Thrift UK is a specialist in authentic vintage and retro clothing from the 80s and 90s. We source unique, pre-loved streetwear from across the world, offering one-of-one pieces you won’t find anywhere else.
      </p>

      <p style={{
        maxWidth: "700px",
        margin: "0 auto",
        lineHeight: "1.6",
        color: "#ccc"
      }}>
        Look out for our upcoming members-only area, offering early access to drops, exclusive merchandise, and limited edition DJ mixes inspired by the UK's biggest club nights.
      </p>

      <div style={{ marginTop: "40px" }}>
  <Link to="/shop" style={primaryBtn}>
    View Latest Pieces
  </Link>
</div>
    </>
  );
}

// 📄 ABOUT
function About() {
  return (
    <>
      <h2>About Us</h2>
      <p style={{ maxWidth: "600px", margin: "20px auto" }}>
        Taylor Thrift UK began as hiphopgearuk in 2001, bringing authentic US streetwear to the UK.
        <br /><br />

        Today, we specialise in curated vintage clothing and collectibles from the 80's and 90's predominantly, but also a smattering of future classics. Use the form on our contact us page to give us your target items and budgets. Let us do the work for you.
        <br /><br />
        Evisu, Ecko Unlimited, Southpole, Chevignon, Ellesse, Lois, British Knights, Air Jordan, Patrick Ewing, Stussy, Fubu, Tommy Hilfiger, Phat Farm, Wu Wear, Champion, Ralph Lauren.
        Fila, Diadora, Sergio Tachini, Lacoste, Adidas, Kappa, Puma, Lotto, Fred Perry, Ted Baker, Barbour, Superdry, Burberry, Berghaus, Pringle, Kangol, Airwalk.
        <br /><br />
        Brands we have dealt with, Amoungst many others.  
      </p>
    </>
  );
}

// 📩 CONTACT (WITH FORM)
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong");
      }
    } catch (err) {
      setStatus("Error sending message");
    }
  };

  return (
    <>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          style={{ ...inputStyle, height: "120px" }}
        />

        <button type="submit" style={buttonStyle}>
          Send Message
        </button>

        {status && <p style={{ marginTop: "20px" }}>{status}</p>}
      </form>
    </>
  );
}
function Shop({ products }) {
  if (!products.length) {
  return (
    <div style={{ padding: "40px" }}>
      <p>Loading latest drops...</p>
    </div>
  );
}
  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>SHOP</h2>

      <div style={gridStyle}>
  {products
    .filter(product => product.status === "available")
    .map((product, index) => {
      const image = `/products/${product.sku}/1.JPEG`;

      return (
        <Link
          to={`/product/${product.sku}`}
          key={product.sku + index}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div style={cardStyle}>

            {/* IMAGE */}
            <div style={{ position: "relative" }}>
              <img
                src={image}
                alt={product.name}
                style={imageStyle}
                onError={(e) => {
                  e.target.onerror = null; // 🔥 stops loop
                  e.target.src = "/placeholder.JPEG";
                }}
              />

              {product.status === "sold" && (
                <div style={soldStyle}>
                  SOLD
                </div>
              )}
            </div>

            {/* INFO */}
            <div style={{ marginTop: "10px" }}>
  <p style={{ fontWeight: "bold" }}>{product.name}</p>
  <p>£{product.price}</p>
  <p style={{ color: "#888" }}>Size: {product.size}</p>

  {/* NEW: GRADE */}
  <p style={{ color: "#c4a484", fontSize: "14px" }}>
    Grade: {product.grade}
  </p>
</div>

          </div>
        </Link>
      );
    })}
</div>
    </>
  );
}



function ProductPage({ products, addToCart }) {
  if (!products || !products.length) return <p>Loading...</p>;

  const { sku } = useParams();
  const product = products.find((p) => p.sku === sku);

  if (!product) return <p>Product not found</p>;

  

  // fallback image system
  const images = [
  `/products/${product.sku}/1.JPEG`,
  `/products/${product.sku}/2.JPEG`,
  `/products/${product.sku}/3.JPEG`
].filter(Boolean);

  const [mainImage, setMainImage] = useState(0);

  return (
    <div style={productPageStyle}>
      <div style={galleryStyle}>
        <img
          src={images[mainImage]}
          style={mainImageStyle}
          onError={(e) => {
  e.target.onerror = null; // 🔥 stops loop
  e.target.src = "/placeholder.jpg";
}}
        />

        <div style={thumbRow}>
          {images.map((img, i) => (
            <img
  key={i}
  src={img}
  style={thumbStyle}
  onClick={() => setMainImage(i)}
  onError={(e) => {
    e.target.style.display = "none";
  }}
/>

          ))}
        </div>
      </div>

      <div style={infoStyle}>
  <h2>{product.name}</h2>
  <p>£{product.price}</p>
  <p>Size: {product.size}</p>
  <p>Grade: {product.grade}</p>

  <button
  style={buttonStyle}
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>
  
  {/* BUY BUTTON */}
  <button
  style={buttonStyle}
  onClick={async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  product: {
    title: product.name,
    price: Number(product.price),
  },
}),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe error");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  }}
>
  Buy Now
</button>

</div>
    </div>
  );
}

// 💳 DONATE (simple placeholder for now)
function Donate() {
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = async (amount) => {
    try {
      const res = await fetch("/api/create-donation-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout error");
      }

    } catch (err) {
      alert("Something went wrong");
    }
  };


  return (
    <>
      <h2>Support Taylor Thrift</h2>

      <p style={{ marginBottom: "30px" }}>
        Help support the growth of the brand and future drops.
      </p>

      {/* QUICK BUTTONS */}
      <div>
        {[1, 5, 10].map((amount) => (
          <button
            key={amount}
            onClick={() => handleDonate(amount)}
            style={buttonStyle}
          >
            £{amount}
          </button>
        ))}
      </div>

      {/* CUSTOM */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Custom amount (£)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          style={inputStyle}
        />

        <br />

        <button
          onClick={() => handleDonate(Number(customAmount))}
          style={buttonStyle}
        >
          Donate
        </button>
      </div>
    </>
  );
}

export default function App() {
  
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
  setCart((prev) => [...prev, product]);
};

const removeFromCart = (index) => {
  setCart((prev) => prev.filter((_, i) => i !== index));
};

  useEffect(() => {
    fetch("/products.csv")
      .then(res => res.text())
      .then(csv => {
        const result = Papa.parse(csv, { header: true });

        console.log("RAW LENGTH:", result.data.length);

        const cleaned = result.data

          .filter(p => {
  const sku = p.SKU?.toString().trim();

  return (
    sku &&
    sku !== "SKU" &&
    sku.startsWith("TT") &&   // ✅ only your real products
    sku.length > 4
  );
})
          .map((p) => ({
            sku: p.SKU.trim(),
            name: `${p.Brand || ""} ${p.Title || ""}`.trim(),
            price: Number(
              (p["Price (£)"] || "").toString().replace("£", "")
            ) || 0,
            size: p.Size || "",
            colour: p.Colour || "",
            category: p.Category || "",
            grade: p.Grade || "",
            status:
              p["Status Available / Sold"] === "S"
                ? "sold"
                : "available",
            imageUrl:
              p["Image URL"] &&
              p["Image URL"] !== "Image URL" &&
              p["Image URL"].trim() !== ""
                ? p["Image URL"].trim()
                : null
          }));

        console.log("TOTAL PRODUCTS:", cleaned.length);

        setProducts(cleaned);
        setLoading(false); // ✅ IMPORTANT
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ USE LOADING STATE INSTEAD
  if (loading) {
    return <p style={{ padding: "40px" }}>Loading site...</p>;
  }

  return (
    <Routes>
  <Route path="/" element={<Layout><Home /></Layout>} />
  <Route path="/shop" element={<Layout><Shop products={products} /></Layout>} />

  <Route
    path="/product/:sku"
    element={
      <Layout>
        <ProductPage
          products={products}
          addToCart={addToCart}
        />
      </Layout>
    }
  />

  <Route
    path="/cart"
    element={
      <Layout>
        <CartPage
          cart={cart}
          removeFromCart={removeFromCart}
        />
      </Layout>
    }
  />

  <Route path="/about" element={<Layout><About /></Layout>} />
  <Route path="/contact" element={<Layout><Contact /></Layout>} />
  <Route path="/donate" element={<Layout><Donate /></Layout>} />
</Routes>
  );
}



// 🎨 STYLES (ONLY ONCE)
const inputStyle = {
  display: "block",
  width: "100%",
  maxWidth: "500px",
  margin: "10px auto",
  padding: "12px",
  background: "#111",
  border: "1px solid #333",
  color: "white"
};

const buttonStyle = {
  marginTop: "15px",
  padding: "12px 25px",
  background: "#c4a484",
  border: "none",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer"
};

const primaryBtn = {
  padding: "12px 28px",
  background: "#c4a484",
  color: "#000",
  textDecoration: "none",
  fontWeight: "bold",
  letterSpacing: "1px",
  border: "none"
};

const secondaryBtn = {
  padding: "12px 28px",
  border: "1px solid #c4a484",
  color: "#c4a484",
  textDecoration: "none",
  fontWeight: "bold",
  letterSpacing: "1px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "rgba(0,0,0,0.4)",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #222"
};

const imageStyle = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "8px"
};

const soldStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "#c4a484",
  color: "black",
  padding: "5px 10px",
  fontWeight: "bold",
  fontSize: "12px"
};
const productPageStyle = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const galleryStyle = {
  maxWidth: "400px",
  width: "100%"
};

const mainImageStyle = {
  width: "100%",
  borderRadius: "10px",
  marginBottom: "10px"
};

const thumbRow = {
  display: "flex",
  gap: "10px"
};

const thumbStyle = {
  width: "70px",
  height: "70px",
  objectFit: "cover",
  cursor: "pointer",
  borderRadius: "6px"
};

const infoStyle = {
  maxWidth: "300px",
  textAlign: "left"
};