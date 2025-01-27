import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaSnapchat } from "react-icons/fa";

export const Footer = () => (
  <footer className="bg-[#D2691E] text-white h-16 flex items-center">
    <div className="container flex items-center flex-wrap justify-between px-4 md:px-6">
      <Link href="/" className="text-lg font-bold text-white" prefetch={false}>
        Khyal Store
      </Link>
      <div className="flex items-center space-x-4">
        <nav className="flex items-center flex-wrap space-x-4 text-sm mr-4">
          <Link href="/about" className="hover:underline text-white">
            About
          </Link>
          <Link href="/contact" className="hover:underline text-white">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline text-white">
            Terms of Service
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link
            href="https://wa.me/+966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/khyal.store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.snapchat.com/add/khyal.store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Snapchat"
          >
            <FaSnapchat className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
