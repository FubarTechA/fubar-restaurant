"use strict";

const menu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");
const lines = document.querySelectorAll(".line");
const slider = document.querySelector("slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider-btn-left");
const btnRight = document.querySelector(".slider-btn-right");
const dotContainer = document.querySelector(".dots");
const eventTab = document.querySelector(".event-tab");
const event = document.querySelector(".event");
const eventImg = document.querySelector(".event-img");

menu.addEventListener("click", function () {
  navLinks.classList.toggle("show");
  lines.forEach((l) => l.classList.toggle("show"));
});

let curSlide = 0;
const maxSlide = slides.length;
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
const createDot = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots-dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots-dot")
    .forEach((dot) => dot.classList.remove("dots-dot-active"));

  document
    .querySelector(`.dots-dot[data-slide = '${slide}']`)
    .classList.add("dots-dot-active");
};

// document
// .querySelector(`.dots__dot[data-slide='${slide}']`)
// .classList.add('dots__dot--active');

goToSlide(0);
createDot();
activateDot(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

dotContainer.addEventListener("click", function (e) {
  // console.log(e.target);
  // if(e.target.classList)
  if (e.target.classList.contains("dots-dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

eventTab.addEventListener("click", function (e) {
  const clicked = e.target.closest(".event-type");
  console.log(clicked.dataset.tab);
  const siblings = clicked
    .closest(".event-tab")
    .querySelectorAll(".event-type");

  // Remove Active state
  siblings.forEach((s) => s.classList.remove("event-type-active"));
  document
    .querySelectorAll(".event-img")
    .forEach((e) => e.classList.remove("event-img-active"));

  document
    .querySelectorAll(".event")
    .forEach((e) => e.classList.remove("event-active"));

  // Add active state to current element
  clicked.classList.add("event-type-active");
  document
    .querySelector(`.event-img-${clicked.dataset.tab}`)
    .classList.add("event-img-active");

  document
    .querySelector(`.event-${clicked.dataset.tab}`)
    .classList.add("event-active");
});
