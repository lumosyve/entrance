let navShow = false;
let enterBtn = document.getElementById("enterBtn");
console.log('enterBtn', enterBtn);

let descContainerChildEle = document.getElementById("desc-container-child");
let navContainer = document.querySelector(".nav-container");
enterBtn.addEventListener("click", () => {
  navContainer.setAttribute('class', `nav-container ${enterBtn ? 'hide' : ''}`)
  descContainerChildEle.setAttribute('class', `container ${enterBtn ? '' : 'nav-show'}`)
  enterBtn = !enterBtn;
});
