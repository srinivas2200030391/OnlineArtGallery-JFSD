import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiBrush } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
const navItems = ["Home", "About", "Features", "Story", "Contact"];
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
export default function NavBar() {
  const [isAudioPlaying, SetIsAudioPlaying] = React.useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const barsRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { y: currentScrollY } = useWindowScroll();
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");

    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");

    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    SetIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = -85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Sign In"
              rightIcon={<TiBrush />}
              containerClass="bg-blue-50 md:w-full md:max-w-xs w-full max-w-md mx-auto flex items-center justify-center gap-1"
            />
          </div>

          {/*PC Menu */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={
                    item.toLowerCase() === "home"
                      ? "#"
                      : `#${item.toLowerCase()}`
                  }
                  className="nav-hover-btn"
                  onClick={(e) => handleLinkClick(e, `#${item.toLowerCase()}`)}>
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5 "
              onClick={toggleAudioIndicator}>
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  ref={barsRef}
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
