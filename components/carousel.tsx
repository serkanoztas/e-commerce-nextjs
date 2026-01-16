"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
    products: any[];
}

export default function Carousel({ products }: Props) {

    const [currency, setCurrency] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrency((prev) => (prev + 1) % products.length);
        }, 3000)
        return () => clearInterval(interval);
    }, [products.length])

    const currentProduct = products[currency];
    const currentprice = currentProduct.price;
    //console.log(products[0]);

    return (
        <Card className="relative rounded-lg shadow-md border-gray-300 mt-2 flex flex-row justify-around items-end">
            {currentProduct.images && currentProduct.images[0] && (
                <div className=" flex w-60 sm:w-60 md:w-80 lg:w-100 h-60 sm:h-60 md:h-80 lg:h-100 relative">
                    <Image
                        src={currentProduct.images[0]}
                        alt={currentProduct.title}
                        fill
                        className="object-contain transition-opacity duration-500 ease-in-out"
                    />
                </div>
            )}
            <CardContent className=" flex flex-col">
                <CardTitle className="text-black text-md sm:text-lg md:text-xl ">
                    {currentProduct.title}
                </CardTitle>
                <p className="text-black text-md sm:text-lg md:text-xl "> {currentProduct.price}$ </p>
            </CardContent>
        </Card>
    )
}
