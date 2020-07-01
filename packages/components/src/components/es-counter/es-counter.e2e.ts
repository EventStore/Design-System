import { newE2EPage } from '@stencil/core/testing';

describe('es-counter', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<es-counter></es-counter>');
        const element = await page.find('es-counter');
        expect(element).toHaveClass('hydrated');
    });
});
