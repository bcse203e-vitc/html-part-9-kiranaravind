document.addEventListener("DOMContentLoaded", () => {
    const serviceButtons = document.querySelectorAll(".service-btn");
    
    serviceButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedService = button.dataset.service;
            document.getElementById("service").value = selectedService;
            window.location.href = "#booking";
        });
    });

    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        const appointmentsList = document.getElementById("appointments-list");
        appointmentsList.innerHTML = "";

        appointments.forEach(appointment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appointment.name}</td>
                <td>${appointment.service}</td>
                <td>${appointment.datetime}</td>
                <td>${appointment.status}</td>
            `;
            appointmentsList.appendChild(row);
        });
    }

    const form = document.getElementById("appointment-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const service = document.getElementById("service").value;
        const datetime = document.getElementById("datetime").value;
        const terms = document.getElementById("terms").checked;

        if (!name || !email.includes("@") || phone.length !== 10 || !service || !datetime || !terms) {
            alert("Please fill all required fields correctly!");
            return;
        }

        const appointment = { name, email, phone, service, datetime, status: "Pending" };
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        alert(`Thank you, ${name}! Your appointment for ${service} is confirmed.`);
        form.reset();
        loadAppointments();
    });

    loadAppointments();
});
