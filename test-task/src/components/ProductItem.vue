<script setup lang="ts">
import type { Product } from "@/types/Product";

defineProps<{
  product: Product;
}>();

</script>

<template>
  <div class="item">
    <div class="images">
      <img :src="product.images[0]" :alt="product.title"/>
    </div>
    <div class="info">
      <p class="title">{{ product.title }}</p>
      <p class="description">{{ product.description }}</p>

      <div class="product-details">
        <span class="discount">Discount {{ product.discountPercentage }} %</span>
        <span class="brand">{{ product.brand }}</span>
      </div>

      <div class="product-details">
        <span class="price">$ {{ product.price }}</span>
        <span class="rating">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="">
            <defs>
              <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFECB3; stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFC107; stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFA000; stop-opacity:1" />
              </linearGradient>
            </defs>

            <path
                fill="url(#starGradient)"
                d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
            />
          </svg>
          {{ product.rating }}
        </span>
        <span class="category">{{ product.category }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.item {
  display: flex;
  height: 75px;
  box-sizing: border-box;

  p {
    margin: 0 0 8px 0;
    text-align: left;
    font-size: 12px;
  }

  .images {
    flex: 0 0 30%;
    padding-right: 14px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .info {
    width: 58%;
  }

  .title {
    font-weight: bold;
  }

  .description {
    width: 100%;
    color: #434343;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
  }

  .product-details {
    margin-bottom: 5px;
    display: flex;
    align-items: flex-end;

    span {
      padding-right: 14px;
      font-size: 12px;
      color: #338486;
      font-weight: bold;
    }

    .discount {
      color: #e01b1e;
      font-size: 10px;
      font-weight: bold;
    }

    .category {
      display: inline-block;
      padding: 3px 6px;
      font-size: 8px;
      color: #41964e;
      border-radius: 10px;
      background-color: #122a10;
    }
  }
}

</style>
