'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

let lastComment = null;
let comment = null;

document.addEventListener('keydown', keydownHandler, false);

const getNavLink = (e, t) =>
  [...e.querySelectorAll('.navs > a.clicky')]
    .filter((a) => a.innerText === t)
    .map((a) => new URL(a.href))
    .map((u) => u.hash.slice(1))
    .pop();

function keydownHandler(e) {
  let nextIdx = -1;
  switch (e.key) {
    case 'j':
      if (comment === null) {
        comment = document.querySelector('tr.athing.comtr');
      } else {
        lastComment = comment;
        comment = comment.nextElementSibling;
      }
      break;
    case 'k':
      if (comment === null) {
        comment = document.querySelector('tr.athing.comtr');
      } else {
        lastComment = comment;
        comment = comment.previousElementSibling;
      }
      break;
    case 'J':
      if (comment === null) {
        comment = document.querySelector('tr.athing.comtr');
      } else {
        lastComment = comment;
        let nextId = getNavLink(comment, 'next');
        if (nextId) {
          comment = document.getElementById(nextId);
        } else {
          comment = comment.nextElementSibling;
        }
      }
      break;
    case 'K':
      if (comment === null) {
        comment = document.querySelector('tr.athing.comtr');
      } else {
        lastComment = comment;
        let nextId = getNavLink(comment, 'prev');
        if (nextId) {
          comment = document.getElementById(nextId);
        } else {
          comment = comment.previousElementSibling;
        }
      }
      break;
    default:
      return;
  }

  if (lastComment) {
    lastComment.querySelector('td.default').style.border = 'initial';
  }

  if (comment) {
    comment.querySelector('td.default').style.border = 'thin solid grey';
    comment.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
