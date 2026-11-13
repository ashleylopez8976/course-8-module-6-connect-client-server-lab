const apiUrl = "http://localhost:5000/events";
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const eventList = document.querySelector("#event-list");

// Display one event on the page.
function renderEvent(event) {
    const li = document.createElement("li");
    li.textContent = event.title;
    eventList.appendChild(li);
}

// Load existing events when the page opens.
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load events.");
        }
        return response.json();
    })
    .then(events => {
        events.forEach(renderEvent);
    })
    .catch(error => {
        alert(error.message);
    });

// Send a new event to Flask when the form is submitted.
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();

    if (!title) {
        alert("Please enter an event title.");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        if (!response.ok) {
            throw new Error("Could not add the event.");
        }

        const newEvent = await response.json();
        renderEvent(newEvent);
        form.reset();
    } catch (error) {
        alert(error.message);
    }
});