import { TransitionConfig, EasingFunction } from 'svelte/transition'
import { cubicOut } from 'svelte/easing'

export type SpinParams = {
    delay?: number,
    duration?: number,
    easing?: EasingFunction,
    rotations?: number,
}

export const spin = (node: HTMLElement, {
    delay = 0,
    duration = 800,
    easing = cubicOut,
    rotations = 3,
}: SpinParams = {}): TransitionConfig => {
    const totalAngle = rotations * 360
    const o = +getComputedStyle(node).opacity

    return {
        delay,
        duration,
        easing,
        css: t => `
            opacity: ${t * o};
            transform: rotate(${t * totalAngle}deg);
        `,
    }
}