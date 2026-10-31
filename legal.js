/* Click a screenshot to see it full size, with its caption below; Escape or a click closes it. */
(function () {
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Screenshot, full size');
  var img = document.createElement('img');
  var cap = document.createElement('p');
  box.appendChild(img);
  box.appendChild(cap);
  document.body.appendChild(box);
  var last = null;
  function close() { box.classList.remove('open'); img.removeAttribute('src'); if (last) last.focus(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button.zoom');
    if (b) {
      var src = b.querySelector('img');
      last = b;
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      var fig = b.closest('figure');
      var fc = fig && fig.querySelector('figcaption');
      cap.textContent = fc ? fc.textContent : '';
      cap.hidden = !fc;
      box.classList.add('open');
      return;
    }
    if (box.classList.contains('open') && box.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
})();
