import './reset.css';
import './app.css';
import './components/header.css';
import './components/content.css';
import logoImg from './imgs/logo.png';
import { renderHTML } from './components/renderHTML.js';

const app = () => {
  const render = () => {
    const contentMsg = `
      <header class="header">
        <div class="header-wrapper">
          <div class="header-title">
            <a href="/"><img src="${logoImg}" /></a>
          </div>
        </div>
      </header>
      <div class="content">
        <div class="content-wrapper">
          ${['R', 'G', 'B']
            .map(
              (item, key) =>
                `<div class="content-items" id="${item}"><input value="" placeholder="${item}" tabindex="${
                  key + 1
                }" type="text" maxlength="3" /></div>`
            )
            .join('')}
        </div>
        <div class="content-wrapper2">
          <div class="content-items2">
            <div class="content-viewer-name" id="viewer-name"></div>
          </div>
          <div class="content-items2">
            <div class="content-viewer-color" id="viewer-color"></div>
          </div>
        </div>
      </div>
    `;
    renderHTML(contentMsg, document.querySelector('#root'));
    document.querySelectorAll('.content-items').forEach(item => {
      item.addEventListener('change', e => {
        if (
          isNaN(e.target.value) === false &&
          e.target.value >= 0 &&
          e.target.value <= 255
        ) {
          // console.log(Number(e.target.value));
          e.target.attributes.value.value = e.target.value;
          if (
            (document.querySelector('#R').attributes.class.ownerElement
              .childNodes[0].attributes.value.value ===
              '') ===
              false &&
            (document.querySelector('#G').attributes.class.ownerElement
              .childNodes[0].attributes.value.value ===
              '') ===
              false &&
            (document.querySelector('#B').attributes.class.ownerElement
              .childNodes[0].attributes.value.value ===
              '') ===
              false
          ) {
            // for viewer-name: rgb name change (renderHTML used)
            renderHTML(
              `rgb(${
                document.querySelector('#R').attributes.class.ownerElement
                  .childNodes[0].attributes.value.value
              }, ${
                document.querySelector('#G').attributes.class.ownerElement
                  .childNodes[0].attributes.value.value
              }, ${
                document.querySelector('#B').attributes.class.ownerElement
                  .childNodes[0].attributes.value.value
              })`,
              document.querySelector('#viewer-name')
            );
            // for viewer-color: color change (style used)
            document.querySelector(
              '#viewer-color'
            ).style = `background-color: rgb(${
              document.querySelector('#R').attributes.class.ownerElement
                .childNodes[0].attributes.value.value
            }, ${
              document.querySelector('#G').attributes.class.ownerElement
                .childNodes[0].attributes.value.value
            }, ${
              document.querySelector('#B').attributes.class.ownerElement
                .childNodes[0].attributes.value.value
            })`;
          }
        } else {
          e.target.value = '';
          e.target.placeholder =
            'Enter a positive number less than or equal to 255';
          document.querySelector('#viewer-name').innerHTML = ``;
          document.querySelector('#viewer-color').style = '';
        }
      });
    });
  };
  render();
};
app();
