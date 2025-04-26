document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Sign-Up Modal Logic
    const signUpButtons = document.querySelectorAll(".sign-up-button");

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h3>Volunteer Sign-Up</h3>
            <form class="signup-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br>

                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone"><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector(".close-button");

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    signUpButtons.forEach(button => {
        button.addEventListener("click", openModal);
    });

    closeButton.addEventListener("click", closeModal);

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 🔹 Contact Tooltip Logic
    const contactCells = document.querySelectorAll(".contact-cell");
    const tooltip = document.createElement("div");
    tooltip.className = "contact-tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    contactCells.forEach(cell => {
        cell.addEventListener("mouseenter", () => {
            const name = cell.dataset.name;
            const phone = cell.dataset.phone;
            const email = cell.dataset.email;

            tooltip.innerHTML = `
                <strong>${name}</strong><br>
                Phone: ${phone}<br>
                Email: ${email}
            `;
            tooltip.style.display = "block";
            tooltip.style.position = "absolute";
        });

        cell.addEventListener("mousemove", (e) => {
            tooltip.style.left = e.pageX + 10 + "px";
            tooltip.style.top = e.pageY + 10 + "px";
        });

        cell.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    });

    // 🔹 Forecast Button Logic
    document.querySelectorAll('.forecast-button').forEach(button => {
        button.addEventListener('click', async () => {
            const row = button.closest('tr');
            const lat = row.querySelector('.lat').value;
            const lon = row.querySelector('.lon').value;
            const forecastBox = document.getElementById('forecast-display');
            forecastBox.innerHTML = "Loading forecast...";

            try {
                const pointRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
                const pointData = await pointRes.json();
                const forecastUrl = pointData.properties.forecast;

                const forecastRes = await fetch(forecastUrl);
                const forecastData = await forecastRes.json();

                const todayForecast = forecastData.properties.periods[0];
                forecastBox.innerHTML = `
                    <strong>Forecast for ${todayForecast.name}:</strong><br>
                    ${todayForecast.detailedForecast}
                `;
            } catch (err) {
                forecastBox.innerHTML = "Error retrieving forecast.";
                console.error(err);
            }
        });
    });
});
