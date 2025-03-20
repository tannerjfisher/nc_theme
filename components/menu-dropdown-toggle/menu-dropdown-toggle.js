/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/dropdown-utils.js":
/*!**********************************!*\
  !*** ./src/js/dropdown-utils.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleDropdownOverflow: function() { return /* binding */ handleDropdownOverflow; }
/* harmony export */ });
/**
 * @file
 * Dropdown utility functions.
 */

function handleDropdownOverflow(element) {
  const activeDropdownRect = element.querySelector('.dropdown-menu').getBoundingClientRect();
  const allDropdowns = element.querySelectorAll('.dropdown-menu');
  let isOverflowing;
  allDropdowns.forEach(dropdown => {
    const dropdownItem = dropdown.parentElement;
    if (dropdownItem.classList.contains('opens-right')) {
      isOverflowing = activeDropdownRect.left + activeDropdownRect.width + activeDropdownRect.width > window.innerWidth; // Third Level

      if (isOverflowing) {
        dropdownItem.classList.remove('opens-right');
        dropdownItem.classList.add('opens-left');
      }
    } else if (dropdownItem.classList.contains('aligns-left')) {
      isOverflowing = activeDropdownRect.left + activeDropdownRect.width > window.innerWidth; // Second Level

      if (isOverflowing) {
        dropdownItem.classList.remove('aligns-left');
        dropdownItem.classList.add('aligns-right');
      }
    }
  });
}

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!******************************************************************!*\
  !*** ./components/menu-dropdown-toggle/menu-dropdown-toggle.mjs ***!
  \******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_dropdown_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js/dropdown-utils.js */ "./src/js/dropdown-utils.js");
/**
 * @file
 * Toggle style dropdown menu.
 */


(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.addToggleToDropdown = {
    attach: function (context) {
      // Ensure this behavior only runs once on the main canvas
      const dropdowns = once('toggle-dropdown', '.navbar .dropdown', context);
      dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        dropdown.querySelector('a').addEventListener('click', e => {
          if (dropdown.parentElement.classList.contains('nav')) {
            (0,_js_dropdown_utils_js__WEBPACK_IMPORTED_MODULE_0__.handleDropdownOverflow)(dropdown);
          }
        });
      });
    }
  };
})(Drupal, once);
}();
/******/ })()
;
//# sourceMappingURL=menu-dropdown-toggle.js.map