import { Component, h, Prop } from '@stencil/core';
import { default as Login } from '../../services/loginService';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @Prop() mailPlaceHolder: string = 'Email';
  @Prop() passwordPlaceHolder: string = 'Password';

  private email: string;
  private password: string;

  private doLogin (event) {
    event.preventDefault();
    Login.atteptLogin({ email: this.email, password: this.password });
  }

  render() {

    return (
      <section class="app-home">
        <h3>Registered Customer</h3>
        <form autocomplete="on" method="POST" novalidate="">
          <div class="input-group">
            <ss-form-input
              initialValue={this.email}
              placeHolder={this.mailPlaceHolder}
              ssInputChange={(inpVal: string): string => this.email = inpVal}
              inputName="email"
            />
          </div>
          <div class="input-group">
            <ss-form-input
              initialValue=""
              type="password"
              placeHolder={this.passwordPlaceHolder}
              ssInputChange={(inpVal: string): string => this.password = inpVal}
              inputName="password"
            />
          </div>
          <div class="forgot-password">
            <stencil-route-link url="/forgotpassword">
              Forgot password
            </stencil-route-link>
          </div>
          <div class="button-container">
            <button 
            class="primary login"
            onClick={e => this.doLogin(e)}
            >
              login
            </button>
          </div>
        </form>
      </section>
    );
  }
}
