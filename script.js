
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
            <div class="release-date">
              <p>${element.release_date}</p>
            </div>
            <div class="overview">

                <h3>Overview</h3>
                <p>
                ${element.overview}
                </p>
                <button class="know-more" id="${element.id}">Know More</button
            </div>
            `
            containerElement.appendChild(divElement)

            document.getElementById(element.id).addEventListener('click', () => {
              // console.log(element.id)
              openNav(movie)
            })

        });
        
        
    }
    getMovie()
    .then((movie) => renderMovie(movie))

    const overlayContent = document.getElementById('overlay-content');
    /* Open when someone clicks on the span element */
    function openNav(movie) {
      let id = movie.results;

      console.log("ini movie nav",id )
      fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY)
      .then(res => res.json())
      .then(videoData => {
        console.log(videoData);
        if(videoData){
          document.getElementById("myNav").style.width = "100%";
          if(videoData.results.length > 0){
            let embed = [];
            let dots = [];
            videoData.results.forEach((video, idx) => {
              let {name, key, site} = video
    
              if(site == 'YouTube'){
                  
                embed.push(`
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              
              `)
    
                dots.push(`
                  <span class="dot">${idx + 1}</span>
                `)
              }
            })
            
            var content = `
            <h1 class="no-results">${movie.original_title}</h1>
            <br/>
            
            ${embed.join('')}
            <br/>
    
            <div class="dots">${dots.join('')}</div>
            
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
    
    var activeSlide = 0;
    var totalVideos = 0;
    
    function showVideos(){
      let embedClasses = document.querySelectorAll('.embed');
      let dots = document.querySelectorAll('.dot');
    
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
    
      dots.forEach((dot, indx) => {
        if(activeSlide == indx){
          dot.classList.add('active');
        }else{
          dot.classList.remove('active')
        }
      })
    }
    
    const leftArrow = document.getElementById('left-arrow')
    const rightArrow = document.getElementById('right-arrow')
    
    leftArrow.addEventListener('click', () => {
      if(activeSlide > 0){
        activeSlide--;
      }else{
        activeSlide = totalVideos -1;
      }
    
      showVideos()
    })
    
    rightArrow.addEventListener('click', () => {
      if(activeSlide < (totalVideos -1)){
        activeSlide++;
      }else{
        activeSlide = 0;
      }
      showVideos()
    })
    