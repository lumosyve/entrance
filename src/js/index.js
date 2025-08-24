let navShow = true
let enterBtn = document.getElementById("enterBtn");
console.log('enterBtn', enterBtn);

let navContainer = document.querySelector(".nav-container");
enterBtn.addEventListener("click", () => {
  navContainer.setAttribute('class', `nav-container ${enterBtn ? 'hide' : ''}`)
  enterBtn = !enterBtn;
});
