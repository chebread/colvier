import './reset.css';
import './app.css';
import logoImg from './imgs/logo.png';

const root = document.querySelector('#root');
document.title = 'colvier';
const render = () => {
  root.innerHTML = `
    <header class="header">
      <div class="header-wrapper">
        <div class="header-title">
          <a href="/"><img src="${logoImg}"/></a>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="container-select">
        <button id="select" value="rgb">RGB</button>
        <button id="select" value="hash">Hash</button>
      </div>
      <div class="container-content"></div>
    </div>
    <footer class="footer">
    </footer>
  `;
  document.querySelectorAll('#select').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.value === 'rgb') {
        document.querySelector('.container-content').innerHTML = `
          <input type="number"/>
        `;
      } else {
        document.querySelector('.container-content').innerHTML = `hellojh`;
      }
    });
  });
};
render();
