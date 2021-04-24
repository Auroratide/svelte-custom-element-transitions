import type { TransitionConfig, FadeParams } from 'svelte/transition'
import { linear } from 'svelte/easing'

/**
 * @method: Convert a svelte transition into a form that works for custom elements
 */
export const forCustomElement = () => {}

/**
 * @method Svelte fade transition
 * @param node node
 * @param param1 options
 * @returns transition config
 */
export const fade = (node: HTMLElement, {
    delay = 0,
    duration = 400,
    easing = linear,
}: FadeParams = {}): TransitionConfig => {
    const o = +getComputedStyle(node).opacity

    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`,
        tick: t => {
            node.style.opacity = `${t * o}`
        },
    }
}
