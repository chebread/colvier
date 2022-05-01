export const renderHTML = (content, target) => {
  target.innerHTML = '';
  target.insertAdjacentHTML('afterBegin', content);
};
