import { html, css, LitElement } from 'lit';

export class HaxCanvas extends LitElement {
  static get tag() {
    return 'hax-canvas';
  }

  constructor() {
    super();
    this.title = '';
    this.clicked = false;
    this.color = "";
    this.xCoor = 0;
    this.yCoor = 0;
    this.pictureX = 0;
    this.pictureY = 0;
    this.clickLocationX = 0;
    this.clickLocationY = 0;
  }

  static get properties() {
    return {
      title: { type: String },
      clicked: { type: Boolean },
      //selected color
      color: { type: String },
      //mouse coordinates on click
      xCoor: { type: Number },
      yCoor: { type: Number },
      //hax picture size on click
      pictureX: { type: Number },
      pictureY: { type: Number },
      //ratio for positioning of new color image
      clickLocationX: { type: Number },
      clickLocationY: { type: Number },
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) =>  {
      if (propName === 'clicked' && this[propName]) {
        console.log('clicked');

        //checks a color is selected first
        if (this.parentElement.querySelector('hax-colors').attributes.length > 0) {
          //gets the color that is selected
          let colorSelected = this.parentElement.querySelector('hax-colors').attributes[0].nodeName;

          //sets name we'll use for color
          if (colorSelected === 'redselected') {
            this.color = 'red';
          } else if (colorSelected === 'blueselected') {
            this.color = 'blue';
          } else if (colorSelected === 'greenselected') {
            this.color = 'green';
          } else if (colorSelected === 'orangeselected') {
            this.color = 'orange';
          }
  
          console.log(this.color);
  
          console.log(`x: ${this.xCoor}`);
  
          console.log(`y: ${this.yCoor}`);
  
          //get picture element
          let picture = this.shadowRoot.querySelector('.haxImg');
  
          //get height and width of image on user's device
          this.pictureX = picture.clientWidth;
          this.pictureY = picture.clientHeight;
  
          console.log(`pictureX: ${this.pictureX}`);
          console.log(`pictureY: ${this.pictureY}`);

          //makes a ratio of where the click location was relative to the size of the image
          this.clickLocationX = this.xCoor / this.pictureX;
          this.clickLocationY = this.yCoor / this.pictureY;

          console.log(`click loc x: ${this.clickLocationX}`);
          console.log(`click loc y: ${this.clickLocationY}`);

          //creates color image based on the color selected
          //each image uses the click location ratios to postion picture in the right spot
          if (this.color === 'red') {
            this.addColor(this.color, this.clickLocationX, this.clickLocationY);

            //create color image
            let newRedSplat = `<img class="splat" src="https://i.postimg.cc/wBrsfHCF/red-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newRedSplat;

            // let redSplat = this.shadowRoot.querySelector('.redTest');
            // redSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // redSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          } else if (this.color === 'blue') {
            //create color image
            let newBlueSplat = `<img class="splat" src="https://i.postimg.cc/4xJtnWvv/blue-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newBlueSplat;

            // let blueSplat = this.shadowRoot.querySelector('.blueTest');
            // blueSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // blueSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          } else if (this.color === 'green') {
            //create color image
            let newGreenSplat = `<img class="splat" src="https://i.postimg.cc/2S2WWnTs/green-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newGreenSplat;

            // let greenSplat = this.shadowRoot.querySelector('.greenTest');
            // greenSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // greenSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          } else if (this.color === 'orange') {
            //create color image
            let newOrangeSplat = `<img class="splat" src="https://i.postimg.cc/G2sT6VrR/orange-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newOrangeSplat;

            // let orangeSplat = this.shadowRoot.querySelector('.orangeTest');
            // orangeSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // orangeSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          }
        }

        //resets click
        this.clicked = false;
        
      }
    });
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  addColor(color, xCoorRatio, yCoorRatio) {
    fetch(`../api/addColor?color=${color}&xCoorRatio=${xCoorRatio}&yCoorRatio=${yCoorRatio}`).then(res => res.json()).then((data) => {
      console.log('fetch ran');
    });
  }

  pictureAreaClicked(event) {
    //sets clicked
    this.clicked = true;

    //gets coordinates of mouse inside haxImg at the click
    let rect = event.target.getBoundingClientRect();
    this.xCoor = event.clientX - rect.left;
    this.yCoor = event.clientY - rect.top;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: auto;
      }

      .pictureArea {
        display: flex;
        justify-content: center;
        height: auto;
      }

      .splat {
        height: 100px;
        width: 100px;
        position: absolute;
        z-index: -1;
      }

      .haxImg {
        border: 1px dashed black;
        width: 95%;
        z-index: 1;
      }

    `;
  }

  //website with all images hosted https://postimg.cc/gallery/4fYBTXB/a1a34154

  render() {
    return html`
    <div class="pictureArea">
      <!--area where color images are added to-->
      <div class="colorsArea"></div>
      <img class="haxImg" src="https://i.postimg.cc/tJQnbkCx/hax-camp-pic-2022.png" @click="${this.pictureAreaClicked}">
    </div>
    `;
  }
}

window.customElements.define(HaxCanvas.tag, HaxCanvas);