import { newSpecPage } from '@stencil/core/testing';
import { SsFormInput } from '../ss-form-input';

describe('ss-form-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SsFormInput],
      html: `<ss-form-input></ss-form-input>`,
    });
    expect(page.root).toEqualHtml(`
      <ss-form-input>
        <mock:shadow-root>
          <label></label>
          <input type=text></input>
        </mock:shadow-root>
      </ss-form-input>
    `);
  });
});
