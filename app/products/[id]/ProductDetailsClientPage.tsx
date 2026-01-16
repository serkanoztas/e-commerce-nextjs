"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetailsClientPage({ p }: { p: any }) {

    const [count, setCount] = useState(0);

    const addToBasket = () => {
        if (count === 0) {
            toast.error("please select the quantity!");
            return;
        };
        const basket = JSON.parse(localStorage.getItem("basket") || "[]");
        const existingProduct = basket.find((item: any) => item.id == p.id);

        if (existingProduct) {
            existingProduct.quantity += count;
        }
        else {
            basket.push({
                id: p.id,
                title: p.title,
                price: p.price,
                image: p.images[0],
                quantity: count
            })
        }

        localStorage.setItem("basket", JSON.stringify(basket));
        window.dispatchEvent(new Event("basketUpdated"));
        toast.success("The product has been added to the cart 🛒");

        setCount(0);
    }

    return (
        <div>
            <Card key={p.title} className="h-180 flex bg-gray-50 overflow-hidden">
                <div className="flex flex-col justify-between ">
                    <div className="h-50 md:h-80 lg:h-100 relative object-cover items-center overflow-hidden w-full justify-center  ">
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
                        <p className="text-sm"> {p.description} </p>
                        <div className="flex flex-row justify-around mt-4 md:mt-12">
                            <p className="font-bold text-black text-md md:text-lg lg:text-xl">Price: {p.price}$ </p>
                        </div>
                        <div className="my-4">
                            <Button size="icon-sm" className="hover:bg-red-500 transition-color duration-300 m-2 cursor-pointer" onClick={() => setCount(c => Math.max(0, c - 1))}><span className="text-xl">-</span></Button>
                            <span className="text-xl mx-8"> {count} </span>
                            <Button size="icon-sm" className="hover:bg-blue-500 transition-color duration-300 m-2 cursor-pointer" onClick={() => setCount(c => c + 1)}><span className="text-xl">+</span></Button>
                        </div>
                        <div>
                            <Button onClick={addToBasket} className="hover:bg-blue-500 transition-colors duration-300 cursor-pointer">Add To Basket</Button>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}
