import React, { useContext, useState } from 'react';
import loginImg from "../assets/login.png";
import Header from '../components/Header';
import { addCartToUserAPI, addWishlistToUserAPI, loginAPI, registerAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import validator from 'validator';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("login");
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    if (currentState === "signup" && username.length < 4) {
      toast.error("Name must be at least 4 characters long");
      return false;
    }
    if (!validator.isEmail(email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await registerAPI({ username, email, password });
      if (response.status === 200) {
        toast.success("Registration successful, redirecting to login");
        setCurrentState('login');
      } else {
        toast.error(response?.response?.data || "Registration failed.");
      }
    } catch (error) {
      toast.error(error?.response?.data || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      console.log("Starting login process...");
      const response = await loginAPI({ email, password });
  
      if (response.status === 200) {
        toast.success("Login successful");
        const token = response.data.token;
        const userId = response.data.user?._id;
        const reqHeader = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
  
        const sessionCart = sessionStorage.getItem("cartItems");
        if (sessionCart) {
          try {
            const cartItems = JSON.parse(sessionCart);
            console.log("Syncing cart...");
  
            const cartResponse = await addCartToUserAPI(
              userId,
              { cartData: cartItems },
              reqHeader
            );
  
            if (cartResponse.status === 200) {
              console.log("Cart synced successfully.");
            } else {
              console.warn("Cart sync incomplete or failed.");
            }
          } catch (cartError) {
            console.error("Cart sync error:", cartError);
          } finally {
            console.log("Removing cartItems from session storage.");
            sessionStorage.removeItem("cartItems");
          }
        }
  
        const sessionWishlist = sessionStorage.getItem("wishlistItems");
        if (sessionWishlist) {
          try {
            const wishlistItems = JSON.parse(sessionWishlist);
            console.log("Syncing wishlist...");
  
            const wishlistResponse = await addWishlistToUserAPI(
              userId,
              { wishlistData: wishlistItems },
              reqHeader
            );
            console.log(wishlistItems);
            
            if (wishlistResponse.status === 200) {
              console.log("Wishlist synced successfully.");
              sessionStorage.removeItem("wishlistItems"); // Remove wishlist from sessionStorage after syncing
            } else {
              console.warn("Wishlist sync incomplete or failed.");
            }
          } catch (wishlistError) {
            console.error("Wishlist sync error:", wishlistError);
          }
        }
  
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("role", response.data.user.role);
        navigate(response.data.user.role === "admin" ? "/admin" : "/");
      } else {
        toast.error("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      currentState === "login" ? handleLogin() : handleRegister();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <section className="absolute top-0 left-0 w-full z-50 bg-primary flexCenter h-full">
        <div className="flex w-full md:w-[80%] xl:w-[50%] md:bg-white md:shadow-lg rounded-lg overflow-hidden">
          <div className="w-1/2 hidden sm:block">
            <img src={loginImg} alt="Login" className="object-cover w-full h-full" />
          </div>

          <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-8 space-y-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
              {currentState === 'login' ? 'Login' : 'Sign Up'}
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              {currentState === "signup" && (
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Your Name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your Email"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-12 text-gray-600"
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-3 btn-secondary text-white font-semibold rounded-md focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : (currentState === "login" ? "Login" : "Sign Up")}
                </button>
              </div>
            </form>

            <div className="text-sm text-gray-600">
              {currentState === 'login' ? (
                <>
                  {/* <div className="mt-4 text-center">
                    <span
                      className="text-tertiary cursor-pointer hover:underline"
                      onClick={() => setCurrentState('forgot')}
                    >
                      Forgot Password?
                    </span>
                  </div> */}
                  <div className="mt-4 text-center">
                    <span>
                      Don't have an Account?
                      <span
                        className="text-tertiary cursor-pointer hover:underline ml-1"
                        onClick={() => setCurrentState('signup')}
                      >
                        Create Account
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="mt-4 text-center">
                  <span>
                    Already have an account?
                    <span
                      className="text-tertiary cursor-pointer hover:underline ml-1"
                      onClick={() => setCurrentState('login')}
                    >
                      Login
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
