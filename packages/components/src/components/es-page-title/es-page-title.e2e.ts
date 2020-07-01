import { newE2EPage } from '@stencil/core/testing';

describe('es-page-title', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<es-page-title></es-page-title>');
        const element = await page.find('es-page-title');
        expect(element).toHaveClass('hydrated');
    });
});
