import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold">Product Purchases</h2>
            <p>
              By purchasing products from Khyal Store, you agree to our terms and conditions. 
              All sales are final, except for products covered by our return policy.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-4">Returns and Exchanges</h2>
            <p>
              Unopened and unused products can be returned within 30 days of purchase. 
              Shipping costs for returns are the responsibility of the customer.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-4">Product Information</h2>
            <p>
              We strive to provide accurate product descriptions and images. However, 
              colors may vary slightly due to monitor settings.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-4">User Accounts</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their account 
              and password. Notify us immediately of any unauthorized use.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}