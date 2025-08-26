import React, { useState } from "react";
import loginlogo from "../../Assets/Netflix-removebg-preview.png";
import "./login.css";
import { login, signUp, getUserRole } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signState, setsign] = useState("Sign In");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [admin, setadmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (signState === "Sign Up" && !name) {
      setError("Please enter your name");
      setLoading(false);
      return;
    }

    try {
      if (signState === "Sign In") {
        const usercredential = await login(email, password);
        const uid = usercredential.user.uid;
        const role = await getUserRole(uid);

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/home");
        } else {
          setError("User role not found. Please contact support.");
        }
      } else {
        if (admin) {
          await signUp(name, email, password, "admin");
          alert("Admin account created successfully!");
          navigate("/admin");
        } else {
          await signUp(name, email, password, "user");
          alert("User account created successfully!");
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <img src={loginlogo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>
          {signState} {admin ? "as Admin" : ""}
        </h1>

        <form>
          {/* Only show name input on Sign Up */}
          {signState === "Sign In" || (
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Your Name"
            />
          )}

          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="Email"
            placeholder="Your Email"
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Your Password"
          />

          <button
            style={{ fontSize: "14px" }}
            onClick={user_auth}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : `${signState} ${admin ? "as Admin" : ""}`}
          </button>

          {/* Toggle admin sign-up */}
          {signState === "Sign Up" && !admin && (
            <button
              style={{ fontSize: "14px", marginTop: "10px" }}
              type="button"
              onClick={() => setadmin(true)}
            >
              Create Account as Admin
            </button>
          )}

          {/* Back to normal user sign-up */}
          {signState === "Sign Up" && admin && (
            <button
              style={{ fontSize: "14px", marginTop: "10px" }}
              type="button"
              onClick={() => setadmin(false)}
            >
              Back to User Sign Up
            </button>
          )}
        </form>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginTop: "10px" }}
          >
            {error}
          </div>
        )}

        <div className="help">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
        </div>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setsign("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => {
                  setsign("Sign In");
                  setadmin(false); // reset admin mode
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
