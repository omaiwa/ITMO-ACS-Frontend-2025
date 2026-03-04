const API_URL = "http://localhost:3000/properties";

let properties = [];

async function loadProperties() {
    try {
        const response = await axios.get(API_URL);
        properties = response.data;
        render(properties);
    } catch (error) {
        console.error("Error loading properties:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadProperties);

function render(data) {
    results.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = "card";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Type: ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
            <p>Location: ${item.location.charAt(0).toUpperCase() + item.location.slice(1)}</p>
            <p>Price: $${item.price}/month</p>
            <img src="${item.img}" alt="${item.name}"><br>
            <a class="button" href="property.html?id=${item.id}">View Property</a>
        `;
        results.appendChild(div);
    });
}

function filterSearch() {
    const type = typeFilter.value;
    const maxPrice = +maxPriceFilter.value;
    const location = locationFilter.value;

    const filtered = properties.filter(item => {
        return (type === "" || item.type === type) && (maxPrice === 0 || item.price <= maxPrice) && 
        (location === "" || item.location === location);
    });

    render(filtered);
}

render(properties);