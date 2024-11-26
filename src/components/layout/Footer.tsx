import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-gray-700">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */} 
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Image 
            src="/logo/logo.png"
            alt="Botify Logo"
            width={40}
            height={40}
            className="h-[30px] w-[30px]"
          />
          <span className="text-xl font-semibold">Botify</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 mb-4 md:mb-0">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="mailto:support@botify.com"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Email"
          >
            <FiMail size={20} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-200 text-center py-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Botify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
