import { newE2EPage } from '@stencil/core/testing';

describe('ss-form-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ss-form-input></ss-form-input>');

    const element = await page.find('ss-form-input');
    expect(element).toHaveClass('hydrated');
  });
});
