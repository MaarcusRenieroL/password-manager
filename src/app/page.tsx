import { HeroSection } from "~/components/landing-page/hero-section";
import { FeaturesSection } from "~/components/landing-page/features-section";
import { LoginBanner } from "~/components/landing-page/login-banner";
import { Footer } from "~/components/landing-page/footer";
import { Navbar } from "~/components/landing-page/navbar";

export default function PasswordManagerLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <LoginBanner />
      </main>
      <Footer />
    </div>
  )
}