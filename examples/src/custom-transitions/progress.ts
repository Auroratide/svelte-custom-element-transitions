import { TransitionConfig, EasingFunction } from 'svelte/transition'
import { quadInOut } from 'svelte/easing'

export type ProgressParams = {
    delay?: number,
    duration?: number,
    easing?: EasingFunction,
    fromColor?: number[],
    toColor?: number[],
}

export const progress = (node: HTMLElement, {
    delay = 0,
    duration = 800,
    easing = quadInOut,
    fromColor = [0, 0, 0],
    toColor = [0, 0, 0],
}: ProgressParams = {}): TransitionConfig => {
    const fr = fromColor
    const to = toColor

    const v = (t: number, i: number) => t * (to[i] - fr[i]) + fr[i]

    return {
        delay,
        duration,
        easing,
        css: t => `color: rgba(${v(t, 0)}, ${v(t, 1)}, ${v(t, 2)}, 1)`,
        tick: t => {
            (node as HTMLProgressElement).value = t
        }
    }
}