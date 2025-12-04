import type { Product } from "@/types/Product";

export async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return new Array(10000).fill(null).map((index) => data.products[index % 100]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}