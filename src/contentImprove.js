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
        '.css-1dbjc4n.r-6gpygo.r-14gqq1x[data-testid="UserName"]'
      );

      if (targetElement && !targetElement.querySelector(".waxNFT")) {
        const div = document.createElement("div");
        div.className = "waxNFT"; // Add a class to the div
        targetElement.appendChild(div);
        ReactDOM.render(<InjectNftCard />, div);
      }
    });

    observer.observe(parentElement, {
      childList: true,
      subtree: true,
    });
  }
});

export {};
