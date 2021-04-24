import { Selector } from 'testcafe'
import * as math from 'mathjs'

fixture `Verify @auroratide/svelte-custom-element-transitions`
    .page `http://localhost:5000`

const POLL_INTERVAL = 50 // milliseconds

type StyleList = { [prop: string]: string }
type VerificationEnding = (node: NodeSnapshot) => boolean

const outAnimation: VerificationEnding = (node: NodeSnapshot) => node ? true : false
const inAnimation: VerificationEnding = (node: NodeSnapshot) => node.style['animation-name'] !== 'none'

class TransitioningComponent {
    private name: string
    private component: Selector
    private transitioningValues: (style: StyleList, node: NodeSnapshot) => number[]

    constructor(name: string, transitioningValues: (style: StyleList, node: NodeSnapshot) => number[]) {
        this.name = name
        this.component = Selector(name).shadowRoot()
        this.transitioningValues = transitioningValues
    }

    private get title(): Selector {
        return this.component.find('.transition')
    }

    private get trigger(): Selector {
        return this.component.find('button')
    }
    
    async verify(t: TestController, ending: VerificationEnding = outAnimation): Promise<void> {
        await t.click(this.trigger)
        
        let valuesOverTime: number[][] = []
        let node: NodeSnapshot = await this.title()
        while (ending(node)) {
            valuesOverTime.push(this.transitioningValues(node.style, node))
            await t.wait(POLL_INTERVAL)
            node = await this.title.with({timeout: 1})()
        }

        await t.expect(this.transitioned(valuesOverTime)).ok(`The transition for ${this.name} did not occur`)
    }

    private transitioned(valuesOverTime: number[][]): boolean {
        return math.transpose(valuesOverTime)
            .map(values => math.variance(values) as number)
            .every(variance => variance !== 0)
    }
}

test('Svelte Transitions', async t => {
    await t.expect(Selector('header h1').exists).ok()

    await new TransitioningComponent('fade-example', (style: StyleList) => {
        return [parseFloat(style['opacity'] ?? '0')]
    }).verify(t)

    await new TransitioningComponent('blur-example', (style: StyleList) => {
        const match = style['filter'].match(/blur\((.*?)\)/)
        return [match ? parseFloat(match[1]) : 0]
    }).verify(t)

    await new TransitioningComponent('fly-example', (style: StyleList) => {
        const match = style['transform'].match(/matrix\((.*?)\)/)
        if (match) {
            const [_a, _b, _c, _d, tx, ty] = match[1].split(',').map(n => parseFloat(n))
            return [tx, ty]
        } else {
            return [0, 0]
        }
    }).verify(t)

    await new TransitioningComponent('scale-example', (style: StyleList) => {
        const match = style['transform'].match(/matrix\((.*?)\)/)
        if (match) {
            const [a, _b, _c, d, _tx, _ty] = match[1].split(',').map(n => parseFloat(n))
            return [a, d]
        } else {
            return [0, 0]
        }
    }).verify(t)

    await new TransitioningComponent('slide-example', (style: StyleList) => {
        return [parseFloat(style['height'] ?? '0')]
    }).verify(t)

    await new TransitioningComponent('draw-example', (style: StyleList) => {
        return (style['stroke-dasharray'] ?? '0 0').split(' ').map(n => parseFloat(n))
    }).verify(t)
})

test('Custom Transitions', async t => {
    await t.expect(Selector('header h1').exists).ok()

    await new TransitioningComponent('basic-example', (style: StyleList) => {
        const match = style['transform'].match(/matrix\((.*?)\)/)
        if (match) {
            const [a, b, c, d, _tx, _ty] = match[1].split(',').map(n => parseFloat(n))
            return [a, b, c, d]
        } else {
            return [0, 0, 0, 0]
        }
    }).verify(t)

    // Out
    await new TransitioningComponent('in-and-out-example', (style: StyleList) => {
        return [parseFloat(style['opacity'] ?? '0')]
    }).verify(t)

    // In
    await new TransitioningComponent('in-and-out-example', (style: StyleList) => {
        const match = style['transform'].match(/matrix\((.*?)\)/)
        if (match) {
            const [a, b, c, d, _tx, _ty] = match[1].split(',').map(n => parseFloat(n))
            return [a, b, c, d]
        } else {
            return [0, 0, 0, 0]
        }
    }).verify(t, inAnimation)

    await new TransitioningComponent('tick-example', (style: StyleList, node: NodeSnapshot) => {
        const match = style['color'].match(/rgb\((.*?)\)/)
        if (match) {
            const [r, g, b, _a] = match[1].split(',').map(n => parseFloat(n))
            return [r, g, b, parseFloat(node.value)]
        } else {
            return [0, 0, 0, 0]
        }
    }).verify(t)
})
