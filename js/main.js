let moviesArray = [];    //for all movies
let myMoviesShow = [];
let pageArray = [] //for that pade movies
async function getMovies(movies) {
    let response;
    let result;
    if (movies != "trending") {
        response = await fetch(`https://api.themoviedb.org/3/movie/${movies}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1ZJhYL-7Yqyau0_gfuW3IQgsVMo1wm-UAUwhWnCTavY10K0XK-Mk-QVRo`)

    }
    else {
        response = await fetch(`https://api.themoviedb.org/3/trending/movies/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1Q5HJTaxBd7hrjXmLkFcoJJ25Z1fUgOR3wech4mO_QCiIxepqBHM8DHn8`)
    }
    result = await response.json()
    let moviesResults = result.results;
    let movieTitle;
    let movieDate;
    for (let i = 0; i < moviesResults.length; i++) {
        movieTitle = moviesResults[i].title;
        if (moviesResults[i].title == undefined) {
            movieTitle = moviesResults[i].name;
        }
        movieDate = moviesResults[i].release_date;
        if (moviesResults[i].release_date == undefined) {
            movieDate = moviesResults[i].first_air_date;
        }
        let description = moviesResults[i].overview;
        let rate = moviesResults[i].vote_average;
        let image = moviesResults[i].poster_path;
        let movies = {
            title: movieTitle,
            overview: description,
            vote_average: rate,
            poster_path: image,
            date: movieDate
        }
        myMoviesShow.push(movies)
        moviesArray.push(movies)
    }
    pageArray = myMoviesShow;
    myMoviesShow = [];
    let temp = ``;
    for (let i = 0; i < pageArray.length; i++) {
        temp += `<div class="col-lg-4 col-md-6 mb-4 moviePoster">
            <div class="position-relative">
                <img src="https://image.tmdb.org/t/p/w500${pageArray[i].poster_path}" class="rounded w-100">
                <div
                    class="layer position-absolute rounded text-center d-flex flex-column px-1 justify-content-center h-100">
                    <h2 class="display-6">${pageArray[i].title}</h2>
                    <p>${pageArray[i].overview}</p>
                    <small>${pageArray[i].vote_average}</small>
                    <small>${pageArray[i].date}</small>
                </div>
            </div>
        </div>`

    }
    $("#movies").html(temp);
}
getMovies("now_playing")
$(".liItem").each(function () { //to get all movies by putting it in moviesArray[]
    getMovies($(this).attr("id"));
})

//navbar
$(".liItem").each(function () {
    $(this).click(function () {
        let films = $(this).attr("id");
        getMovies(films);
    })
})


let leftSide = $(".navItems").outerWidth()
console.log();
$(".navBox i").addClass("fa-align-justify")
$(".navBox i").removeClass("fa-xmark")
$(".navBox i").click(function () {
    if ($("#cornerNav").css("left") == `-240px`) {
        console.log("ok");
        $("#cornerNav").animate({ left: "0px" })
        $(".nav ul li").animate({ opacity: "1", paddingTop: "20px" }, 1100)
        
        $(this).addClass("fa-xmark")
        $(this).removeClass("fa-align-justify")
    }
    else {
        $("#cornerNav").animate({ left: `-${leftSide}px` })
        $(this).addClass("fa-align-justify")
        $(this).removeClass("fa-xmark")
        $(".nav ul li").animate({ opacity: "0", paddingTop: "500px" }, 500)
    }
})
if($("#cornerNav").css({ left: `-${leftSide}px` })){
    $(".nav ul li").animate({ opacity: "0", paddingTop: "500px" }, 500)
}

//search
function search(value) { //in that page
    let temp = ``;
    for (let i = 0; i < pageArray.length; i++) {
        if (pageArray[i].title.toLowerCase().includes(value.toLowerCase())) {
            temp += `<div class="col-lg-4 col-md-6 mb-4 moviePoster">
            <div class="position-relative">
                <img src="https://image.tmdb.org/t/p/w500${pageArray[i].poster_path}" class="rounded w-100">
                <div
                    class="layer position-absolute rounded text-center d-flex flex-column px-1 justify-content-center h-100">
                    <h2 class="display-6">${pageArray[i].title}</h2>
                    <p>${pageArray[i].overview}</p>
                    <small>${pageArray[i].vote_average}</small>
                    <small>${pageArray[i].date}</small>
                </div>
            </div>
        </div>`
        }
    }
    $("#movies").html(temp);

}

function searchAllMovies(value) {   //all filmes
    let temp = ``;
    for (let i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i].title.toLowerCase().includes(value.toLowerCase())) {
            temp += `<div class="col-lg-4 col-md-6 mb-4 moviePoster">
            <div class="position-relative">
                <img src="https://image.tmdb.org/t/p/w500${moviesArray[i].poster_path}" class="rounded w-100">
                <div
                    class="layer position-absolute rounded text-center d-flex flex-column px-1 justify-content-center h-100">
                    <h2 class="display-6">${moviesArray[i].title}</h2>
                    <p>${moviesArray[i].overview}</p>
                    <small>${moviesArray[i].vote_average}</small>
                    <small>${moviesArray[i].date}</small>
                </div>
            </div>
        </div>`
        }
    }
    $("#movies").html(temp);
}

$("#searchByWord").keyup(function () {
    search($(this).val())
})
$("#search").keyup(function () {
    searchAllMovies($(this).val())
})

//contact us
$("#contact input").keyup(function () {
    let selectorInput = $(this).attr("name")
    if (selectorInput == "name") {
        validInput(/^[A-Za-z0-9]{3,10}$/, ".name")
    }
    else if (selectorInput == "Email") {
        validInput(/^[A-Za-z]\w{2,9}@[A-za-z]{3,7}\.[A-Za-z]{2,3}$/, ".Email")
    }
    else if (selectorInput == "Phone") {
        validInput(/^01(1|2|5|0)[0-9]{8}$/, ".Phone")
    }
    else if (selectorInput == "Age") {
        validInput(/^([1-9][0-9]|100)$/, ".Age") //from 10 to 100
    }
    else if (selectorInput == "Password") {
        validInput(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, ".Password")
        let newPassword = $(this).val()

        if ($(this).parent().next().find("input").val() == newPassword) {
            console.log("true");
            $(this).parent().next().find(".Repassword").css({ "display": "none" })
        }
    }
    else if (selectorInput == "Repassword") {
        let password = $(this).parent().prev().find("input").val()
        if ($(this).val() == password) {
            $(this).siblings(".Repassword").css({ "display": "none" })
        }
        else {
            $(this).siblings(".Repassword").css({ "display": "block" })
        }
    }

})
//validation function
function validInput(reg, inputId) {
    var regx = reg;
    $("#contact input").each(function () {
        let valueInput = $(this).val()
        if (regx.test(valueInput) == true) {
            $(this).siblings(inputId).css({ "display": "none" })
        }
        else {
            $(this).siblings(inputId).css({ "display": "block" })
        }
    })
}
