document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const clearButton = document.getElementById("clear-button");
    const searchResults = document.getElementById("search-results");
    

    // Fetch the JSON data
    let travelData = {};
    fetch("travel_api.json")
        .then(response => response.json())
        .then(data => {
            travelData = data;
        })
        .catch(error => console.error("Error fetching data:", error));

    // Function to display search results
    function displayResults(results) {
        searchResults.innerHTML = ""; // Clear previous results

        if (results.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.forEach(item => {
            const resultCard = document.createElement("div");
            resultCard.classList.add("result-card");
            resultCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            searchResults.appendChild(resultCard);
        });
    }

    // Function to handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (!searchTerm) return;

        let results = [];

        // Search in countries, cities, temples, and beaches
        travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(searchTerm)) {
                    results.push(city);
                }
            });
        });

        travelData.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(searchTerm)) {
                results.push(temple);
            }
        });

        travelData.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(searchTerm)) {
                results.push(beach);
            }
        });

        displayResults(results);
    }

    // Function to clear results
    function clearResults() {
        searchInput.value = ""; // Clear search input
        resultsContainer.innerHTML = ""; // Clear results display
    }

    // Event listeners
    searchButton.addEventListener("click", handleSearch);
    clearButton.addEventListener("click", clearResults);
});

if (searchValue.includes("beach")) {
    console.log("Searching for beaches");
    // Search through beaches
    travelHubData.beaches.forEach(beach => {
        filteredResults.push({
            title: beach.name,
            description: beach.description,
            imageUrl: beach.imageUrl
        });
    });
} else if (searchValue.includes("temple")) {
    console.log("Searching for temples");
    // Search through temples
    travelHubData.temples.forEach(temple => {
        filteredResults.push({
            title: temple.name,
            description: temple.description,
            imageUrl: temple.imageUrl
        });
    });
} else {
    console.log("Searching for countries and cities");
    // Search through countries and their cities
    travelHubData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchValue)) {
            country.cities.forEach(city => {
                filteredResults.push({
                    title: city.name,
                    description: city.description,
                    imageUrl: city.imageUrl
                });
            });
        }
    });
}

