import { Selector } from 'testcafe'

fixture `A Test`
    .page `http://localhost:5000`

test('testing', async t => {
    const title = Selector('header h1')
    await t.expect(title.exists).ok()

    const fade = Selector('fade-example').shadowRoot()

    await t.click(fade.find('button'))
    await t.expect(fade.find('h2').exists).ok()

    const transitioning: number[] = []
    while (await fade.find('h2').exists) {
        const opacity = parseFloat((await fade.find('h2').style)['opacity'])
        
        if (0 < opacity && opacity < 1)
            transitioning.push(opacity)
        
        await t.wait(50)
    }

    await t.expect(transitioning.length).gt(0, 'The transition did not occur')
})
