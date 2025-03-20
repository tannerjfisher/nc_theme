/**
 * @file
 * Dropdown utility functions.
 */

export function handleDropdownOverflow(element) {
  const activeDropdownRect = element.querySelector('.dropdown-menu').getBoundingClientRect();
  const allDropdowns = element.querySelectorAll('.dropdown-menu');
  let isOverflowing;

  allDropdowns.forEach((dropdown) => {
    const dropdownItem = dropdown.parentElement;

    if (dropdownItem.classList.contains('opens-right')) {
      isOverflowing = activeDropdownRect.left + activeDropdownRect.width + activeDropdownRect.width > window.innerWidth; // Third Level

      if (isOverflowing) {
        dropdownItem.classList.remove('opens-right');
        dropdownItem.classList.add('opens-left');
      }
    }
    else if (dropdownItem.classList.contains('aligns-left')) {
      isOverflowing = activeDropdownRect.left + activeDropdownRect.width > window.innerWidth; // Second Level

      if (isOverflowing) {
        dropdownItem.classList.remove('aligns-left');
        dropdownItem.classList.add('aligns-right');
      }
    }
  });
}
