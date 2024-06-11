const COHORT = "2405-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

const state = {
  //state = the data that is currently stored in our application
  events: [], //state stored in empty events array
};

// const guestList = document.querySelector("#guests");
const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

// sync state with the API and render
async function render() {
  //call getEvents to fetch event data then render
  await getEvents();
  renderEvents();
}
render();

async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json(); //turns response from server to json data held in the events state array
    state.events = json.data;
  } catch (error) {
    console.error(error);
  }
}

function renderEvents() {
  if (!state.events.length) {
    //if there are no events
    eventList.innerHTML = "<li>No Events.</li>";

    return;
  }
  const eventCards = state.events.map((events) => {
    const li = document.createElement("li");
    li.innerHTML = `<h2>${events.name}</h2>
    <p>${events.description}</p>
    <p>When: ${events.date}</p>
    <p>Where: ${events.address}</p>`;
    return li;
  });
  eventList.replaceChildren(...eventCards);
}

//create new event
async function addEvent(event) {
  event.preventDefault(); // prevent page reload

  const date = new Date(addEventForm.date.value);
  let formattedDate = date.toISOString();

  try {
    const response = await fetch(API_URL, {
      method: "POST", // send request post to the API
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cohortId: 219,
        date: formattedDate,
        description: addEventForm.description.value,
        id: 1233,
        location: addEventForm.location.value,
        name: addEventForm.name.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    render();
  } catch (error) {
    console.error(error);
  }
}
