/* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 */ 
/* 💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩 */
/* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 */ 
/* 💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩 */
/* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 */ 


const baseUrl = "https://api.giphy.com/v1/gifs/"
const apiKey = "277rit8f5hVeRwMveLxtoKBo4wS4Vrf4"
const search = document.querySelector("input")
const autocompleteList = document.querySelector('.suggestions')
const form = document.querySelector("form")
const resultsSection = document.querySelector("section")
const forward50 = document.querySelector("#right")
const back50 = document.querySelector("#left")
const pageNums = document.querySelector("#page-nums")
const buttons = document.querySelectorAll("button")

let pagination = 0

pageNums.style.display = "none"
forward50.style.display = "none"
back50.style.display = "none"

search.focus() 

// *** *** FUNCTION TO FETCH AND DISPLAY RESULTS *** *** //

const displaySearchResults = (query) => {

  if (!query) {
    alert("Please enter a search term!")
    return
  }
  if (document.querySelector("#container")) {
    document.querySelector("#container").remove()
  }
  document.querySelectorAll("img").forEach((image) => {
    image.remove()
  })
  
  
  fetch(
    baseUrl +
      "search?api_key=" +
      apiKey +
      "&q=" +
      query +
      "&offset=" +
      pagination
  )
    .then((results) => results.json())
    .then((json) => {
      const hits = json.pagination.total_count
      console.log(hits)
      if(!hits){alert('No results for that search query! Try something a bit more... general')}  

      !pagination
        ? (back50.style.display = "none")
        : (back50.style.display = "block")
      hits - pagination > 50
        ? (forward50.style.display = "block")
        : (forward50.style.display = "none")
      hits > 0
        ? (pageNums.style.display = "block")
        : (pageNums.style.display = "none")

      pageNums.innerText = `page ${pagination / 50 + 1} of ${Math.ceil(
        hits / 50
      )}`

      // console.log(json)
      json.data.map((ob) => {
        const gif = document.createElement("img")
        gif.setAttribute("src", ob.images.original.url)
        gif.setAttribute("data-url", ob.url)
        gif.setAttribute("data-username", ob.username)
        gif.setAttribute("data-title", ob.title)
        gif.setAttribute("data-image-url", ob.images.original.url)
        if (ob.user !== undefined) {
          gif.setAttribute("data-user-url", ob.user.profile_url)
        }
        resultsSection.appendChild(gif)
      })

      const gifs = document.querySelectorAll("img")

      const hoverEffect = (e) => {
        e.target.classList.add("hovered")
      }
      const removeEffect = (e) => {
        e.target.classList.remove("hovered")
      }

      gifs.forEach((gif) => {
        gif.addEventListener("mouseover", hoverEffect)
        gif.addEventListener("mouseout", removeEffect)
      })

      const addModal = (e) => {
        const newModal = document.createElement("div")
        newModal.setAttribute("id", "modal-wrapper")
        const data = e.target.dataset
        // console.log(data)
        const url = data.url
        const username = data.username
        const userUrl = data.userUrl
        const title = data.title
        const imageUrl = data.imageUrl

        newModal.innerHTML = `<div id="modal">
      <h3>${title}</h3>
      <br>
      <a href="${url}" target="_blank"><img src="${imageUrl}" alt="${title}"></a>
      <br>
      <p> <a href="${userUrl}" target="_blank">${username}</a></p>
      <button class="btn btn-dark" id='close-modal'>Close</button>
      </div>`

        resultsSection.append(newModal)

        // *** *** *** Modal removal *** *** *** //
        const modalWrapper = document.querySelector("#modal-wrapper")
        const closeModal = document.querySelector("#close-modal")
        const removeModal = () => {
          modalWrapper.remove("id", "modal-wrapper")
        }
        closeModal.addEventListener("click", removeModal)
      }

      gifs.forEach((gif) => {
        gif.addEventListener("click", addModal)
      })
    })
    
}

// *** NEXT PAGE *** ///
const nextPage = (e) => {
  pagination += 50
  displaySearchResults(search.value)
      // autocompleteList.innerHTML = ''
}

// *** PREV PAGE *** ///
const prevPage = (e) => {
  pagination -= 50
  displaySearchResults(search.value)
}

