import React from "react";
import { Facebook, Twitter, Youtube, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom"; // For React Router

export default function SiteFooter() {
  return (
    <footer className="bg-black text-white px-20">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold">
              HERCULES <span className="text-primary">GYM</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore dolore magna aliqua endisse
              ultrices gravida lorem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/trainers" className="text-gray-400 hover:text-white">
                 Trainers
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white">
                  Planning
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tips & Guides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tips & Guides</h3>
            <div className="space-y-4">
              <article>
                <Link
                  to="/tips/physical-fitness-depression"
                  className="group"
                >
                  <h4 className="text-sm font-medium text-gray-400 group-hover:text-white">
                    Physical fitness may help prevent depression, anxiety
                  </h4>
                </Link>
              </article>
              <article>
                <Link to="/tips/best-exercise-belly-fat" className="group">
                  <h4 className="text-sm font-medium text-gray-400 group-hover:text-white">
                    Fitness: The best exercise to lose belly fat and tone up...
                  </h4>
                </Link>
              </article>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            Copyright ©2024 All rights reserved | Aadarsh Bikram Shah
          </p>
        </div>
      </div>
    </footer>
  );
}
