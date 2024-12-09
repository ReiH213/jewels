import JewelsCarousel from "@/components/JewelsCarousel";

export default async function Home() {
  let result: JewelItem[] = [];
  try {
    const response = await fetch("https://jewelsback.onrender.com/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      result = await response.json();
    } else {
      console.error(
        `Failed to fetch items: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
  return (
    <main className="w-full flex flex-col items-center h-screen overflow-x-hidden ">
      <section className="flex flex-col h-64 gap-y-10 items-center w-screen justify-center colorGradient animatedGradient">
        <h1 className="text-6xl font-bold text-yellow-800">
          KUTEZ Jewelery Store
        </h1>
        <h2 className="font-semibold text-xl text-yellow-600">
          Welcome to you own jewelery box
        </h2>
      </section>
      <h1 className="mt-10 text-4xl font-extrabold text-gray-400">
        Take a look at our most popular products
      </h1>
      <JewelsCarousel items={result} />
    </main>
  );
}
