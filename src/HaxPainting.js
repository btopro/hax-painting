import { html, css, LitElement } from 'lit';
import './HaxCanvas';
import './HaxColors';

export class HaxPainting extends LitElement {
  static get tag() {
    return 'hax-painting';
  }

  constructor() {
    super();
  }

  static get properties() {
    return {

    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) =>  {

    });
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
      }
    `;
  }

  render() {
    return html`
    <div class="container">
      <h3 class="pageTitle">Welcome to HAX Camp!</h3>
      <hax-canvas></hax-canvas>
      <hax-colors></hax-colors>
      <img src="../images/red-splat.png" alt="red image"/>
    </div>
    `;
  }
}

window.customElements.define(HaxPainting.tag, HaxPainting);