import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold">Information Collection</h2>
            <p>
              At Khyal Store, we collect personal information that you voluntarily provide when 
              making a purchase, creating an account, or subscribing to our newsletter.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-4">Data Usage</h2>
            <p>
              We use your personal information to process orders, provide customer support, 
              and send promotional communications about our products and services.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-4">Data Protection</h2>
            <p>
              We implement industry-standard security measures to protect your personal 
              information from unauthorized access, disclosure, or alteration.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. 
              Contact our support team for any privacy-related requests.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}