<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useProducts } from "@/composables/useProducts";
import ProductList from "@/components/ProductList.vue";

const { filtered, query, isLoading, loadProducts } = useProducts();

const inputRef = ref<HTMLInputElement | null>(null);
const isBlinking = ref(false);
const caretLeftPos = ref(0);

const caretStyle = computed(() => ({
  left: `${caretLeftPos.value}px`,
}));

const measureTextWidth = (inputText: string, inputElement: HTMLInputElement): number => {
  const measurer = document.getElementById('text-width-measurer') as HTMLElement;
  if (!measurer) return 0;

  const computedStyle = window.getComputedStyle(inputElement);
  measurer.style.fontSize = computedStyle.fontSize;
  measurer.style.fontFamily = computedStyle.fontFamily;
  measurer.style.padding = computedStyle.padding;

  measurer.textContent = inputText;

  return measurer.offsetWidth;
};


const updateCaretPosition = () => {
  if (inputRef.value) {
    const input = inputRef.value;
    const currentText = input.value.substring(0, input.selectionStart || 0);

    const width: number = measureTextWidth(currentText, input);

    caretLeftPos.value = width;
  }
};

const handleInput = () => {
  updateCaretPosition();
};

const handleFocus = () => {
  isBlinking.value = true;
  updateCaretPosition();
};

const handleBlur = () => {
  isBlinking.value = false;
};

onMounted(() => {
  updateCaretPosition();
});

onMounted(loadProducts);
</script>

<template>
  <div class="page">

    <div class="input-container">
      <input
          autocomplete="off"
          name="search"
          type="text"
          v-model="query"
          class="search"
          ref="inputRef"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
      />

      <div
          ref="caretRef"
          class="faux-caret"
          :class="{ 'is-blinking': isBlinking }"
          :style="caretStyle"
      ></div>
    </div>

    <div id="text-width-measurer" class="text-measurer"></div>


    <div class="loading" v-if="isLoading">Завантаження...</div>

    <ProductList v-else :items-props="filtered" />
  </div>
</template>

<style scoped>
.page {
  width: 400px;
  display: flex;
  flex-direction: column;
  height: max-content;

  .search {
    padding: 14px;
    margin-bottom: 16px;
    border: none;
    border-radius: 14px;
    font-size: 33px;
    caret-color: transparent;

    &:focus {
      outline: none;
      border: none;
    }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 390px;
    border-radius: 14px;
    background-color: white;
  }
}

.input-container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.faux-caret {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 50%;
  background-color: #000;
  border-radius: 2px;
  pointer-events: none;
  transition: transform 0.05s linear, left 0.05s linear;
  margin-left: -15px;
  transform: translateY(-50%) translateY(-9px);
}

.is-blinking {
  animation: blink 1s step-end infinite;
}

.text-measurer {
  position: absolute;
  visibility: hidden;
  height: auto;
  width: auto;
  white-space: pre;
  top: -9999px;
  left: -9999px;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
</style>
