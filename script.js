const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timer;
function firstpageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 2,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
      delay: -1,
      stagger: 0.2,
    })
    .from("#homefooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function cicleflatten() {
  clearTimeout(timer);
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    var xdif = dets.clientX - xprev;
    var ydif = dets.clientY - yprev;
    xprev = dets.clientX;
    yprev = dets.clientY;
    xscale = gsap.utils.clamp(0.8, 1.2, xdif);
    yscale = gsap.utils.clamp(0.8, 1.2, ydif);
    circleMouseFollow(xscale, yscale);
    timer = this.setTimeout(function () {
      this.document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}
cicleflatten();
function circleMouseFollow(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    this.document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}
circleMouseFollow();
firstpageAnimation();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diff = 0;
  elem.addEventListener("mouseleave", function (details) {
    var dif = details.clientY - elem.getBoundingClientRect().top;
    diff = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      duration: 0.5,
    });
  });
  elem.addEventListener("mousemove", function (details) {
    var dif = details.clientY - elem.getBoundingClientRect().top;
    diff = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: dif,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diff),
    });
  });
});

var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330; // IST offset UTC +5:30

var ISTTime = new Date(
  currentTime.getTime() + (ISTOffset + currentOffset) * 60000
);

// ISTTime now represents the time in IST coordinates

var hoursIST = ISTTime.getHours();
var minutesIST = ISTTime.getMinutes();

document.getElementById("currtime").innerHTML =
  hoursIST + ":" + minutesIST + " IST";

var btn = document.getElementById("talkbtn");

btn.onmouseover = function () {
  btn.style.color = "black";
  btn.style.backgroundColor = "#fff";
};

btn.onmouseout = function () {
  btn.style.color = "#fff";
  btn.style.backgroundColor = "black";
};
