document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("movement-form");
    const tableBody = document.getElementById("movement-table-body");
    const balanceSummary = document.getElementById("balance-summary");

    let totalBalance = 0;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 🔴 Evita que la página se recargue

        // Obtener los valores del formulario
        const bar = document.getElementById("bar-select").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;

        // Validar que el monto sea un número válido
        if (isNaN(amount) || amount <= 0) {
            alert("Por favor, ingresa un monto válido.");
            return;
        }

        // Agregar movimiento a la tabla
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${bar}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${category === "income" ? "Ingreso" : "Egreso"}</td>
            <td>${date}</td>
        `;
        tableBody.appendChild(row);

        // Actualizar balance
        if (category === "income") {
            totalBalance += amount;
        } else {
            totalBalance -= amount;
        }
        balanceSummary.textContent = `Balance: $${totalBalance.toFixed(2)}`;

        // Limpiar el formulario después de agregar el movimiento
        form.reset();
    });
});
