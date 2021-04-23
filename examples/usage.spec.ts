import { Selector } from 'testcafe'

fixture `A Test`
    .page `http://localhost:5000`

test('testing', async t => {
    const text = Selector(() => document.querySelector('my-app').shadowRoot.querySelector('h1'))

    await t.expect(text.innerText).eql('Hello world!')
})
