import { navbar, button, nav } from "./selections";
import algoliasearch from 'algoliasearch/lite';
// import instantsearch from 'instantsearch.js';
// import { searchBox, hits, configure } from 'instantsearch.js/es/widgets';
// // import 'instantsearch.css/themes/reset.css';
// import 'instantsearch.css/themes/algolia.css';

import config from "@/config";


// const config = require("@/config");
// console.log(config);
// const searchClient = algoliasearch(config.algolia.id, config.algolia.search_key);

// const search = instantsearch({
//   indexName: 'articles',
//   searchClient,
//   routing: true,
// });


// search.addWidgets([
//   searchBox({
//     container: '#search-box',
//     placeholder: 'Search for contacts',
//   })
// ]);

// search.addWidgets([
//   hits({
//     container: '#hits',
//     templates: {
//       item: document.getElementById('hit-template').innerHTML,
//       empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
//     },
//   })
// ]);

// search.start();


const client = algoliasearch(config.algolia.id, config.algolia.admin_key);
const index = client.initIndex('articles');

let scrollHandler = () => {
  // fixed nav scroll logic
  if (
    (document.documentElement.scrollTop - 20 > navbar.clientHeight &&
      !navbar.classList.contains("bg-dark")) ||
    (document.documentElement.scrollTop - 20 < navbar.clientHeight &&
      navbar.classList.contains("bg-dark"))
  ) {
    navbar.classList.toggle("bg-dark");
    navbar.classList.toggle("py-2");
  }
};

window.addEventListener("scroll", scrollHandler);

//slider menu logic (phone)
button.addEventListener("click", () => {
  nav.classList.toggle("-right-full");
});
nav.addEventListener("click", (e) => {
  console.log(e.target, nav.firstElementChild);
  if (e.target != nav.firstElementChild) button.click();
});

// search 

