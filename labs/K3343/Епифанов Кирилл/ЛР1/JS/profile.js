const rentedProperties = JSON.parse(localStorage.getItem("rented")) || [];
const availableProperties = properties.filter(property => !rentedProperties.some(rented => rented.id === property.id));

function renderProperties(containerId, properties) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    properties.forEach(item => {
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
        container.appendChild(div);
    });
}

renderProperties('rentedProperties', rentedProperties);
renderProperties('availableProperties', availableProperties);