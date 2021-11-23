(function checkIE() {
  if (/MSIE|Trident/.test(window.navigator.userAgent)) {
    window.location.replace('/IE.html');
  }
})();
