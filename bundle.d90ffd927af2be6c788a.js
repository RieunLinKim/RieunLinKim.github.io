/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/main.scss */ \"./src/css/main.scss\");\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/main.js */ \"./src/js/main.js\");\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_1__);\n/*\n * This is the main entry point for Webpack, the compiler & dependency loader.\n * All files that are necessary for your web page and need to be 'watched' for changes should be included here!\n */\n\n// HTML Files\n// import '../index.html';\n\n// Stylesheets\n\n\n// Scripts\n\n\n//# sourceURL=webpack://linspace/./src/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function () {\n  // Navbar Resizing and Position Indicator\n  var navbar = document.querySelector('.navbar');\n  var navbarHeight = navbar.offsetHeight;\n  var sections = document.querySelectorAll('section');\n  var navbarItems = document.querySelectorAll('.navbar-item');\n\n  // Function to handle navbar resizing\n  var handleNavbarResize = function handleNavbarResize() {\n    if (window.scrollY > 50) {\n      navbar.classList.add('scrolled');\n    } else {\n      navbar.classList.remove('scrolled');\n    }\n  };\n\n  // Function to handle active navbar item\n  var handleActiveNav = function handleActiveNav() {\n    var current = '';\n    sections.forEach(function (section) {\n      var sectionTop = section.offsetTop - navbarHeight;\n      if (window.scrollY >= sectionTop - 10) {\n        current = section.getAttribute('id');\n      }\n    });\n    navbarItems.forEach(function (item) {\n      item.classList.remove('active');\n      if (item.getAttribute('href') === \"#\".concat(current)) {\n        item.classList.add('active');\n      }\n    });\n\n    // If scrolled to bottom, activate last menu item\n    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {\n      navbarItems.forEach(function (item) {\n        return item.classList.remove('active');\n      });\n      navbarItems[navbarItems.length - 1].classList.add('active');\n    }\n  };\n\n  // Initial check\n  handleNavbarResize();\n  handleActiveNav();\n\n  // Event listeners\n  window.addEventListener('scroll', function () {\n    handleNavbarResize();\n    handleActiveNav();\n  });\n\n  // Smooth Scrolling\n  navbarItems.forEach(function (item) {\n    item.addEventListener('click', function (e) {\n      e.preventDefault();\n      var targetId = item.getAttribute('href').substring(1);\n      var targetSection = document.getElementById(targetId);\n      window.scrollTo({\n        top: targetSection.offsetTop - navbarHeight + 1,\n        behavior: 'smooth'\n      });\n    });\n  });\n\n  // Modal Functionality\n  var modal = document.getElementById('modal');\n  var openModalBtn = document.querySelector('.open-modal');\n  var closeModalBtn = document.querySelector('.close-modal');\n\n  // Function to open the modal\n  var openModal = function openModal() {\n    modal.classList.add('active');\n    document.body.style.overflow = 'hidden'; // Prevent background scrolling\n    // Set focus to the modal for accessibility\n    var firstFocusableElement = modal.querySelector('.modal-content');\n    if (firstFocusableElement) {\n      firstFocusableElement.focus();\n    }\n  };\n\n  // Close the modal\n  var closeModal = function closeModal() {\n    modal.classList.remove('active');\n    document.body.style.overflow = 'auto'; // Restore scrolling\n  };\n\n  // Event listeners for modal\n  openModalBtn.addEventListener('click', openModal);\n  closeModalBtn.addEventListener('click', closeModal);\n\n  // Close modal when clicking outside the modal content\n  window.addEventListener('click', function (e) {\n    if (e.target === modal) {\n      closeModal();\n    }\n  });\n\n  // Close modal with the Escape key\n  window.addEventListener('keydown', function (e) {\n    if (e.key === 'Escape' && modal.classList.contains('active')) {\n      closeModal();\n    }\n  });\n\n  // Carousel Functionality\n  var gallery = document.querySelector('.gallery');\n  var slides = document.querySelectorAll('.gallery-slide');\n  var prevButton = document.querySelector('.new-prev-button');\n  var nextButton = document.querySelector('.new-next-button');\n  var indicators = document.querySelectorAll('.indicator');\n  var currentSlide = 0;\n  var autoSlideInterval;\n\n  // Show a specific slide\n  var showSlide = function showSlide(index) {\n    // Ensure index is within bounds\n    if (index < 0) {\n      currentSlide = slides.length - 1;\n    } else if (index >= slides.length) {\n      currentSlide = 0;\n    } else {\n      currentSlide = index;\n    }\n\n    // Remove active class from all slides and indicators\n    slides.forEach(function (slide) {\n      return slide.classList.remove('active');\n    });\n    indicators.forEach(function (indicator) {\n      return indicator.classList.remove('active');\n    });\n\n    // Add active class to current slide and indicator\n    slides[currentSlide].classList.add('active');\n    indicators[currentSlide].classList.add('active');\n  };\n\n  // Show the first slide initially\n  showSlide(currentSlide);\n\n  // Event listener for previous button\n  prevButton.addEventListener('click', function () {\n    showSlide(currentSlide - 1);\n    resetAutoSlide();\n  });\n\n  // Event listener for next button\n  nextButton.addEventListener('click', function () {\n    showSlide(currentSlide + 1);\n    resetAutoSlide();\n  });\n\n  // Event listeners for indicator dots\n  indicators.forEach(function (indicator) {\n    indicator.addEventListener('click', function () {\n      var index = parseInt(indicator.getAttribute('data-slide'));\n      showSlide(index);\n      resetAutoSlide();\n    });\n  });\n\n  // Start auto-sliding\n  var startAutoSlide = function startAutoSlide() {\n    autoSlideInterval = setInterval(function () {\n      showSlide(currentSlide + 1);\n    }, 5000); // Change slide every 5 seconds\n  };\n\n  // Stop auto-sliding\n  var stopAutoSlide = function stopAutoSlide() {\n    clearInterval(autoSlideInterval);\n  };\n\n  // Reset auto-slide interval\n  var resetAutoSlide = function resetAutoSlide() {\n    stopAutoSlide();\n    startAutoSlide();\n  };\n\n  // Start auto-sliding when the page loads\n  startAutoSlide();\n\n  // Pause auto-slide on hover\n  gallery.addEventListener('mouseenter', function () {\n    stopAutoSlide();\n  });\n\n  // Resume auto-slide when not hovering\n  gallery.addEventListener('mouseleave', function () {\n    startAutoSlide();\n  });\n\n  // Swipe Gestures for Touch Devices\n  var touchStartX = 0;\n  var touchEndX = 0;\n  var handleGesture = function handleGesture() {\n    if (touchEndX < touchStartX - 50) {\n      // Swipe Left\n      showSlide(currentSlide + 1);\n      resetAutoSlide();\n    }\n    if (touchEndX > touchStartX + 50) {\n      // Swipe Right\n      showSlide(currentSlide - 1);\n      resetAutoSlide();\n    }\n  };\n\n  // Add touch event listeners\n  gallery.addEventListener('touchstart', function (e) {\n    touchStartX = e.changedTouches[0].screenX;\n  }, false);\n  gallery.addEventListener('touchend', function (e) {\n    touchEndX = e.changedTouches[0].screenX;\n    handleGesture();\n  }, false);\n\n  // Keyboard Navigation within Carousel\n  document.addEventListener('keydown', function (e) {\n    if (e.key === 'a' || e.key === 'A') {\n      showSlide(currentSlide - 1);\n      resetAutoSlide();\n    }\n    if (e.key === 'd' || e.key === 'D') {\n      showSlide(currentSlide + 1);\n      resetAutoSlide();\n    }\n  });\n});\n\n// main.js\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  // ... existing JavaScript ...\n\n  // Project Modal Functionality\n  var projectModals = document.querySelectorAll('.project-modal');\n  var openProjectModalButtons = document.querySelectorAll('.open-project-modal');\n  var closeProjectModalButtons = document.querySelectorAll('.close-project-modal');\n  openProjectModalButtons.forEach(function (button) {\n    button.addEventListener('click', function (e) {\n      e.preventDefault();\n      var projectId = button.getAttribute('data-project');\n      var modal = document.getElementById(\"\".concat(projectId, \"-modal\"));\n      if (modal) {\n        modal.classList.add('active');\n        document.body.style.overflow = 'hidden'; // Prevent background scrolling\n      }\n    });\n  });\n  closeProjectModalButtons.forEach(function (button) {\n    button.addEventListener('click', function () {\n      var modal = button.closest('.project-modal');\n      if (modal) {\n        modal.classList.remove('active');\n        document.body.style.overflow = 'auto'; // Restore scrolling\n      }\n    });\n  });\n\n  // Close modals when clicking outside the modal content\n  projectModals.forEach(function (modal) {\n    modal.addEventListener('click', function (e) {\n      if (e.target === modal) {\n        modal.classList.remove('active');\n        document.body.style.overflow = 'auto';\n      }\n    });\n  });\n\n  // Close modals with the Escape key\n  window.addEventListener('keydown', function (e) {\n    if (e.key === 'Escape') {\n      projectModals.forEach(function (modal) {\n        if (modal.classList.contains('active')) {\n          modal.classList.remove('active');\n          document.body.style.overflow = 'auto';\n        }\n      });\n    }\n  });\n});\ndocument.addEventListener('DOMContentLoaded', function () {\n  // Modal Functionality\n  var modal = document.getElementById('modal');\n  var openModalBtn = document.querySelector('.open-modal');\n  var closeModalBtn = document.querySelector('.close-modal');\n\n  // Open the modal\n  var openModal = function openModal() {\n    modal.classList.add('active');\n    document.body.style.overflow = 'hidden'; // Prevent background scrolling\n  };\n\n  // Close the modal\n  var closeModal = function closeModal() {\n    modal.classList.remove('active');\n    document.body.style.overflow = 'auto'; // Restore scrolling\n  };\n\n  // Event listeners for modal\n  openModalBtn.addEventListener('click', openModal);\n  closeModalBtn.addEventListener('click', closeModal);\n\n  // Close modal when clicking outside the modal content\n  window.addEventListener('click', function (e) {\n    if (e.target === modal) {\n      closeModal();\n    }\n  });\n\n  // Close modal with the Escape key\n  window.addEventListener('keydown', function (e) {\n    if (e.key === 'Escape' && modal.classList.contains('active')) {\n      closeModal();\n    }\n  });\n});\n\n//# sourceURL=webpack://linspace/./src/js/main.js?");

/***/ }),

/***/ "./src/css/main.scss":
/*!***************************!*\
  !*** ./src/css/main.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://linspace/./src/css/main.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;