import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto font-sans">
      {/* Top Section: Newsletter & Socials */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-white text-lg font-bold mb-2">
                Join the Lumina Community
              </h3>
              <p className="text-gray-400 text-sm">
                Get 10% off your first order when you sign up.
              </p>
            </div>

            <div className="flex-1 w-full max-w-md">
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all text-sm placeholder-gray-500"
                />
                <button className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-md font-medium text-sm transition-colors whitespace-nowrap">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-icons text-brand-500">local_mall</span>
              <span className="text-xl font-bold text-white tracking-tight">
                Lumina
              </span>
            </div>
            <p className="text-sm leading-6 text-gray-400 mb-6">
              Curating the finest lifestyle products for the modern individual.
              Quality, aesthetics, and speed delivered to your doorstep.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all"
              >
                <span className="material-icons text-base">facebook</span>
              </a>

              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all"
              >
                <span className="material-icons text-base">
                  alternate_email
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-white font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h4 className="text-white font-bold mb-6">Help & Support</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-brand-500 transition-colors">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-500 transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-500 transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-500 transition-colors">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-500 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="material-icons text-brand-500 text-lg mt-0.5">
                  location_on
                </span>
                <span>Addis Abeba, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-brand-500 text-lg">
                  phone
                </span>
                <span>+251 900 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-brand-500 text-lg">
                  email
                </span>
                <span>support@lumina.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Lumina Shop Inc. All rights
              reserved.
            </p>

            {/* Payment Methods (Visual Representation) */}
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold font-serif">
                VISA
              </div>
              <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold">
                Amex
              </div>
              <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold italic">
                PayPal
              </div>
              <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold">
                MasterCard
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
