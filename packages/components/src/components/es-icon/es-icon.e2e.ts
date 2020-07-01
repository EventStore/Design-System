import { newE2EPage } from '@stencil/core/testing';

describe('es-icon', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<es-icon></es-icon>');
        const element = await page.find('es-icon');
        expect(element).toHaveClass('hydrated');
    });
});
