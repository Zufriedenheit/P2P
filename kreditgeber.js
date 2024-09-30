function show_nav(e) {
  // document.querySelector("h1").style.visibility = "hidden";
  const focus_element = document.querySelector(".in_focus");
  const all = document.querySelectorAll(".container *");
  if (!focus_element) {
    const myNav = document.querySelector(".nav");
    myNav.style.display = "block";
    myNav.classList.add("nav_shown");
    all.forEach((element) => {
      element.style.pointerEvents = "none";
    });
  }
}

function updateFlagWrappers() {
  // Add dropdown if overflowing
  document.querySelectorAll("td .flag-wrapper").forEach(function (wrapper) {
    if (wrapper.scrollHeight > wrapper.clientHeight + 20) {
      wrapper.classList.add("has-dropdown");
      wrapper.addEventListener("click", function (event) {
        event.stopPropagation();
        this.classList.toggle("show-all");
      });
    } else {
      wrapper.classList.remove("has-dropdown");
    }
    // Handle tooltip positioning
    const flags = wrapper.querySelectorAll(".flag");
    flags.forEach((flag) => {
      const tooltip = flag.querySelector(".tooltiptext");
      flag.addEventListener("mouseover", () => {
        const rect = flag.getBoundingClientRect();
        tooltip.style.position = "fixed";
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 3}px`;
        // tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.visibility = "visible";
      });
      flag.addEventListener("mouseout", () => {
        tooltip.style.visibility = "hidden";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", updateFlagWrappers);
window.addEventListener("resize", updateFlagWrappers);

// Table sorting
document.addEventListener("click", function (e) {
  try {
    // allows for elements inside TH
    function findElementRecursive(element, tag) {
      return element.nodeName === tag
        ? element
        : findElementRecursive(element.parentNode, tag);
    }
    var ascending_table_sort_class = "asc";
    var no_sort_class = "no-sort";
    var null_last_class = "n-last";
    var table_class_name = "sortable";
    var alt_sort_1 = e.shiftKey || e.altKey;
    var element = findElementRecursive(e.target, "TH");
    var tr = element.parentNode;
    var thead = tr.parentNode;
    var table = thead.parentNode;
    function getValue(element) {
      var _a;
      var value = alt_sort_1
        ? element.dataset.sortAlt
        : (_a = element.dataset.sort) !== null && _a !== void 0
          ? _a
          : element.textContent;
      return value;
    }
    if (
      thead.nodeName === "THEAD" && // sortable only triggered in `thead`
      table.classList.contains(table_class_name) &&
      !element.classList.contains(no_sort_class) // .no-sort is now core functionality, no longer handled in CSS
    ) {
      var column_index_1;
      var nodes = tr.cells;
      var tiebreaker_1 = +element.dataset.sortTbr;
      // Reset thead cells and get column index
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] === element) {
          column_index_1 = +element.dataset.sortCol || i;
        } else {
          nodes[i].setAttribute("aria-sort", "none");
        }
      }
      var direction = "descending";
      if (
        element.getAttribute("aria-sort") === "descending" ||
        (table.classList.contains(ascending_table_sort_class) &&
          element.getAttribute("aria-sort") !== "ascending")
      ) {
        direction = "ascending";
      }
      // Update the `th` class accordingly
      element.setAttribute("aria-sort", direction);
      var reverse_1 = direction === "ascending";
      var sort_null_last_1 = table.classList.contains(null_last_class);
      var compare_1 = function (a, b, index) {
        var x = getValue(b.cells[index]);
        var y = getValue(a.cells[index]);
        if (sort_null_last_1) {
          if (x === "" && y !== "") {
            return -1;
          }
          if (y === "" && x !== "") {
            return 1;
          }
        }
        var temp = +x - +y;
        var bool = isNaN(temp) ? x.localeCompare(y) : temp;
        return reverse_1 ? -bool : bool;
      };
      // loop through all tbodies and sort them
      for (var i = 0; i < table.tBodies.length; i++) {
        var org_tbody = table.tBodies[i];
        // Put the array rows in an array, so we can sort them...
        var rows = [].slice.call(org_tbody.rows, 0);
        // Sort them using Array.prototype.sort()
        rows.sort(function (a, b) {
          var bool = compare_1(a, b, column_index_1);
          return bool === 0 && !isNaN(tiebreaker_1)
            ? compare_1(a, b, tiebreaker_1)
            : bool;
        });
        // Make an empty clone
        var clone_tbody = org_tbody.cloneNode();
        // Put the sorted rows inside the clone
        clone_tbody.append.apply(clone_tbody, rows);
        // And finally replace the unsorted tbody with the sorted one
        table.replaceChild(clone_tbody, org_tbody);
      }
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // console.log(error)
  }
});

// Sort tables on load
window.addEventListener("load", function () {
  const financialTable = document.getElementById("lo-size");
  if (financialTable) {
    financialTable.click();
  }

  const ratesTable = document.getElementById("lo-name");
  if (ratesTable) {
    ratesTable.click();
    ratesTable.click();
  }
});

// Tab switcher
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(`${tabName}-data`).classList.add("active");
    });
  });
});
