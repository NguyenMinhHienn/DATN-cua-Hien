import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function ClientFooter() {
    return (
        <footer className="bg-black text-white py-10">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Exclusive Section */}
            <div>
              <Link to={'#'}><h3 className="font-bold text-lg">Exclusive</h3></Link>
              <p className="mt-4 mb-4">Subscribe</p>
              <p className="text-gray-400">Get 10% off your first order</p>
              <div className="mt-3 flex items-center border border-gray-400 p-2 rounded-md">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent outline-none flex-1 text-sm"
                />
                <button className="ml-2">
                  <FaArrowRight className="w-5 h-5"/>             
                </button>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="font-bold text-lg">Support</h3>
              <div className=" mt-4">
                <p className="text-gray-400">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                <p className="text-gray-400 mt-2">exclusive@gmail.com</p>
                <p className="text-gray-400 mt-2">+88015-88888-9999</p>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <h3 className="font-bold text-lg">Account</h3>
              <ul className="text-gray-400">
                <Link to={'#'}><li>My Account</li></Link>
                <li>Login / Register</li>
                <li>Cart</li>
                <li>Wishlist</li>
                <li>Shop</li>
              </ul>
            </div>

            {/* Quick Link Section */}
            <div>
              <h3 className="font-bold text-lg">Quick Link</h3>
              <ul className="text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms Of Use</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Download App Section */}
            <div>
              <h3 className="font-bold text-lg">Download App</h3>
                <p className="text-gray-400">Save $3 with App New User Only</p>
                <div className="flex">
                  <div className="mt-2">
                    <img src="src/assets/QR_fe2.png" alt="QR Code" className="w-20" />
                  </div>
                  <div className="grid grid-col mt-2 px-4">
                    <img src="src/assets/logo_foter.png" alt="Google Play" className="w-24" />
                    <img src="src/assets/logo_foter2.png" alt="App Store" className="w-24" />
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <FaFacebookF className="text-gray-400 hover:text-white" />
                    <FaTwitter className="text-gray-400 hover:text-white" />
                    <FaInstagram className="text-gray-400 hover:text-white" />
                    <FaLinkedinIn className="text-gray-400 hover:text-white" />
                </div>

            </div>
          </div>
      
          {/* Copyright */}
          <div className="text-center text-gray-500 mt-12">
            © Copyright Rimel 2022. All rights reserved
          </div>
        </footer>
  );
}

export default ClientFooter