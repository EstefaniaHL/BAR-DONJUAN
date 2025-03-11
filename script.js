// Selección de elementos del DOM
const barSelector = document.getElementById("barSelector");
const transactionForm = document.getElementById("transactionForm");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const transactionList = document.getElementById("transactionList");
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const netBalance = document.getElementById("netBalance");

// Obtener transacciones del LocalStorage
type Transactions = { amount: number; category: string; date: string };
const getTransactions = (): Transactions[] => {
    const transactions = localStorage.getItem("transactions");
    return transactions ? JSON.parse(transactions) : [];
};

// Guardar transacciones en LocalStorage
const saveTransactions = (transactions: Transactions[]) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Agregar transacción
type AddTransaction = (amount: number, category: string, date: string) => void;
const addTransaction: AddTransaction = (amount, category, date) => {
    const transactions = getTransactions();
    transactions.push({ amount, category, date });
    saveTransactions(transactions);
    renderTransactions();
};

// Eliminar transacción
type DeleteTransaction = (index: number) => void;
const deleteTransaction: DeleteTransaction = (index) => {
    const transactions = getTransactions();
    transactions.splice(index, 1);
    saveTransactions(transactions);
    renderTransactions();
};

// Renderizar transacciones en la tabla
const renderTransactions = () => {
    const transactions = getTransactions();
    transactionList.innerHTML = "";
    let incomeTotal = 0;
    let expenseTotal = 0;
    transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>$${transaction.amount}</td>
            <td>${transaction.category === "income" ? "Ingreso" : "Gasto"}</td>
            <td>${transaction.date}</td>
            <td><button onclick="deleteTransaction(${index})">Eliminar</button></td>
        `;
        transactionList.appendChild(row);
        if (transaction.category === "income") {
            incomeTotal += transaction.amount;
        } else {
            expenseTotal += transaction.amount;
        }
    });
    totalIncome.textContent = `$${incomeTotal}`;
    totalExpense.textContent = `$${expenseTotal}`;
    netBalance.textContent = `$${incomeTotal - expenseTotal}`;
};

// Evento de envío del formulario
transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    if (amount > 0 && date) {
        addTransaction(amount, category, date);
        transactionForm.reset();
    }
});

// Renderizar las transacciones al cargar la página
renderTransactions();
