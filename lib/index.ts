import type { TransitionConfig } from 'svelte/transition'
import {
    blur as sBlur,
    draw as sDraw,
    fade as sFade,
    fly as sFly,
    scale as sScale,
    slide as sSlide,
 } from 'svelte/transition'

/**
 * @method: Convert a svelte transition into a form that works for custom elements
 */
export function forCustomElement<TElement extends ElementCSSInlineStyle & Element, TParams>(original: (node: TElement, params: TParams) => TransitionConfig): (node: TElement, params: TParams) => TransitionConfig {
    return (node: TElement, params: TParams) => {
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
export const scale = forCustomElement(sScale)
export const slide = forCustomElement(sSlide)
export const draw = forCustomElement(sDraw)
