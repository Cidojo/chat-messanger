export default () => {
  const chatTogglers = document.querySelectorAll(`.chat-room__toggle input`);
  const chatRooms = document.querySelectorAll(`.chat-room__item`);
  let current = chatRooms[0];


  chatTogglers.forEach((toggle, i) => {
    toggle.addEventListener(`checked`, () => {
      chatRooms[i].classList.remove(`chat-room__item--hidden`);
      current.classList.add(`chat-room__item--hidden`);
      current = chatRooms[i];
    });
  });
}
