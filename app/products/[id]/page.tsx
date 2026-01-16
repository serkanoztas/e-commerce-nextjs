import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductDetailsClientPage from "./ProductDetailsClientPage";

interface ProductIdProps {
    params: {
        id: string;
    };
};


export default async function ProductDetailsPage({ params }: ProductIdProps) {


    const { id } = await params;
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const p = await res.json();

   return <ProductDetailsClientPage p={p}  />

   
}
