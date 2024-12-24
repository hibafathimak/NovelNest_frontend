import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import { clearCartAPI, createOrderAPI, createPaymentAPI, verifyPaymentAPI } from '../services/allAPI';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, getCartAmount, setCartItems } = useContext(ShopContext);
  const amount = getCartAmount();

  const [method, setMethod] = useState("cod");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const [paymentStatus, setPaymentStatus] = useState(true);

  const validateForm = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return false;
    }
    if (
      !firstName || !lastName || !email || !phone || !street || !city || !state || !zipcode || !country
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      toast.error("First name can only contain letters.");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      toast.error("Last name can only contain letters.");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(country)) {
      toast.error("Country name can only contain letters.");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(state)) {
      toast.error("State name can only contain letters.");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(city)) {
      toast.error("City name can only contain letters.");
      return false;
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!/^\+?[\d\s\-()]+$/.test(phone)) {
      toast.error("Invalid Phone Number");
      return false;
    }
    if (!/^\d+$/.test(zipcode)) {
      toast.error("Please enter a valid zipcode.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (method === 'cod') {
      setPaymentStatus(false);
    } else {
      setPaymentStatus(true);
    }
  }, [method]);

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      userInfo: { firstName, lastName, email, phone },
      items: cartItems,
      amount,
      address: { street, city, state, zipcode, country },
      paymentMethod: method,
      payment: paymentStatus,
    };

    try {
      if (sessionStorage.getItem('token')) {
        const reqHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };

        const OrderResponse = await createOrderAPI(userId, orderData, reqHeader);

        if (OrderResponse.status === 200) {
          toast.success("Order placed successfully!");
          sessionStorage.setItem("cartItems", "{}");
          setCartItems({});
          const orderId = OrderResponse.data;

          if (method === "razorpay") {
            const handlePayment = async () => {
              try {
                const paymentData = await createPaymentAPI({ amount }, reqHeader);
                const options = {
                  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                  amount: paymentData.data.amount,
                  currency: 'USD',
                  name: "NovelNest",
                  description: "Order Payment",
                  order_id: paymentData.data.id,
                  prefill: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    contact: phone,
                  },
                  handler: async (response) => {
                    const razorpayData = {
                      userId,
                      orderId,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    };

                    try {
                      const verifyResponse = await verifyPaymentAPI(razorpayData, reqHeader);

                      if (verifyResponse.status === 200) {
                        toast.success('Payment verified successfully!');
                      } else {
                        toast.error('Payment verification failed!');
                      }
                    } catch (error) {
                      console.error('Error verifying payment:', error);
                      toast.error('Failed to verify payment.');
                    }
                  },
                  theme: { color: "#5f63b8" },
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();
              } catch (error) {
                console.error("Error initiating payment flow:", error);
                toast.error("An error occurred while processing payment.");
              }
            };

            handlePayment();
          }

          const clearCartResponse = await clearCartAPI(userId, reqHeader);
          if (clearCartResponse.status === 200) {
            console.log("Cart cleared successfully.");
          } else {
            console.log("Error clearing cart.");
          }

          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setStreet("");
          setCity("");
          setState("");
          setZipcode("");
          setCountry("");
          setMethod("cod");
          navigate('/orders');
        } else {
          toast.error("Failed to place the order.");
        }
      } else {
        toast.error("You must be logged in to place an order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <section className="max-padd-container min-h-screen my-20">
      <form className="pt-28" onSubmit={placeOrder}>
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          <div className="flex flex-1 flex-col text-[95%] gap-3">
            <Title title1={"Delivery "} title2={"Information"} paraStyles={"hidden"} title1Styles={"h3"} />

            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
            </div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-full"
            />
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-full"
            />
            <input
              type="text"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-full"
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
              <input
                type="text"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                name="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Zipcode"
                className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2"
              />
            </div>
          </div>

          <div className="flex-1 flex-col flex">
            <CartTotal />

            <div className="my-6">
              <h3 className="bold-20 mb-5">
                Payment <span className="text-secondary">Method</span>
              </h3>
              <div className="flex gap-3">
                <div
                  onClick={() => setMethod("razorpay")}
                  className={`${method === 'razorpay' ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}
                >
                  RazorPay
                </div>
                <div
                  onClick={() => setMethod("cod")}
                  className={`${method === 'cod' ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}
                >
                  Cash On Delivery
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn-secondaryOne">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </section>
  );
};

export default PlaceOrder;
