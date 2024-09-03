import Card from "./components/Card";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-start px-4 py-8 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="w-full text-center text-4xl font-bold my-4">
          Welcome to ImageGenie
        </h1>
        <p className="w-full text-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Generate stunning images with the power of AI.
        </p>
      </div>

      <div className="mt-8 mb-16 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <Card
          href="/image-generation"
          title="Image Generation"
          description="Discover the powerful features of ImageGenie."
        />
        <Card
          href="/pricing"
          title="Pricing"
          description="Choose a plan that suits your needs."
        />
        <Card
          href="/contact"
          title="Contact Us"
          description="Get in touch with our team for any queries."
        />
      </div>
    </main>
  );
}
