/* Project */

// set current year in footer
const currentDate = new Date();
document.querySelector('#year').textContent = currentDate.getFullYear();

/* FETCH */
// Declare a global empty array variable to store a list of hats
var hatList = new Array();
// Declare a global empty array variable to store a filtered list of hats
var filteredHats = new Array();

// Output function
function output(hats) {
  hats.forEach((hat) => {
    let article = document.createElement("article");

    let img = document.createElement("img");
    img.setAttribute("src", hat.imageUrl);
    img.setAttribute("alt", hat.hatName);

    let hatName = document.createElement("h3");
    hatName.textContent = hat.hatName;

    let hatPrice = document.createElement("h4");
    hatPrice.textContent = "$" + hat.hatPrice;

    article.appendChild(img);
    article.appendChild(hatName);
    article.appendChild(hatPrice);

    document.querySelector("#hats").appendChild(article);
  });
}

// Function to get data
async function getHats(url) {
  const response = await fetch("data/hats.json");
  if (response.ok) {
    hatList = await response.json();
    output(hatList);
  }
}

getHats();

// Step 7: Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of hats
function reset() {
  document.querySelector("#hats").innerHTML = "";
}

// Step 8: Declare a function named sortBy that does the following:
// - Calls the reset function
// - Sorts the global hat list by the currently selected value of the HTML element with an ID of sortBy
// - Calls the output function passing in the sorted list of hats
function sortBy() {
  reset();
  filterByPrice(false);

  let filter = document.querySelector("#sortBy").value;

  switch (filter) {
    case "hatNameAscending":
      output(
        filteredHats.sort((hat1, hat2) => {
          let hatName1 = hat1.hatName.toLowerCase();
          let hatName2 = hat2.hatName.toLowerCase();
          if (hatName1 < hatName2) return -1;
          else if (hatName1 > hatName2) return 1;
          else return 0;
        })
      );
      break;
    case "hatNameDescending":
      output(
        filteredHats.sort((hat1, hat2) => {
          let hatName1 = hat1.hatName.toLowerCase();
          let hatName2 = hat2.hatName.toLowerCase();
          if (hatName1 > hatName2) return -1;
          else if (hatName1 < hatName2) return 1;
          else return 0;
        })
      );
      break;
    case "hatPriceAscending":
      output(
        filteredHats.sort((hat1, hat2) => {
          let hatPrice1 = parseInt(hat1.hatPrice);
          let hatPrice2 = parseInt(hat2.hatPrice);
          if (hatPrice1 < hatPrice2) return -1;
          else if (hatPrice1 > hatPrice2) return 1;
          else return 0;
        })
      );
      break;
    case "hatPriceDescending":
      output(
        filteredHats.sort((hat1, hat2) => {
          let hatPrice1 = parseInt(hat1.hatPrice);
          let hatPrice2 = parseInt(hat2.hatPrice);
          if (hatPrice1 > hatPrice2) return -1;
          else if (hatPrice1 < hatPrice2) return 1;
          else return 0;
        })
      );
      break;
    default:
      // using ternary operators
      output(
        filteredHats.sort((hat1, hat2) =>
          hat1.hatName.toLowerCase() > hat2.hatName.toLowerCase()
            ? 1
            : hat2.hatName.toLowerCase() >
              hat1.hatName.toLowerCase()
            ? -1
            : 0
        )
      );
      break;
  }
}

function filterByPrice(print = true) {
    reset();

    filteredHats = [];

    document.querySelectorAll(".priceRange").forEach((checkbox) => {
        if (checkbox.checked) {
            const min = parseInt(checkbox.dataset.min);
            const max = parseInt(checkbox.dataset.max);

            const hats = hatList.filter(hat => {
                return parseInt(hat.hatPrice) >= min && parseInt(hat.hatPrice) <= max;
            });

            filteredHats = filteredHats.concat(hats);
        }

    });

    if (filteredHats.length === 0)
      filteredHats = hatList;

    if (print)
      output(filteredHats)
}

// Step 9: Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function
document.querySelector("#sortBy").addEventListener("change", sortBy);
document.querySelector(".filtering").addEventListener("change", filterByPrice);

