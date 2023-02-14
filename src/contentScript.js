'use strict';

let lastComment = null;
let comment = null;

document.addEventListener('keydown', keydownHandler, false);

const getNavLinkId = (e, t) =>
  [...e.querySelectorAll('.navs > a.clicky')]
    .filter((a) => a.innerText === t)
    .map((a) => new URL(a.href))
    .map((u) => u.hash.slice(1))
    .pop();

const nextVisibleSibling = (c) => {
  do {
    c = c?.nextElementSibling;
  } while (c?.classList.contains('noshow'));
  return c;
};

const prevVisibleSibling = (c) => {
  do {
    c = c?.previousElementSibling;
  } while (c?.classList.contains('noshow'));
  return c;
};

function keydownHandler(e) {
  switch (e.key) {
    case 'j':
      if (comment === null) {
        comment = document.querySelector('tr.athing.comtr');
      } else {
        lastComment = comment;
        comment = nextVisibleSibling(comment);
      }
      break;
    case 'k':
      if (comment !== null) {
        lastComment = comment;
        comment = prevVisibleSibling(comment);
      }
      if (comment === null) {
        document.querySelector('table.fatitem').scrollIntoView({
          behavior: 'smooth',
        });
      }
      break;
    case 'l':
      if (comment === null) {
        comment = document.querySelector('tr.athing.comtr');
      } else {
        lastComment = comment;
        let nextId = getNavLinkId(comment, 'next');
        if (nextId) {
          comment = document.getElementById(nextId);
        } else {
          comment = nextVisibleSibling(comment);
        }
      }
      break;
    case 'h':
      if (comment !== null) {
        lastComment = comment;
        let prevId = getNavLinkId(comment, 'prev');
        if (prevId) {
          comment = document.getElementById(prevId);
        } else {
          comment = prevVisibleSibling(comment);
        }
      }
      if (comment === null) {
        document.querySelector('table.fatitem').scrollIntoView({
          behavior: 'smooth',
        });
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
