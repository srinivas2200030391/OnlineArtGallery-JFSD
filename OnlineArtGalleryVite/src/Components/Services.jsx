import React from "react";
import "./quote.css";
const Services = () => {
  return (
    <div className="services" id="service">
      <p align="center" style={{ fontSize: "35pt" }}>
        Some of the Paintings provided by us
      </p>
      <ul className="oneul">
        <li>
          <img src="Rectangle 14405.png" style={{width:"300px",height:"200px"}}/>
          <p align="center">Paintings</p>
        </li>
        <li>
          <img src="Rectangle 14406.png"style={{width:"300px",height:"200px"}}/>
          <p align="center">Photography</p>
        </li>
        <li>
          <img src="Rectangle 14407.png" style={{width:"300px",height:"200px"}}/>
          <p align="center">Sculptures</p>
        </li>
      </ul>
      <ul className="twoul">
        <li>
          <img src="Rectangle 14408.png" style={{width:"300px",height:"200px"}}/>
          <p align="center">Cultural</p>
        </li>
        <li>
          <img src="Rectangle 14409.png" style={{width:"300px",height:"200px"}}/>
          <p align="center">Digital Art</p>
        </li>
        <li>
          <img src="Rectangle 14410.png" style={{width:"300px",height:"200px"}}/>
          <p align="center">Portraits</p>
        </li>
      </ul>
    </div>
  );
};

export default Services;
