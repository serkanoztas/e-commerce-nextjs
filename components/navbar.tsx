"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBasket3 } from "react-icons/bs";
import { BsFillBasket3Fill } from "react-icons/bs";

export default function Navbar() {
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const updateProductCount = () => {
            const basket = JSON.parse(localStorage.getItem("basket") || "[]");
            const totalQuantity = basket.reduce(
                (sum: number, item: any) => sum + item.quantity, 0
            );

            setProductCount(totalQuantity);
        };
        updateProductCount();

        window.addEventListener("basketUpdated", updateProductCount);

        return () => {
            window.removeEventListener("basketUpdated", updateProductCount);
        };


    }, [])

    return (
        <nav className="flex flex-row justify-between border-b-2 w-full h-12 items-center px-6">
            <div>
                <Link className="hover:text-blue-500" href="/">My Ecommerce</Link>
            </div>
            <div className="hidden md:flex gap-4">
                <Link className="hover:text-blue-500" href="/" >Home</Link>
                <Link className="hover:text-blue-500" href="/products" >Products</Link>
                <Link className="hover:text-blue-500" href="/checkout" >Checkout</Link>
            </div>
            <div>
                <Link className="hover:text-blue-500 relative items-center" href="/basket" > <BsFillBasket3Fill size={35} /> <span className="absolute right-0 top-3 text-white border-none rounded-2xl bg-blue-500 text-md font-semibold px-1"> {productCount} </span> </Link>
            </div>
        </nav>
    )
}
