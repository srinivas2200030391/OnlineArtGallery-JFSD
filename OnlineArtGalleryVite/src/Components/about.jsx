import React from "react";
const About = () => {
  return (
    <div className="about" id="about">
      <section className="started">
        <p style={{ color: "darkred", paddingTop: "11pt", fontSize: "30pt" }}>
          How It Started
        </p>

        <p style={{ paddingTop: "80pt" }} className="global">
          Bringing Art to the Digital World
        </p>
    <i>
          {" "}
          <p
            className="description"
            style={{
              paddingTop: "100pt",
              fontWeight: "normal",
              paddingBottom: "15pt",
            }}>
            " Welcome to our Online Art Gallery, where creativity meets technology. 
            Our passion lies in showcasing diverse artistic expressions and connecting 
            artists with art enthusiasts worldwide. We offer a curated selection of 
            paintings, sculptures, and digital art, emphasizing both established masters 
            and emerging talents. Our platform provides an immersive experience, allowing 
            you to explore, appreciate, and acquire art from the comfort of your home. 
            Join us in celebrating the power of art to inspire, provoke thought, and 
            transform spaces. Your journey into the world of art starts here. "
          </p>
        </i>
      </section>
      
      <section className="about2">
        <section className="section1" style={{ backgroundColor: "white",marginBottom:"-50% ",transform:"translateY(-1%)" }}>
          <img align="middle" src="Blogo.png" style={{transform:"translateY(-10%)", transform:"translateX(-8%)"}} />
        </section>
        <section className="section2">
          <div className="opaque">
            <i>
              <p>Trust</p>
            </i>
          </div>
          <div className="opaque1">
            {" "}
            <i>
              <p>Innovation</p>
            </i>
          </div>
          <div className="opaque2">
            {" "}
            <i>
              <p>Integrity</p>
            </i>
          </div>
          <div className="opaque3">
            {" "}
            <i>
              <p>Reliability</p>
            </i>
          </div>
        </section>
      </section>
    </div>
  );
};

export default About;
