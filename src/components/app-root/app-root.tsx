import { Component, h } from '@stencil/core';

@Component({
  tag: 'ss-login',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <main>
          <app-home></app-home>
        </main>
      </div>
    );
  }
}
