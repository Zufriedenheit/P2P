function show_nav(e) {
  // document.querySelector("h1").style.visibility = "hidden";
  const focus_element = document.querySelector(".in_focus");
  const all = document.querySelectorAll(".container *");
  if (!focus_element) {
    const myNav = document.querySelector(".nav");
    myNav.style.display = "block";
    myNav.classList.add("nav_shown");
    all.forEach(element => {
        element.style.pointerEvents = "none";
    });
  }
}

document.addEventListener("click", function (e) {
  const focus_element = document.querySelector(".in_focus");
  const target_is_focused = e.target.closest(".in_focus");
  const target_is_card = e.target.closest(".card");
  const target_is_link = e.target.closest("a");
  const target_is_close = e.target.closest(".close");
  const nav_is_shown = document.querySelector(".nav_shown");
  const target_is_h1 = e.target.closest("h1");

  // If no focused element exists and card (but not link on it) has been clicked: focus it
  if (!focus_element && target_is_card && !target_is_link && !nav_is_shown) {
    // Put card into focus
    target_is_card.classList.add("in_focus");
    target_is_card.style.position = "fixed";
    target_is_card.style.zIndex = "10";
    target_is_card.style.boxShadow = "5px 10px 15px grey";
    target_is_card.style.maxWidth = "95%";
    const info_symbol = target_is_card.querySelector(".info");
    const close_symbol = target_is_card.querySelector(".close");
    info_symbol.style.display = "none";
    close_symbol.style.display = "block";
    // Show extra info
    const extra_info = target_is_card.querySelectorAll(".extra");
    extra_info.forEach((data) => {
      data.style.display = "block";
    });
    // Blur the rest
    const blurMe = document.querySelectorAll(".card:not(.in_focus)");
    blurMe.forEach((myItem) => {
      myItem.style.filter = "blur(5px)";
      myItem.style.opacity = "0.5";
    });
    // Deactivate heading menu nav
    const headings = document.querySelectorAll("h1");
    headings.forEach(element => {
        element.style.pointerEvents = "none";
    });
    // If focused element does exist and clicked outside of it: remove focus
  } else if (focus_element && (!target_is_focused || target_is_close)) {
    // Remove focus from card
    focus_element.style.position = "";
    focus_element.style.zIndex = "";
    focus_element.style.boxShadow = "";
    focus_element.style.maxWidth = "";
    focus_element.classList.remove("in_focus");
    const info_symbol = focus_element.querySelector(".info");
    const close_symbol = focus_element.querySelector(".close");
    info_symbol.style.display = "block";
    close_symbol.style.display = "none";
    // Hide extra info
    const extra_info = focus_element.querySelectorAll(".extra");
    extra_info.forEach((data) => {
      data.style.display = "none";
    });
    // Unblur everything
    const blurMe = document.querySelectorAll(".card");
    blurMe.forEach((myItem) => {
      myItem.style.filter = "";
      myItem.style.opacity = "";
    });
    // Reactivate heading menu nav
    const headings = document.querySelectorAll("h1");
    headings.forEach(element => {
        element.style.pointerEvents = "auto";
    });
  } else if (nav_is_shown && !target_is_h1) {
    const all = document.querySelectorAll(".container *");
    nav_is_shown.classList.remove("nav_shown");
    nav_is_shown.style.display = "none";
    all.forEach(element => {
        element.style.pointerEvents = "auto";
    });
  }
});
