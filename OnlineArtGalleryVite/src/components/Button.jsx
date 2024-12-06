import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin"); // Navigate to the Sign-In page
  };

  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      onClick={handleClick}>
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
}
