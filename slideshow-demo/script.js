/* Code For Fecthing data from API */
    axios.get('https://blog.yudiz.com/wp-json/wp/v2/posts?_embed').then(function (response) {
    // Handle the response here
    console.log('Data from the API:', response.data);
    const postList = document.getElementById('slide-show');
   const data = response.data;
    console.log('Data:', data);
        data.forEach((post) => {
            const listItem = document.createElement('div');
            listItem.classList.add('slide','fade'); 
            listItem.innerHTML = `
                    <div class="img-box">
                        <img src="${post._embedded['wp:featuredmedia']['0'].source_url}" alt="Image 1">
                        <h6 class="post-date">${post.date}</h6>
                    </div>
                    <div class="post-des">
                    <a href="${post.link}"><h1>${post.title.rendered}</h1></a>
                        <p>${post.excerpt.rendered}</p>
                    </div>
                `;
            postList.appendChild(listItem);
            initializeSlider();
    })
    .catch(function (error) {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
    }); });

    function initializeSlider() {
        /* Code For Slider  */
        let slideIndex = 0;
        const slides = document.querySelectorAll(".slide");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const slidesToShow = 1; // Number of slides to show at once
        const slidesToScroll = 1; // Number of slides to scroll at a time

        // Function to show the current set of slides
        function showSlides() {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                slides[i].classList.remove("active-slide");
            }

            for (let i = slideIndex; i < slideIndex + slidesToShow; i++) {
                if (i < slides.length) {
                    slides[i].style.display = "block";
                    slides[i].classList.add("active-slide");
                }
            }
        }
        // Function to advance to the next set of slides
        function nextSlides() {
            slideIndex += slidesToScroll;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlides();
        }
        // Function to go to the previous set of slides
        function prevSlides() {
            slideIndex -= slidesToScroll;
            if (slideIndex < 0) {
                slideIndex = slides.length - slidesToShow;
            }
            showSlides();
        }
        // Autoplay functionality
        let autoplayInterval;

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlides, 3000); // Change slide every 3 seconds
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        startAutoplay();
        // Event listeners for navigation buttons
        nextBtn.addEventListener("click", () => {
            nextSlides();
            stopAutoplay();
            startAutoplay();
        });

        prevBtn.addEventListener("click", () => {
            prevSlides();
            stopAutoplay();
            startAutoplay();
        });
        /* For Keyboard Key Events */
        document.addEventListener("keydown", function(e) {
            const key = e.key; 
            if (key === "ArrowRight") {
                nextSlides();
                stopAutoplay();
                startAutoplay();
            } 
            else if (key === "ArrowLeft") {
                prevSlides();
                stopAutoplay();
                startAutoplay();
            } 
        });
        // Initial display
        showSlides(); 
    }