// google-reviews.js — Widget avis Google (généré automatiquement)
// Appelle l'edge function site-google-reviews avec ?domain={hostname} (§0.14 guide v3).
(function () {
  var DOMAIN = window.location.hostname || "platrier-plaquiste-rillieuxlapape69.fr";
  var ENDPOINT = 'https://slcksfqbsbcmvqupbhox.supabase.co/functions/v1/site-google-reviews?domain=' + encodeURIComponent(DOMAIN);

  function $(s) { return document.querySelector(s); }

  function render(data) {
    var rating = data && data.rating ? data.rating : null;
    var count = data && data.reviews_count ? data.reviews_count : 0;
    var summaryEl = $('#reviews-summary');
    var ratingEl = $('#reviews-rating');
    var countEl = $('#reviews-count');
    var carEl = $('#reviews-carousel');
    if (ratingEl && rating) ratingEl.textContent = rating.toFixed(1) + '/5';
    if (countEl) countEl.textContent = count + ' avis Google';
    if (summaryEl && rating) summaryEl.style.opacity = '1';
    if (carEl && Array.isArray(data && data.reviews)) {
      carEl.innerHTML = data.reviews.slice(0, 6).map(function (r) {
        return '<div class="testimonial">' +
          '<div class="testimonial-stars">' + '★'.repeat(r.rating || 5) + '</div>' +
          '<p class="testimonial-text">' + (r.text || '').slice(0, 280) + '</p>' +
          '<div class="testimonial-author"><div class="testimonial-avatar">' +
          (r.author_name || 'A').charAt(0) + '</div><div><div class="testimonial-name">' +
          (r.author_name || 'Anonyme') + '</div><div class="testimonial-source">Avis Google</div></div></div>' +
          '</div>';
      }).join('');
    }
  }

  fetch(ENDPOINT)
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) { if (data) render(data); })
    .catch(function () { /* silent */ });
})();
