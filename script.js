const baseUrl = "https://api.giphy.com/v1/gifs/"
const apiKey = "277rit8f5hVeRwMveLxtoKBo4wS4Vrf4"
const search = document.querySelector("input")
const form = document.querySelector("form")
const section = document.querySelector("section")
const forward50 = document.querySelector("#right")
const back50 = document.querySelector("#left")

let pagination = 0

forward50.style.display = "none"
back50.style.display = "none"

search.focus()

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

      !pagination
        ? (back50.style.display = "none")
        : (back50.style.display = "block")
      hits - pagination > 50
        ? (forward50.style.display = "block")
        : (forward50.style.display = "none")

      console.log(json)
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
        section.appendChild(gif)
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

        section.append(newModal)

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

const nextPage = (e) => {
  pagination += 50
  displaySearchResults(search.value)
}

const prevPage = (e) => {
  pagination -= 50
  displaySearchResults(search.value)
}

forward50.addEventListener("click", nextPage)
back50.addEventListener("click", prevPage)
form.addEventListener("submit", () => {
  pagination = 0
  displaySearchResults(search.value)
})
