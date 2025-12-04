import { ref, computed } from "vue";
import { fetchProducts } from "@/api/products";
import type { Product } from "@/types/Product";

export function useProducts() {
    const products = ref<Product[]>([]);
    const query = ref("");
    const error = ref<Error | null>(null);

    const isLoading = ref(false);

    async function loadProducts() {
        isLoading.value = true;
        error.value = null;

        try {
            products.value = await fetchProducts();
        } catch (err) {
            error.value = err instanceof Error ? err : new Error("An unknown error occurred");
        } finally {
            isLoading.value = false;
        }
    }

    const filtered = computed(() => {
        if (!query.value) return products.value;
        return products.value.filter((p) =>
            p.title.toLowerCase().includes(query.value.toLowerCase())
        );
    });

    return {
        products,
        filtered,
        query,
        isLoading,
        loadProducts,
        error,
    };
}
