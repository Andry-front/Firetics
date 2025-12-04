<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onUnmounted, watch } from 'vue';
import ProductItem from "./ProductItem.vue";
import { useSliderControls } from "@/composables/useSlikderControls";
import type { Product } from "@/types/Product";

const props = defineProps<{
  itemsProps: Product[];
}>();

const ITEM_HEIGHT = 95;
const BUFFER_ITEMS = 15;
const items = ref<Product[]>([]);

const THUMB_HEIGHT = 130;

watchEffect(() => {
  if (props.itemsProps) {
    items.value = [...props.itemsProps];
  }
});

const scrollContainer = ref<HTMLElement | null>(null);
const sliderElement = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const containerHeight = ref(350);

const { sliderValue } = useSliderControls(sliderElement);

const totalHeight = computed(() => items.value.length * ITEM_HEIGHT);

const handleScroll = (event: Event) => {
  scrollTop.value = (event.target as HTMLElement).scrollTop;
}

const visibleItems = computed(() => {
  const startIndex = Math.floor(scrollTop.value / ITEM_HEIGHT);
  const startIndexWithBuffer = Math.max(0, startIndex - BUFFER_ITEMS);

  const itemsInView = Math.ceil(containerHeight.value / ITEM_HEIGHT);
  const totalVisible = itemsInView + (BUFFER_ITEMS * 2);

  const slicedItems = items.value.slice(startIndexWithBuffer, startIndexWithBuffer + totalVisible);

  return slicedItems.map((item, index) => ({
    ...item,
    top: (startIndexWithBuffer + index) * ITEM_HEIGHT
  }))
});

const offsetTop = computed(() => visibleItems.value[0]?.top || 0);

const showCustomScrollbar = computed(() => totalHeight.value > containerHeight.value);

const thumbStyle = computed(() => {
  if (!showCustomScrollbar.value) return {};

  const scrollRange = totalHeight.value - containerHeight.value;
  const thumbTrackHeight = containerHeight.value - THUMB_HEIGHT;

  const scrollPercentage = scrollTop.value / scrollRange;

  const thumbTop = scrollPercentage * thumbTrackHeight;

  return {
    height: `${THUMB_HEIGHT}px`,
    transform: `translateY(${thumbTop}px)`
  };
});

let resizeObserver: ResizeObserver | null = null;
onMounted(() => {
  if (scrollContainer.value) {
    containerHeight.value = scrollContainer.value.clientHeight;
    resizeObserver = new ResizeObserver(entries => {
      if (entries.length > 0) {
        containerHeight.value = entries[0]?.contentRect.height || 0;
      }
    });
    resizeObserver.observe(scrollContainer.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

watch(sliderValue, (newValue) => {
  if (!scrollContainer.value) return;

  const maxScrollTop = totalHeight.value - containerHeight.value;

  const newScrollTop = (newValue / 100) * maxScrollTop;

  scrollContainer.value.scrollTo({
    top: newScrollTop,
    behavior: 'smooth'
  });
});
</script>

<template>
  <div class="wrapper">
    <div
        ref="scrollContainer"
        class="item-wrapper virtual-list-container"
        @scroll="handleScroll"
    >
      <div class="list-spacer"
           :style="{ height: totalHeight + 'px' }"
      >
        <div
            class="visible-items-wrapper"
            :style="{ transform: `translateY(${offsetTop}px)` }"
        >
          <ProductItem
              v-for="product in visibleItems"
              :key="product.id"
              :product="product"
              :style="{ height: ITEM_HEIGHT + 'px' }"
          />

        </div>
      </div>

      <div class="no-results" v-if="props.itemsProps.length === 0">Результатів не знайдено</div>
    </div>

    <div
        ref="sliderElement"
        class="scrollbar-wrapper"
    >
      <div

          v-if="showCustomScrollbar"
          class="custom-scrollbar-track"
      >
        <div
            class="custom-scrollbar-thumb"
            :style="thumbStyle"
        ></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  height: 390px;
  border-radius: 14px;
  background: white;
}

.item-wrapper {
  position: relative;
  padding: 14px 14px 0;
  max-height: 376px;
  background-color: white;
  overflow-y: scroll;
  flex-grow: 1;
  border-radius: 14px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.item-wrapper::-webkit-scrollbar {
  display: none;
}

.list-spacer, .visible-items-wrapper {
  position: relative;
}

.visible-items-wrapper {
  position: absolute;
  top: 0; left: 0; right: 0;
}

.scrollbar-wrapper {
  display: flex;
  justify-content: end;
  position: absolute;
  top: 0; bottom: 0; right: 0;
}

.custom-scrollbar-track {
  position: relative;
  margin: 20px 5px;
  width: 5px;
  height: 350px;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  touch-action: none;
}

.custom-scrollbar-thumb {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #b1d9db;
  border-radius: 10px;
  cursor: grab;
  transition: left 0.1s ease-out, transform 0.1s ease-out;
}

.no-results {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
