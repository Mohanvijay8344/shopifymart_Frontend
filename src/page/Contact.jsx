import React from "react";
import image from '../assets/bg-registration-form-7.jpg'

export default function Contact() {
  return (
    <div
      className="flex items-center min-h-screen bg-cover bg-no-repeat  "  
    >
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 border-4 p-20 shadow-lg m-10 ">
        <form>
          <h3 className="text-4xl font-bold text-center uppercase mb-4">
            Contact Us
          </h3>
          <p className="text-center mb-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <div className="relative mb-12">
          
            <input
              type="text"
              className="w-full h-10 text-base bg-transparent border-b-2 border-[#00ade6] focus:outline-none focus:border-white"
              required
              placeholder="Your Name..."
            />
            
            <span className="block absolute w-full h-0.5 bg-white transform scale-x-0 transition-transform"></span>
          </div>
          <div className="relative mb-12">
        
            <input
              type="text"
              className="w-full h-10 text-base bg-transparent border-b-2 border-[#00ade6] focus:outline-none focus:border-white"
              required
              placeholder="Your Mail..."
            />
            
            <span className="block absolute w-full h-0.5 bg-white transform scale-x-0 transition-transform"></span>
          </div>
          <div className="relative mb-12">
            <textarea
              className="w-full h-24 text-base bg-transparent border-b-2 border-[#00ade6] focus:outline-none focus:border-white resize-none"
              required
              placeholder="Your Message..."
            ></textarea>
            
            <span className="block absolute w-full h-0.5 bg-white transform scale-x-0 transition-transform"></span>
          </div>
          <button className="relative w-40 h-12 mx-auto mt-14 flex items-center justify-center border-2  text-white uppercase transition-colors hover:border-transparent hover:bg-[#2098D1] hover:text-white">
            Submit{" "}
            <i className="ml-2 transition-transform transform-gpu hover:translate-x-1">
              →
            </i>
          </button>
        </form>
      </div>
    </div>
  );
}
