import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FaWhatsapp, FaInstagram, FaSnapchat } from "react-icons/fa";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Khyal Store</h1>
        <div className="space-y-4">
          <p>
            Khyal Store is your premier destination for high-quality cosmetics,
            skincare, and hair care products. Our mission is to help you look
            and feel your best by providing carefully curated, innovative beauty
            solutions.
          </p>
          <p>
            Founded with a passion for beauty and wellness, we believe in
            offering products that not only enhance your appearance but also
            nourish and protect your skin and hair.
          </p>
          <h2 className="text-2xl font-semibold mt-4">Our Commitment</h2>
          <ul className="list-disc list-inside">
            <li>Carefully selected, high-quality products</li>
            <li>Cruelty-free and ethical sourcing</li>
            <li>Expert advice and personalized recommendations</li>
            <li>Sustainable and responsible beauty</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Social Contact</h2>
          <div className="flex space-x-4 items-center">
            <Link
              href="https://wa.me/+966XXXXXXXXX"
              target="_blank"
              className="text-green-500 hover:text-green-600 transition-colors"
            >
              <FaWhatsapp size={32} />
            </Link>
            <Link
              href="https://www.instagram.com/khyal.store"
              target="_blank"
              className="text-pink-500 hover:text-pink-600 transition-colors"
            >
              <FaInstagram size={32} />
            </Link>
            <Link
              href="https://www.snapchat.com/add/khyal.store"
              target="_blank"
              className="text-yellow-500 hover:text-yellow-600 transition-colors"
            >
              <FaSnapchat size={32} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
