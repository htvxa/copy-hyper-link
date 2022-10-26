function copy({ html, plain }) {
  const listener = (event) => {
    event.clipboardData.setData('text/html', html);
    event.clipboardData.setData('text/plain', plain);
    event.preventDefault();
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}

const extractRootDomain = function (url) {
  return url
    .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)[1]
    .split('.')
    .slice(-2)
    .join('.');
};

function showPopup(id, fullTitle) {
  if (!document.getElementById(id)) {
    document.body.appendChild(createElement('div', { id: id }, fullTitle));
  }
  const element = document.getElementById(id);
  element.className = 'show';
  setTimeout(function () {
    element.className = element.className.replace('show', '');
  }, 3000);
}

function createElement(element, attribute, inner) {
  if (typeof element === 'undefined') {
    return false;
  }
  if (typeof inner === 'undefined') {
    inner = '';
  }
  const el = document.createElement(element);
  if (typeof attribute === 'object') {
    for (const key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }
  if (!Array.isArray(inner)) {
    inner = [inner];
  }
  for (let k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(document.createTextNode(inner[k]));
    }
  }
  return el;
}

(function () {
  const title = document.title;
  const url = window.location.toString();
  const fullTitle = `${title} (${extractRootDomain(url)})`;
  const id = 'popup-notification';
  copy({
    html: `<a href="${url}">${fullTitle}</a>`,
    plain: `"${title}" ${url}`,
  });
  showPopup(id, fullTitle);
})();
