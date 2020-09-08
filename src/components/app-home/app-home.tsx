import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @Prop() email: string;
  @Prop() password: string;

  render() {
    const mailPlaceHolder: string = 'Email';
    const passwordPlaceHolder: string = 'Password';
    const emailInputName: string = 'email';
    let email: string = this.email || '';

    return (
      <section class="app-home">
        <h3>Registered Customer</h3>
        <form autocomplete="on" method="POST" novalidate="">
          <div class="input-group">
            <ss-form-input
              initialValue={email}
              placeHolder={mailPlaceHolder}
              ssInputChange={(inpVal: string): string => email = inpVal}
              inputName={emailInputName}
            />
          </div>
          <div class="input-group">
            <ss-form-input
              initialValue=""
              type="password"
              placeHolder={passwordPlaceHolder}
              ssInputChange={(inpVal: string): string => this.password = inpVal}
              inputName={emailInputName}
            />
          </div>
          <div class="forgot-password">
            <stencil-route-link url="/forgotpassword">
              Forgot password
            </stencil-route-link>
          </div>
          <div class="button-container">
            <button class="primary login">login</button>
          </div>
        </form>
      </section>
    );
  }
}
