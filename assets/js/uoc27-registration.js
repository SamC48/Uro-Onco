// JavaScript Document
/* Optional: keep only one registration information panel open at a time. */
(function () {
  "use strict";

  function uoc27regInit() {
    var root = document.getElementById("uoc27reg-page");
    if (!root || root.getAttribute("data-uoc27reg-ready") === "true") return;
    root.setAttribute("data-uoc27reg-ready", "true");

    var panels = root.querySelectorAll(".uoc27reg-detail");
    Array.prototype.forEach.call(panels, function (panel) {
      panel.addEventListener("toggle", function () {
        if (!panel.open) return;
        Array.prototype.forEach.call(panels, function (other) {
          if (other !== panel) other.open = false;
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", uoc27regInit);
  } else {
    uoc27regInit();
  }
}());
