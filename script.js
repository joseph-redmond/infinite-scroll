const imageSection = document.querySelector('.container')
const accessKey = "" // Place api key for unsplash here
let pageNumber = 1
let shouldRun = true
const unsplashEndpoint = `https://api.unsplash.com/photos?client_id=${accessKey}&page=`;

document.onscroll = () => {
    let scroll = getVerticalScrollPercentage(document.body)
    let scrollPercentage = Math.round(scroll)
    
    if(scrollPercentage >= 95 && shouldRun){
        shouldRun = false
        grabImages()
    }
}

const getVerticalScrollPercentage = (element) => {
      var p = element.parentNode,
          pos = (element.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
      
      return pos
}

const grabImages = async () => {
    fetch(unsplashEndpoint + pageNumber, {
        method: "GET",
        headers: {
            Authorization: accessKey
        }
    }).then(data => data.json())
    .then(data => {
        data.forEach(element => {
            imageSection.innerHTML += `<img src="${element.urls.full}" alt=""/>`
        });
        pageNumber++
        shouldRun = true
    })
}

grabImages()