// *** FETCH AND DISPLAY TRENDING ***
const fetchTrending = () => {
  if (document.querySelector("#container")) {
    document.querySelector("#container").remove()
  }
  document.querySelectorAll("img").forEach((image) => {
    image.remove()
  })
  pagination = 0

  forward50.style.display = "none"
  back50.style.display = "none"
  pageNums.style.display = "none"

  fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=277rit8f5hVeRwMveLxtoKBo4wS4Vrf4"
  )
    .then((response) => response.json())
    .then((json) => {
      json.data.map((ob) => {
        const gif = document.createElement("img")
        gif.setAttribute("src", ob.images.original.url)
        gif.setAttribute("data-url", ob.url)
        gif.setAttribute("data-username", ob.username)
        gif.setAttribute("data-title", ob.title)
        gif.setAttribute("data-image-url", ob.images.original.url)
        if (ob.user !== undefined) {
          gif.setAttribute("data-user-url", ob.user.profile_url)
        }
        resultsSection.appendChild(gif)
      })

      const gifs = document.querySelectorAll("img")

      const hoverEffect = (e) => {
        e.target.classList.add("hovered")
      }
      const removeEffect = (e) => {
        e.target.classList.remove("hovered")
      }

      gifs.forEach((gif) => {
      // autocompleteList.innerHTML = ''
        gif.addEventListener("mouseover", hoverEffect)
        gif.addEventListener("mouseout", removeEffect)
      })

      const addModal = (e) => {
        const newModal = document.createElement("div")
        newModal.setAttribute("id", "modal-wrapper")
        const data = e.target.dataset
        // console.log(data)
        const url = data.url
        const username = data.username
        const userUrl = data.userUrl
        const title = data.title
        const imageUrl = data.imageUrl

        newModal.innerHTML = `<div id="modal">
      <h3>${title}</h3>
      <br>
      <a href="${url}" target="_blank"><img src="${imageUrl}" alt="${title}"></a>
      <br>
      <p> <a href="${userUrl}" target="_blank">${username}</a></p>
      <button class="btn btn-dark" id='close-modal'>Close</button>
      </div>`

        resultsSection.append(newModal)

        // *** *** *** Modal removal *** *** *** //
        const modal = document.querySelector("#modal")
        const modalWrapper = document.querySelector("#modal-wrapper")
        const closeModal = document.querySelector("#close-modal")
        const removeModal = () => {
          modalWrapper.remove("id", "modal-wrapper")
        }
        closeModal.addEventListener("click", removeModal)
      }

      gifs.forEach((gif) => {
        gif.addEventListener("click", addModal)
      })
    })
}

forward50.addEventListener("click", nextPage)
back50.addEventListener("click", prevPage)
form.addEventListener("submit", () => {
  pagination = 0
  displaySearchResults(search.value)
})
buttons[1].addEventListener("click", fetchTrending)

const autoArray = [] //store values from autocompleteArray() fetch function

// *** *** FUNCTION TO FETCH AUTOFILL WORDS FROM API AND PUSH TO AUTOARRAY *** *** //
const autocompleteArray = () => {
  
  fetch(
    `https://api.giphy.com/v1/gifs/search/tags?api_key=277rit8f5hVeRwMveLxtoKBo4wS4Vrf4&q=${search.value}`
  )
    .then((response) => response.json())
    .then((json) => {
      for(let i = 0; i < json.data.length; i++){
        autoArray[i]=json.data[i].name
      }
    })
    
}

search.addEventListener("input", autocompleteArray) //pushes words to array every time the search input changes


// *** *** FUNCTION TO AUTOFILL WORDS FROM AUTOARRAY *** *** // MAYBE REWORK THIS SO IT DISPLAYS EVERYTHING CURRENTLY IN ARRAY
//adapted from W3 school --> https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {

  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a, b, i, 
    val = this.value;
    //close any already open lists of autocompleted values
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("div");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    //Timeout give autocompleteArray() fetch function time to fill autoArray [] 
    setTimeout(()=>{  
      for (i = 0; i < arr.length; i++) {
          b = document.createElement("div");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function (e) {
            console.log(e)
            inp.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
            buttons[0].click()
          });
          a.appendChild(b);
      }
    },300) //.3 seconds
    
  });

  //listens for up, down, and enter
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      //*and and make the current item more visible
      addActive(x);
    } else if (e.keyCode == 38) {
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      //and and make the current item more visible
      addActive(x);
    } else if (e.keyCode == 13) {
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

    // function to classify an item as "active"
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  
    // function to remove the "active" class from all autocomplete items:
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  // function to close all current lists
  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  //execute a function when someone clicks in the document:
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

//auto-completes the input field
autocomplete(search, autoArray)

