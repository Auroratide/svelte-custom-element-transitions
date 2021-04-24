import type { TransitionConfig } from 'svelte/transition'
import {
    fade as sFade,
    blur as sBlur,
    fly as sFly,
 } from 'svelte/transition'

/**
 * @method: Convert a svelte transition into a form that works for custom elements
 */
export function forCustomElement<T>(original: (node: HTMLElement, params: T) => TransitionConfig): (node: HTMLElement, params: T) => TransitionConfig {
    return (node: HTMLElement, params: T) => {
        const o = original(node, params)
        const config: TransitionConfig = {...o}
        config.tick = (t: number, u: number) => {
            if (o.tick) o.tick(t, u)
            const css = o.css ? o.css(t, u) : ''
            node.style.cssText += css
        }

        return config
    }
}

export const fade = forCustomElement(sFade)
export const blur = forCustomElement(sBlur)
export const fly = forCustomElement(sFly)
