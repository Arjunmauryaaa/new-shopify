/**
 * Mobile sticky buy bar: shown once the shopper scrolls past the hero
 * (marked by [data-af-hero-anchor], rendered just after the main product
 * section), and kept in sync with whichever variant is currently selected
 * in the main product form via Dawn's `variant-change` pub/sub event.
 */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var bar = document.querySelector('[data-af-sticky-bar]');
    if (!bar) return;

    var priceEl = bar.querySelector('[data-af-sticky-price]');
    var variantInput = bar.querySelector('[data-af-sticky-variant-input]');
    var button = bar.querySelector('[data-af-sticky-button]');
    var buttonText = button ? button.querySelector('span') : null;

    if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
      subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
        var variant = event.data && event.data.variant;
        var html = event.data && event.data.html;
        var sectionId = event.data && event.data.sectionId;

        if (priceEl && html && sectionId) {
          var sourcePrice = html.getElementById('price-' + sectionId);
          if (sourcePrice) priceEl.innerHTML = sourcePrice.innerHTML;
        }

        if (!variant) {
          if (variantInput) variantInput.setAttribute('disabled', 'disabled');
          if (button) button.setAttribute('disabled', 'disabled');
          if (buttonText && window.variantStrings) buttonText.textContent = window.variantStrings.unavailable;
          return;
        }

        if (variantInput) {
          variantInput.value = variant.id;
          variantInput.removeAttribute('disabled');
        }

        if (button) {
          if (variant.available) {
            button.removeAttribute('disabled');
            if (buttonText && window.variantStrings) buttonText.textContent = window.variantStrings.addToCart;
          } else {
            button.setAttribute('disabled', 'disabled');
            if (buttonText && window.variantStrings) buttonText.textContent = window.variantStrings.soldOut;
          }
        }
      });
    }

    var heroAnchor = document.querySelector('[data-af-hero-anchor]');
    if (heroAnchor && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          var entry = entries[0];
          var pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          bar.hidden = false;
          bar.classList.toggle('af-sticky-bar--visible', pastHero);
        },
        { threshold: 0 }
      );
      observer.observe(heroAnchor);
    }
  });
})();
