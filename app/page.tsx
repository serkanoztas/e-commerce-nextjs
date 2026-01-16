import { Button } from "@/components/ui/button";
import Image from "next/image";
import Carousel from "../components/carousel";
import Link from "next/link";

export default async function Home() {
  const response = await fetch("https://dummyjson.com/products?limit=5");
  const data = await response.json();
  const products = data.products;
  //console.log(products[0].images)


  return (
    <div>
      <section className="flex flex-row w-auto h-100 bg-gray-200 rounded-xl justify-around p-8 items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-md sm:text-lg md:text-xl font-bold">Welcome to my Ecommerce</h1>
          <p className="text-xs sm:text-sm md:text-md">Discover the latest products at the best prices</p>
          <Button size="sm"><Link href="/products">Browse All Products</Link></Button>
        </div>
        <div className="w-60 sm:w-60 md:w-80 lg:w-100 h-60 sm:h-60 md:h-80 lg:h-100 relative">
          <Image
            src={products[4].images[0]}
            alt={products[0].title}
            fill
            className="object-contain"
          />
        </div>
      </section>
      <section>
        <Carousel products={products} />
      </section>
    </div>
  );
}
