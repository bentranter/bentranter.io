(function() {
  "use strict";
  /*
   * For Google Analytics, you need this:
   * <body>
   * <script>_gaq.push(['_trackPageview']);</script>
   *  ...the rest of the body here...
   * </body>
   * See https://coderwall.com/p/ypzfdw/faster-page-loads-with-turbolinks for
   * more info.
   */

   /*
    * By default, Turbolinks submits forms normally. While this may feel
    * frustrating as a consumer of the library, it makes sense:
    *   - No specialized logic on the backend
    *   - Cache is purged since the page refreshed.
    */
    document.addEventListener("DOMContentLoaded", function() {
      /**
       * submit sends an HTTP request via XHR.
       * @param {*Object} formEl - the form element to submit via XHR.
       */
      function submit(formEl) {
        var xhr = new XMLHttpRequest();
        xhr.open(formEl.method, formEl.action, true);

        /* See
         * https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts/rails-ujs/utils/ajax.coffee
         * for a more in-depth usage.
         */
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var script = document.createElement("script");
            script.innerText = xhr.responseText;
            document.head.appendChild(script).parentNode.removeChild(script);
          }
        }
        /* Set relevant headers that some backends check for */
        xhr.setRequestHeader("Turbolinks-Referrer", window.location.href);
        xhr.setRequestHeader("X-Requested-With", "xhr");
        xhr.send(new FormData(formEl));
        return false;
      }

      document.addEventListener("submit", function(e) {
        e.preventDefault();
        if (e.srcElement) {
          submit(e.srcElement);
        }
      });
    });
})();
