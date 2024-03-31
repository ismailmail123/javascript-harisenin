
const API_KEY = 'api_key=b557f570913464d03658137ecfdfa91b';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;



  async function getMovie () {
    const response = await fetch(API_URL)
    const results = await response.json()
    return results
  }   
  let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
// let lastUrl = '';
let totalPages = 100;

  
  getMovies(API_URL);

function getMovies(url) {
  // lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            renderMovie(data.results);
            // currentPage = data.page;
            // nextPage = currentPage + 1;
            // prevPage = currentPage - 1;
            // totalPages = data.total_pages;

            // current.innerText = currentPage;

            // if(currentPage <= 1){
            //   prev.classList.add('disabled');
            //   next.classList.remove('disabled')
            // }else if(currentPage>= totalPages){
            //   prev.classList.remove('disabled');
            //   next.classList.add('disabled')
            // }else{
            //   prev.classList.remove('disabled');
            //   next.classList.remove('disabled')
            // }

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}

    function renderMovie (data) {     
        
        const containerElement = document.getElementsByTagName('div')[1];
        // const data = movie.results
        
        data.forEach(movie => {
            console.log('ini adalah element yang ditampilkan' ,movie)
            const {title, poster_path, vote_average, release_date, overview, id} = movie;

            const divElement = document.createElement('div')
            divElement.classList.add('card-i-do')
            divElement.innerHTML = `
            <img class="image-card" src="https://image.tmdb.org/t/p/w500${poster_path}" >
            <h3> 
                ${title}   
            </h3>
            <div class="release-date">
              <p>${release_date}</p>
            </div>
            <div class="overview">

                <h3>Overview</h3>
                <p>
                ${overview}
                </p>
                <button class="know-more" id="${id}">Know More</button
            </div>
            `
            containerElement.appendChild(divElement)

            document.getElementById(id).addEventListener('click', () => {
              console.log("ididididididid", id)
              openNav(movie)
            })

        });
       
        
    }
    // getMovie()
    // .then((movie) => renderMovie(movie))

    const overlayContent = document.getElementById('overlay-content');
    /* membuka halaman youtube ketika menglik tombol know more */
    function openNav(movie) {
      let id = movie.id;

      console.log("ini movie nav",id )
      fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY)
      .then(res => res.json())
      .then(videoData => {
        console.log(videoData);
        if(videoData){
          document.getElementById("myNav").style.width = "100%";
          if(videoData.results.length > 0){
            let embed = [];
            videoData.results.forEach((video) => {
              let {name, key, site} = video
    
              if(site == 'YouTube'){
                  
                embed.push(`
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              
              `)
              }
            })
            
            let content = `
            <h1 class="no-results">${movie.original_title}</h1>
            <br/>
            
            ${embed.join('')}
            `
            overlayContent.innerHTML = content;
            activeSlide=0;
            showVideos();
          }else{
            overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
          }
        }
      })
    }



    function closeNav() {
      document.getElementById("myNav").style.width = "0%";
    }
    
    let activeSlide = 0;
    let totalVideos = 0;
    
    function showVideos(){
      let embedClasses = document.querySelectorAll('.embed');
          
      totalVideos = embedClasses.length; 
      embedClasses.forEach((embedTag, idx) => {
        if(activeSlide == idx){
          embedTag.classList.add('show')
          embedTag.classList.remove('hide')
    
        }else{
          embedTag.classList.add('hide');
          embedTag.classList.remove('show')
        }
      })
    
    }
    
    