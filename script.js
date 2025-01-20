document.getElementById('flight-search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departure-date').value;

    fetch(`https://api.amadeus.com/v1/shopping/flight-offers?origin=${origin}&destination=${destination}&departureDate=${departureDate}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.data.forEach(flight => {
        const flightInfo = document.createElement('div');
        flightInfo.innerHTML = `
            <p>Airline: ${flight.airline}</p>
            <p>Flight Number: ${flight.flight_number}</p>
            <p>Departure Time: ${flight.departure_time}</p>
            <p>Arrival Time: ${flight.arrival_time}</p>
        `;
        resultsDiv.appendChild(flightInfo);
    });
}