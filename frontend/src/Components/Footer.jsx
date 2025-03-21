import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-[#064848] text-[#81dede] w-full px-12 montserrat text-sm pt-16 pb-8 poppins">
      <div className="flex justify-between items-start gap-10">
        <div className='flex flex-col w-[32vw]'>
          <h3 className="text-2xl font-semibold mb-4 moonDance">TeleMedicine</h3>
          <p className="text-gray-400">
          ConferenceHub is a platform designed to streamline conference management, making it easy for attendees and speakers to connect, register, and engage seamlessly.
</p>
        </div>

        <div className='flex flex-col w-1/4 justify-center items-center'>
          <h3 className="text-2xl font-semibold mb-4 moonDance">Quick Links</h3>
          <ul className="space-y-2">
            <li><ScrollLink to="home" smooth={true} className="text-gray-400 hover:text-white transition duration-300">Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth={true} className="text-gray-400 hover:text-white transition duration-300">About Us</ScrollLink></li>
            <li><ScrollLink to="services" smooth={true} className="text-gray-400 hover:text-white transition duration-300">Services</ScrollLink></li>
            <li><ScrollLink to="contact" smooth={true} className="text-gray-400 hover:text-white transition duration-300">Contact</ScrollLink></li>
          </ul>
        </div>

        <div className='flex flex-col w-[26vw]'>
          <h3 className="text-2xl font-semibold mb-4 moonDance">Contact Us</h3>
          <p className="text-gray-400">Ahmedabad, Gujarat, India</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
          <p className="text-gray-400">Email: info@conferencehub.com</p>
        </div>

        <div className='flex flex-col w-1/4'>
          <h3 className="text-2xl font-semibold mb-4 moonDance">Stay Updated</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-50 opacity-90 outline-none text-gray-500 px-4 py-2 rounded-l"
            />
            <button
              type="submit"
              className="bg-[#327878] text-white px-4 py-2 rounded-r cursor-pointer hover:bg-[#406363] transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-500 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 sm:mb-0">
          © 2025 ConferenceHub. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;