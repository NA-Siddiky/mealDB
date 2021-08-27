document.getElementById("error-massage").style.display = "none";
const searchFood = async () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);

    searchField.value = "";
    document.getElementById("error-massage").style.display = "none";

    if (searchText == "") {
        alert("Please enter a name")
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data);
        }
        catch (err) {
            console.log(err);
            displayError(err);
        }

        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearchResult(data));
    }
}

const displayError = (error) => {
    document.getElementById("error-massage").style.display = "block";

}


const displaySearchResult = data => {
    // console.log(data.meals);

    // for (const meal of meals) {
    //     console.log(meal)
    // }

    const searchResult = document.getElementById("search-result");
    // console.log(searchResult);

    // searchResult.innerHTML = "";
    searchResult.textContent = "";

    if (data.meals.length == 0) {
        alt("invalid input")
    }
    else {

        data.meals.forEach(meal => {
            // console.log(meal)

            const div = document.createElement("div");
            div.classList.add("col");

            div.innerHTML = `
        <div onClick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}
                </p>
            </div>
        </div>
        `;
            searchResult.appendChild(div)
        })
    }
}

const loadMealDetail = async mailId => {
    // console.log(mailId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mailId}`

    const res = await fetch(url);
    const data = await res.json();
    displayMillDetail(data.meals[0]);

    // fetch(url).then(response => response.json()).then(data => displayMillDetail(data.meals[0]))

}


const displayMillDetail = meal => {
    console.log(meal)

    const mealDetails = document.getElementById("meal-details");
    // mealDetails.innerHTML = "";
    mealDetails.textContent = "";

    const div = document.createElement("div");

    // div.classlist.add("card");

    div.innerHTML = `
    <div class="card mb-3">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
            <a href="${meal.strYoutube}" class="btn btn-warning btn-outline-secondary">View Recipe</a>
        </div>
    </div>
    `;
    mealDetails.appendChild(div);

}