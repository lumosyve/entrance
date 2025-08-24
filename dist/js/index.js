let navShow = true
let enterBtn = document.getElementById("enterBtn");
console.log('enterBtn', enterBtn);

let navContainer = document.querySelector(".nav-container");
enterBtn.addEventListener("click", () => {
  navContainer.setAttribute('class', `nav-container ${enterBtn ? 'hide' : ''}`)
  enterBtn = !enterBtn;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbmF2U2hvdyA9IHRydWVcbmxldCBlbnRlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50ZXJCdG5cIik7XG5jb25zb2xlLmxvZygnZW50ZXJCdG4nLCBlbnRlckJ0bik7XG5cbmxldCBuYXZDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdi1jb250YWluZXJcIik7XG5lbnRlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBuYXZDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBuYXYtY29udGFpbmVyICR7ZW50ZXJCdG4gPyAnaGlkZScgOiAnJ31gKVxuICBlbnRlckJ0biA9ICFlbnRlckJ0bjtcbn0pO1xuIl0sImZpbGUiOiJpbmRleC5qcyJ9
