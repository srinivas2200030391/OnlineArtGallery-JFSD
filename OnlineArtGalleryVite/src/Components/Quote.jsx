import React from "react";
import "./quote.css";
const Quote = () => {
  return (
    <div className="quote">
      <img 
        src="Ellipse 2358.png" 
        style={{
          width: "7%",
          height: "auto",
          borderRadius: "50%",
          objectFit: "fill"
        }}
      />
      <img src="Frame.png" />
      <p>
        <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>"</span> If you hear a voice within you saying, 'You are not a painter,' then by all means paint, boy, and that voice will be silenced.<span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>"</span>
      </p>
      <p className="name" style={{ fontSize: "15pt" }}>
        -Vincent van Gogh
      </p>
    </div>
  );
};

export default Quote;
