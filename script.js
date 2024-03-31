
  async function getMovie () {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=b557f570913464d03658137ecfdfa91b&include_adult=true&include_video=true&language=en-US&page=10&sort_by=popularity.desc')
    const results = await response.json()
    return results
  } 
  
  async function getVideos () {
    const response = await fetch('https://api.themoviedb.org/3/tv/series_id/videos?api_key=b557f570913464d03658137ecfdfa91b&language=en-US')
    const results = await response.json()
    return results
  }   

    function renderMovie (movie) {     
        
        const containerElement = document.getElementsByTagName('div')[1];
        const data = movie.results

        data.forEach(element => {
            console.log('ini adalah element yang ditampilkan' ,element)

            const divElement = document.createElement('div')
            divElement.classList.add('card-i-do')
            divElement.innerHTML = `
            <img class="image-card" src="https://image.tmdb.org/t/p/w500${element.poster_path}" >
            <h3> 
                ${element.original_title}   
            </h3>
            <p>
               
            </p>
            <div class="release-date">
            <p>${element.release_date}</p>
            </div>
            `
            containerElement.appendChild(divElement)



        });
    }
    getMovie()
    .then((movie) => renderMovie(movie))

    function rendervideos (videos) {     
        
        const data = videos.results

        data.forEach(element => {
            console.log('ini adalah element video' ,element)

           



        });
    }
    getVideos()
    .then((videos) => rendervideos(videos))