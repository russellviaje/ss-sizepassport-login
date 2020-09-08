import { Component, Host, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'ss-form-input',
  styleUrl: 'ss-form-input.css',
  shadow: true,
})
export class SsFormInput {
  @Prop() initialValue: string;
  @Prop() inputName: string;
  @Prop() placeHolder: string;
  @Prop() type: string = 'text';
  @Prop() ssInputChange = (inpValue: string):string => inpValue;
  @State() private inputValue: string = '';
  @State() private labelClass: string = '';

  private handleChange(event: UIEvent) {
    const val = (event.target as HTMLInputElement).value;
    this.labelClass = val.length ? 'text-entered' : '';
  };

  render() {

    return (
      <Host>
        <label 
          htmlFor={this.inputName}
          class={this.labelClass}
        >
          {this.placeHolder}
        </label>
        <input
          type={this.type}
          name={this.inputName}
          value={this.inputValue}
          onFocus = {() => {this.labelClass = 'input-focused'}}
          onBlur={(event: UIEvent) => this.handleChange(event)}
          onChange={(event: UIEvent) => (this.ssInputChange((event.target as HTMLInputElement).value))}
        ></input>
      </Host>
    );
  }

}
