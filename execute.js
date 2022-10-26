// this code will be executed when the extension's button is clicked
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
var extractRootDomain = function (url) {
  return url
    .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]
    .split('.')
    .slice(-2)
    .join('.');
};

(function () {
  const title = document.title;
  const url = window.location.toString();
  copy({
    html: `<a href="${url}">${title} (${extractRootDomain(url)})</a>`,
    plain: `"${title}" ${url}`,
  });
})();
