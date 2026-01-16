"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BasketPage() {

    const [basket, setBasket] = useState<any[]>([]);

    const total = basket.reduce((sum: number, item: any) => {
        return sum + item.price * item.quantity;
    }, 0);


    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
        setBasket(storedBasket);
    }, [])

    const removeFromBasket = (id: number) => {
        const updatedBasket = basket.filter(item => item.id !== id);
        setBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        window.dispatchEvent(new Event("basketUpdated")); //basketUpdated diye bir olay oldu
        toast.error("the product has been deleted!");
    }



    return (
        <div className="w-full  h-120 flex flex-col">
            <div className="flex flex-row border-b-2 bg-red-500 w-full h-10 text-white justify-between px-2 items-center font-semibold">
                <h1>Product</h1>
                <h1>Quantity</h1>
                <h1>Subtotal</h1>
            </div>
            <div className="flex flex-col w-fulljustify-between px-2">
                {
                    basket.map((b) => (
                        <div key={b.id} className="grid grid-cols-3 items-center border-b py-4">
                            <div className="flex gap-4 items-center flex-col lg:flex-row">
                                <Image
                                    src={b.image}
                                    alt={b.title}
                                    width={150}
                                    height={150}
                                    className="object-center object-contain"
                                />
                                <div className="flex flex-col gap-2">
                                    <h1 className="hidden lg:flex"> {b.title} </h1>
                                    <p>price: {b.price} </p>
                                    <Button onClick={() => removeFromBasket(b.id)} className="w-14 sm:w-24 md:w-32 lg:w-40 cursor-pointer hover:bg-red-500 text-xs sm:text-sm md:tex-lg">Remove</Button>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="font-semibold text-xl border-1 px-3 border-black rounded-md"> {b.quantity} </span>
                            </div>
                            <div className="text-right">
                                <span> {b.quantity * b.price} </span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col w-auto sm:w-40 gap-4 mt-4 ml-auto">
                <h1 className="font-semibold">Total: {total.toFixed(2)}$ </h1>
                <Button className="cursor-pointer hover:bg-blue-500"> <Link href="/checkout" >Proceed to checkout</Link> </Button>
            </div>
        </div>
    )
}
