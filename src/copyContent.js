console.log("Content script running!");
import React from "react";
import ReactDOM from "react-dom";
import { InjectNftCard } from "./components/Fun";
import "./index.css";

function loadCSS(filename) {
  const url = chrome.runtime.getURL(filename);
  const link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";
  link.type = "text/css";
  document.head.appendChild(link);
}

window.addEventListener("load", async function () {
  console.log("load script running!");

  loadCSS("card.css");

  const parentElement = await new Promise((resolve) => {
    const checkExist = setInterval(function () {
      const element = document.querySelector(
        ".css-1dbjc4n.r-150rngu.r-16y2uox.r-1wbh5a2.r-rthrr5"
      );
      console.log(`element2.0`, element);
      if (element) {
        clearInterval(checkExist);
        resolve(element);
      }
    }, 100);
  });

  if (parentElement) {
    const observer = new MutationObserver(() => {
      console.log(`Something changed`);
      const targetElement = document.querySelector(
        '.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0[data-testid="UserDescription"]'
      );

      if (targetElement && !targetElement.querySelector(".waxNFT")) {
        ReactDOM.render(<InjectNftCard />, targetElement);
      }
    });

    observer.observe(parentElement, {
      childList: true,
      subtree: true,
    });
  }
});

export {};
