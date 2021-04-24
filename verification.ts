import { Selector } from 'testcafe'

fixture `Verify @auroratide/svelte-custom-element-transitions`
    .page `http://localhost:5000`

const POLL_INTERVAL = 50 // milliseconds

type StyleList = { [prop: string]: string }

class TransitioningComponent {
    private name: string
    private component: Selector
    private isTransitioning: (style: StyleList) => boolean

    constructor(name: string, isTransitioning: (style: StyleList) => boolean) {
        this.name = name
        this.component = Selector(name).shadowRoot()
        this.isTransitioning = isTransitioning
    }

    private get title(): Selector {
        return this.component.find('h2')
    }

    private get trigger(): Selector {
        return this.component.find('button')
    }

    private async style(): Promise<StyleList> {
        return await this.title.style
    }
    
    async verify(t: TestController): Promise<void> {
        await t.expect(this.title.exists).ok()
        await t.click(this.trigger)

        const transitioning: boolean[] = []
        while (await this.title.exists) {
            transitioning.push(this.isTransitioning(await this.style()))
            await t.wait(POLL_INTERVAL)
        }

        await t.expect(transitioning.some(v => v)).ok(`The transition for ${this.name} did not occur`)
    }
}

test('Transitions', async t => {
    const title = Selector('header h1')
    await t.expect(title.exists).ok()

    await new TransitioningComponent('fade-example', (style: StyleList) => {
        const opacity = parseFloat(style['opacity'])
        return 0 < opacity && opacity < 1
    }).verify(t)

    await new TransitioningComponent('blur-example', (style: StyleList) => {
        const blurMatch = style['filter'].match(/blur\((.*?)\)/)
        let blurFactor = 0
        if (blurMatch) {
            blurFactor = parseFloat(blurMatch[1])
        }

        return 0 < blurFactor && blurFactor < 5
    }).verify(t)
})
