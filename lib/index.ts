import type { TransitionConfig, FadeParams, BlurParams } from 'svelte/transition'
import { linear, cubicInOut } from 'svelte/easing'

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

/**
 * @method Svelte blur transition
 * @param node node
 * @param param1 options
 * @returns transition config
 */
export const blur = (node: HTMLElement, {
    delay = 0,
    duration = 400,
    easing = cubicInOut,
    amount = 5,
    opacity = 0,
}: BlurParams = {}): TransitionConfig => {
    const style = getComputedStyle(node)
    const target_opacity = +style.opacity
    const f = style.filter === 'none' ? '' : style.filter

    const od = target_opacity * (1 - opacity)

    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * amount}px);`,
        tick: (_t, u) => {
            node.style.opacity = `${target_opacity - (od * u)}`
            node.style.filter = `${f} blur(${u * amount}px)`
        },
    }
}