import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { default as Login } from '../../services/loginService';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @Prop() mailPlaceHolder: string;
  @Prop() passwordPlaceHolder: string;
  @Prop() sessionURL: string;
  @Prop() customerAuthURL: string;
  @Prop() clientID: string;
  @Event({
    eventName: 'ssLogin:success',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) loginSuccess: EventEmitter<AppHome>;

  private email: string;
  private password: string;

  private doLogin (event) {
    event.preventDefault();
    Login.atteptLogin({ 
      email: this.email,
      password: this.password,
      sessionURL: this.sessionURL,
      customerAuthURL: this.customerAuthURL,
      clientID: this.clientID
    })
    .then( (response) => {
      this.loginSuccess.emit(response); 
      console.debug(`service success:: ${response}`)
    })
    .catch((response) => {
      console.debug(`service error:: ${response}`)
    });
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
