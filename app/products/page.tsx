import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const products = data.products;

    // console.log(products)

    return (
        <div>
            <div className="flex flex-col items-center text-center py-2">
                <h1 className="text-xl font-bold ">All Products</h1>
                <input type="text" placeholder="search product" className="border-2 w-50 sm:w-80 md:w-200px p-1 rounded-2xl outline-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <Card key={p.title} className="h-110 flex bg-gray-50 overflow-hidden">
                        <div className="items-center justify-center">
                            <div className="h-50 relative object-cover items-center overflow-hidden w-full aspect-[4/3]  ">
                                <Image
                                    src={p.images[0]}
                                    alt={p.title}
                                    fill
                                    className="object-center object-contain"
                                />
                            </div>
                            <CardContent className="border-t-2 p-4 flex flex-col text-center">
                                <CardTitle className="font-bold text-xl">
                                    {p.title}
                                </CardTitle>
                                <p className="text-sm line-clamp-2"> {p.description} </p>
                                <div className="flex flex-row justify-around mt-12">
                                    <p className="font-bold text-black "> {p.price}$ </p>
                                    <Button className="hover:bg-blue-500 transition-color duration-300"><Link href={`/products/${p.id}`}>View Details</Link></Button>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
