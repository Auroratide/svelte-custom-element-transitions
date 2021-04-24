import { Selector } from 'testcafe'
import * as math from 'mathjs'

fixture `Verify @auroratide/svelte-custom-element-transitions`
    .page `http://localhost:5000`

const POLL_INTERVAL = 50 // milliseconds

type StyleList = { [prop: string]: string }

class TransitioningComponent {
    private name: string
    private component: Selector
    private transitioningValues: (style: StyleList) => number[]

    constructor(name: string, transitioningValues: (style: StyleList) => number[]) {
        this.name = name
        this.component = Selector(name).shadowRoot()
        this.transitioningValues = transitioningValues
    }

    private get title(): Selector {
        return this.component.find('h2.transition')
    }

    private get trigger(): Selector {
        return this.component.find('button')
    }
    
    async verify(t: TestController): Promise<void> {
        await t.expect(this.title.exists).ok()
        await t.click(this.trigger)

        let valuesOverTime: number[][] = []
        let node: NodeSnapshot = await this.title()
        while (node) {
            valuesOverTime.push(this.transitioningValues(node.style))
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
})

test('Custom Transitions', async t => {
    await t.expect(Selector('header h1').exists).ok()

    await new TransitioningComponent('custom-example', (style: StyleList) => {
        const match = style['transform'].match(/matrix\((.*?)\)/)
        if (match) {
            const [a, b, c, d, _tx, _ty] = match[1].split(',').map(n => parseFloat(n))
            return [a, b, c, d]
        } else {
            return [0, 0, 0, 0]
        }
    }).verify(t)
})
