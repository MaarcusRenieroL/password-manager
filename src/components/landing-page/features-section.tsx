import { Lock, RefreshCw, Smartphone } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      id="#features"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Why Choose SecurePass?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Lock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-bold">Unbreakable Encryption</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Your data is protected with AES-256 encryption, the gold standard
              in security.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <RefreshCw className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-bold">Auto-Sync Across Devices</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Access your passwords on all your devices with real-time
              synchronization.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Smartphone className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-bold">Mobile-Friendly</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Seamless experience on your smartphone with our mobile app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
