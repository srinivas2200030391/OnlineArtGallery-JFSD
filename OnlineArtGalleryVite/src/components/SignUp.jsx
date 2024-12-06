import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/style.css";
import axios from "axios";
import config from "../config";
import { gsap } from "gsap";
export default function SignUp() {
  const [formData, setFormData] = useState({
    email: location.state ? location.state.email : "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(`${config.baseURL}/signin`, formData);
      if (response) {
        console.log(response.data);
        const loc = "/" + response.data.role + "Dashboard";
        navigate(loc);
      } else {
        setMessage("Sign In Failed");
      }
    } catch (e) {
      setError(e.message);
      setMessage("");
    }
  };
  useEffect(() => {
    gsap.fromTo(
      ".image",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.inOut" }
    );
  }, []);
  useEffect(() => {
    gsap.fromTo(
      ".form",
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.inOut" }
    );
  }, []);

  const handleMouseMove = (event) => {
    const image = event.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left; // X-coordinate relative to image
    const y = event.clientY - rect.top; // Y-coordinate relative to image

    // Adjust tilt angle with a more complex pattern (cubic pattern)
    const tiltX = (y / rect.height - 0.5) * 50; // Increase sensitivity with 50
    const tiltY = (x / rect.width - 0.5) * -50; // Same here for more dramatic tilt

    gsap.to(image, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.5,
      ease: "cubic-bezier(0.25, 0.8, 0.25, 1)", // Smooth easing for more natural effect
    });
  };

  const handleMouseLeave = (event) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };
  return (
    <div className="signinpage bg-[#eee8e8] h-screen">
      <div
        className="image hidden md:block w-[31%] mt-[30pt]"
        role="img"
        tabIndex="0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleMouseMove(e);
          }
        }}>
        <img src="img/SignIn.png" alt="Photo" className="rounded-md" />
      </div>
      <div className="form bg-white w-[90%] md:w-[70%] lg:w-[43%] lg:mr-[10%] rounded-[20pt] p-[29pt] h-[89%] translate-y-[-2]">
        <h3 className="text-[30pt] font-bold font-sans-serif mt-[-5%]  !text-black special-font">
          <b>S</b>i<b>g</b>
          <b>n</b> <b>u</b>
          <b>p</b>
        </h3>
        <br />
        <Link
          className="forgot mt-[10pt] text-center text-[15pt] font-bold font-sans-serif text-black decoration-none border-[1px] border-black rounded-[5pt] p-[8pt] transform translate-x-[-0%] w-[100%]"
          to="/s">
          📱Sign In with Mobile
        </Link>
        <br />
        <br />
        <p className="mt-[-10pt] text-center text-[15pt] font-sans-serif text-black decoration-none  rounded-[5pt] p-[8pt] transform translate-x-[-4%] w-[110%]">
          ------------------------------------- or
          ------------------------------------
        </p>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <p className="pt-[8] text-left text-[15pt] font-sans-serif translate-x-2">
              Email
            </p>
            <input
              type="text"
              id="email"
              className="border-[1px] border-black p-[12pt] translate-x-[-11px] h-[3rem] rounded-[5pt]"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <p
              style={{
                paddingTop: "8pt",
                textAlign: "left",
                fontSize: "15pt",
                fontFamily: "sans-serif",
                transform: "translateX(1%)",
              }}>
              Password
            </p>
            <input
              type="password"
              id="password"
              className="inputpassword"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                border: "1px solid black",
                borderRadius: "5pt",
                padding: "12pt",
                transform: "translateX(-11px)",
                height: "3rem",
              }}
            />
            <br />
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "13pt",
                marginTop: "15pt",
                left: "50%",
                paddingLeft: "65%",
                fontFamily: "sans-serif",
                // move it to right
                transform: "translateX(0%)",
              }}>
              Forgot Password?
            </Link>
            <br />
            <input
              type="submit"
              value="Sign Up ➜"
              style={{
                marginTop: "15pt",
                padding: "10pt",
                fontSize: "12pt",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                border: "0.5px solid black",
                borderRadius: "15pt",
                transform: "translateX(-2%)",
                backgroundColor: "#D6C9C9",
              }}
            />
            <br />
          </form>
          <p
            align="center"
            style={{
              marginBottom: "-20pt",
              paddingTop: "10pt",
              fontSize: "14pt",
              transform: "translateX(0%)",
              fontStyle: "sans-serif",
            }}>
            Already have an account?
            <a
              href="signin"
              style={{
                paddingLeft: "5pt",
                color: "#FF4500",
                textDecoration: "none",
                fontSize: "14pt",
              }}>
              Sign In
            </a>
            {message ? (
              <h3
                align="center"
                style={{
                  transform: "translateX(0%)",
                }}>
                {message}
              </h3>
            ) : (
              <h3
                align="center"
                style={{
                  transform: "translateX(0%)",
                }}>
                {error}
              </h3>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
