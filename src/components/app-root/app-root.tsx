import { Component, h, Prop, Method, State } from '@stencil/core';

@Component({
  tag: 'ss-login',
  styleUrl: 'app-root.css',
  shadow: true,
})


export class AppRoot {

@Prop() mailPlaceHolder: string = 'Email';
@Prop() passwordPlaceHolder: string = 'Password';
@State() appReady: boolean = false;
@State() dataError: boolean = false;
private sessionURL;
private clientID;
private customerAuthURL;

@Method()
  async init(sessionData):Promise<any> {
    const { sessionURL, clientID, customerAuthURL } = sessionData;
    if(sessionURL && clientID && customerAuthURL ){
      this.sessionURL = sessionURL;
      this.clientID = clientID;
      this.customerAuthURL = customerAuthURL;
      this.appReady = true;
    }
  }

  render() {
    return (
      <div>
        <main>
          { 
            (() => {
              if(this.appReady) {
                return (
                  <app-home
                  mailPlaceHolder = {this.mailPlaceHolder}
                  passwordPlaceHolder = {this.passwordPlaceHolder}
                  sessionURL = {this.sessionURL}
                  customerAuthURL = {this.customerAuthURL}
                  clientID = {this.clientID}
                  >
                  </app-home>
                )
              } else if (this.dataError) {
                return (
                  <div> something went wrong, please try again </div>
                )
              } else {
                return (
                  <div> Loading... </div>
                )
              }
            })()
          }
        </main>
      </div>
    );
  }
}
