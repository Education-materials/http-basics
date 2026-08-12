const API_URL = "http://localhost:8000/api/items";


// =========================
// CRUD PAGE
// =========================

// Read all items
async function loadItems() {

    const response = await fetch(API_URL);
    const items = await response.json();

    const list = document.getElementById("items");

    if (!list) return;

    list.innerHTML = "";

    items.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                <strong>${item.name}</strong>
                - $${item.price}
            </span>

            <span class="actions">
                <button onclick="editItem(${item.id}, '${item.name}', ${item.price})">
                    Edit
                </button>

                <button onclick="deleteItem(${item.id})">
                    Delete
                </button>
            </span>
        `;

        list.appendChild(li);
    });
}


// Create an item
async function createItem(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const price =
        Number(document.getElementById("price").value);

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            price
        })
    });

    event.target.reset();

    loadItems();
}


// Update an item
async function editItem(id, oldName, oldPrice) {

    const name =
        prompt("New name:", oldName);

    if (name === null) {
        return;
    }

    const price =
        Number(prompt("New price:", oldPrice));

    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            price
        })
    });

    loadItems();
}


// Delete an item
async function deleteItem(id) {

    const confirmed =
        confirm("Delete this item?");

    if (!confirmed) {
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadItems();
}


// =========================
// SEARCH PAGE
// =========================

async function searchItems() {

    const name =
        document.getElementById("search").value;

    const response = await fetch(
        `${API_URL}/search?name=${encodeURIComponent(name)}`
    );

    const items = await response.json();

    const results =
        document.getElementById("results");

    results.innerHTML = "";

    items.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
            `${item.name} - $${item.price}`;

        results.appendChild(li);
    });
}


// =========================
// PAGE INITIALIZATION
// =========================

// CRUD page
const itemForm = document.getElementById("item-form");

if (itemForm) {
    itemForm.addEventListener("submit", createItem);
    loadItems();
}