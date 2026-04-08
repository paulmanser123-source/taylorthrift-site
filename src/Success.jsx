import { useEffect } from "react";

function Success() {
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
      <p>Thank you for your purchase!</p>
    </div>
  );
}

export default Success;