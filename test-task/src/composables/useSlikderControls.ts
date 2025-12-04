import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';

export function useSliderControls(sliderElementRef: Ref<HTMLElement | null>) {
    const sliderValue = ref(0);

    const updateSliderValue = (event: PointerEvent) => {
        event.stopPropagation();
        const slider = sliderElementRef.value;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const newValue: number = ((event.clientX - rect.left) / rect.width) * 100;

        sliderValue.value = Math.max(0, Math.min(100, newValue));
    };

    const handlePointerDown = (event: PointerEvent) => {
        event.stopPropagation();

        (event.target as HTMLElement).setPointerCapture(event.pointerId);

        updateSliderValue(event);

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handlePointerMove = (event: PointerEvent) => {
        updateSliderValue(event);
    };

    const handlePointerUp = (event: PointerEvent) => {
        (event.target as HTMLElement).releasePointerCapture(event.pointerId);

        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
    };

    watchEffect(() => {
        const slider = sliderElementRef.value;
        if (slider) {
            slider.addEventListener('pointerdown', handlePointerDown);
        }

        return () => {
            if (slider) {
                slider.removeEventListener('pointerdown', handlePointerDown);
            }
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    });

    return { sliderValue };
}