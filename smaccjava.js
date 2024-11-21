const menuIcon = document.querySelector('.menu-icon');
const popupMenu = document.querySelector('.popup-menu');

menuIcon.addEventListener('click', () => {
  popupMenu.classList.toggle('active');
});