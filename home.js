const ValidPin = 1234;

// Transaction history storage
let transactionHistory = [];

const serviceButtons = ["add-button", "cashout-button", "transfer-money-button", "get-bonus-button", "pay-bill-button", "transaction-button"];
function setActiveButton(activeId) {
    serviceButtons.forEach(function (id) {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === activeId) {
            el.style.borderColor = "#0874f2";
            el.style.backgroundColor = "#0874f20d";
        } else {
            el.style.borderColor = "";
            el.style.backgroundColor = "";
        }
    });
}
function showToast(message) {
    const toast = document.getElementById("toast");
    document.getElementById("toast-message").innerText = message;
    toast.classList.remove("hidden");
    setTimeout(function () {
        toast.classList.add("hidden");
    }, 3000);
}

function getInputValueNumber(id) {
    const inputField = document.getElementById(id);
    const inputFieldValue = inputField.value;
    const inputFieldValueNumber = parseInt(inputFieldValue);
    return inputFieldValueNumber;
}
function getInputValue(id) {
    const inputField = document.getElementById(id);
    const inputFieldValue = inputField.value;
    return inputFieldValue;
}

function getInnerText(id) {
    const element = document.getElementById(id);
    const elementValue = element.innerText;
    const elementValueNumber = parseInt(elementValue);
    return elementValueNumber;
}

function setInnerText(value) {
    const AvailableBalanceElement = document.getElementById("available-balance");
    AvailableBalanceElement.innerText = value;
}

// Transaction history functions
function addTransaction(type, amount, details) {
    const transaction = {
        type: type,
        amount: amount,
        details: details,
        date: new Date().toLocaleString()
    };
    transactionHistory.unshift(transaction);
    // Keep only last 50 transactions
    if (transactionHistory.length > 50) {
        transactionHistory = transactionHistory.slice(0, 50);
    }
}

function renderTransactions(showAll = false) {
    const list = document.getElementById("transaction-list");
    const noTransactions = document.getElementById("no-transactions");
    
    if (transactionHistory.length === 0) {
        list.innerHTML = '<div class="text-center text-gray-500 py-8" id="no-transactions">No transactions yet</div>';
        return;
    }
    
    const transactionsToShow = showAll ? transactionHistory : transactionHistory.slice(0, 5);
    if (noTransactions) {
        noTransactions.style.display = "none";
    }
    
    list.innerHTML = transactionsToShow.map(function(t) {
        const isCredit = t.type === "Add Money" || t.type === "Bonus";
        const amountClass = isCredit ? "text-green-600" : "text-red-600";
        const amountPrefix = isCredit ? "+" : "-";
        const iconSrc = "assets/wallet1.png";
        
        return '<div class="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0">' +
            '<img src="' + iconSrc + '" class="w-10 h-10 rounded-full object-cover" alt="Wallet">' +
            '<div class="flex-1 min-w-0">' +
                '<div class="flex justify-between items-start">' +
                    '<span class="font-semibold text-gray-800">' + t.type + '</span>' +
                    '<span class="' + amountClass + ' font-bold">' + amountPrefix + '$' + t.amount + '</span>' +
                '</div>' +
                '<p class="text-sm text-gray-500 mt-1">' + t.details + '</p>' +
                '<p class="text-xs text-gray-400 mt-1">' + t.date + '</p>' +
            '</div>' +
        '</div>';
    }).join("");
}

function showTransactionHistory() {
    const addParent = document.getElementById("add-money-parent");
    const cashParent = document.getElementById("cash-out-parent");
    const transferParent = document.getElementById("transfer-money-parent");
    const bonusParent = document.getElementById("get-bonus-parent");
    const payBillParent = document.getElementById("pay-bill-parent");
    const transactionParent = document.getElementById("transaction-parent");
    
    const wasHidden = transactionParent.classList.contains("hidden");
    addParent.classList.add("hidden");
    cashParent.classList.add("hidden");
    transferParent.classList.add("hidden");
    bonusParent.classList.add("hidden");
    payBillParent.classList.add("hidden");
    
    if (wasHidden) { 
        transactionParent.classList.remove("hidden"); 
        setActiveButton("transaction-button");
        renderTransactions(false);
    } else { 
        transactionParent.classList.add("hidden"); 
        setActiveButton(null);
    }
}

document.getElementById("add-money-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const bank = document.getElementById("bank").value;
    const accountNumber = document.getElementById("bank-account-number").value;
    const amount = getInputValueNumber("amount");
    const pin = getInputValueNumber("add-pin-number");
    const availableBalance = getInnerText("available-balance");

    if (accountNumber.length < 11) {
        alert("please provide valid account number");
        return;
    }
    if (pin != ValidPin) {
        alert("please provide valid pin number");
        return;
    }
    const availableNewBalance = amount + availableBalance;
    setInnerText(availableNewBalance);
    addTransaction("Add Money", amount, "Added from " + bank + " (" + accountNumber + ")");
    showToast("Money added successfully!");
    document.getElementById("bank-account-number").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("add-pin-number").value = "";
});

const ValidPin2 = 1234;
document.getElementById("cash-out-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const agentNumber = document.getElementById("agent-number").value;
    const amount = getInputValueNumber("withdraw-amount");
    const availableBalance = getInnerText("available-balance");
    const pin = getInputValueNumber("add-pin-number2");

    if (agentNumber.length < 11) {
        alert("please provide valid account number");
        return;
    }
    if (pin != ValidPin2) {
        alert("please provide valid pin number");
        return;
    }
    const availableNewBalance = availableBalance - amount;
    setInnerText(availableNewBalance);
    addTransaction("Cash Out", amount, "Withdrawn to agent " + agentNumber);
    showToast("Cash out successful!");
    document.getElementById("agent-number").value = "";
    document.getElementById("withdraw-amount").value = "";
    document.getElementById("add-pin-number2").value = "";
});

document.getElementById("logout-button").addEventListener("click", function () {
    window.location.href = "./index.html";
});

document.getElementById("add-button").addEventListener("click", function () {
    const addParent = document.getElementById("add-money-parent");
    const cashParent = document.getElementById("cash-out-parent");
    const transferParent = document.getElementById("transfer-money-parent");
    const bonusParent = document.getElementById("get-bonus-parent");
    const payBillParent = document.getElementById("pay-bill-parent");
    const transactionParent = document.getElementById("transaction-parent");
    const wasHidden = addParent.classList.contains("hidden");
    cashParent.classList.add("hidden");
    transferParent.classList.add("hidden");
    bonusParent.classList.add("hidden");
    payBillParent.classList.add("hidden");
    transactionParent.classList.add("hidden");
    if (wasHidden) { addParent.classList.remove("hidden"); setActiveButton("add-button"); }
    else { addParent.classList.add("hidden"); setActiveButton(null); }
});

document.getElementById("cashout-button").addEventListener("click", function () {
    const addParent = document.getElementById("add-money-parent");
    const cashParent = document.getElementById("cash-out-parent");
    const transferParent = document.getElementById("transfer-money-parent");
    const bonusParent = document.getElementById("get-bonus-parent");
    const payBillParent = document.getElementById("pay-bill-parent");
    const transactionParent = document.getElementById("transaction-parent");
    const wasHidden = cashParent.classList.contains("hidden");
    addParent.classList.add("hidden");
    transferParent.classList.add("hidden");
    bonusParent.classList.add("hidden");
    payBillParent.classList.add("hidden");
    transactionParent.classList.add("hidden");
    if (wasHidden) { cashParent.classList.remove("hidden"); setActiveButton("cashout-button"); }
    else { cashParent.classList.add("hidden"); setActiveButton(null); }
});

document.getElementById("transfer-money-button").addEventListener("click", function () {
    const addParent = document.getElementById("add-money-parent");
    const cashParent = document.getElementById("cash-out-parent");
    const transferParent = document.getElementById("transfer-money-parent");
    const bonusParent = document.getElementById("get-bonus-parent");
    const payBillParent = document.getElementById("pay-bill-parent");
    const transactionParent = document.getElementById("transaction-parent");
    const wasHidden = transferParent.classList.contains("hidden");
    addParent.classList.add("hidden");
    cashParent.classList.add("hidden");
    bonusParent.classList.add("hidden");
    payBillParent.classList.add("hidden");
    transactionParent.classList.add("hidden");
    if (wasHidden) { transferParent.classList.remove("hidden"); setActiveButton("transfer-money-button"); }
    else { transferParent.classList.add("hidden"); setActiveButton(null); }
});

document.getElementById("get-bonus-button").addEventListener("click", function () {
    const addParent = document.getElementById("add-money-parent");
    const cashParent = document.getElementById("cash-out-parent");
    const transferParent = document.getElementById("transfer-money-parent");
    const bonusParent = document.getElementById("get-bonus-parent");
    const payBillParent = document.getElementById("pay-bill-parent");
    const transactionParent = document.getElementById("transaction-parent");
    const wasHidden = bonusParent.classList.contains("hidden");
    addParent.classList.add("hidden");
    cashParent.classList.add("hidden");
    transferParent.classList.add("hidden");
    payBillParent.classList.add("hidden");
    transactionParent.classList.add("hidden");
    if (wasHidden) { bonusParent.classList.remove("hidden"); setActiveButton("get-bonus-button"); }
    else { bonusParent.classList.add("hidden"); setActiveButton(null); }
});

document.getElementById("pay-bill-button").addEventListener("click", function () {
    const addParent = document.getElementById("add-money-parent");
    const cashParent = document.getElementById("cash-out-parent");
    const transferParent = document.getElementById("transfer-money-parent");
    const bonusParent = document.getElementById("get-bonus-parent");
    const payBillParent = document.getElementById("pay-bill-parent");
    const transactionParent = document.getElementById("transaction-parent");
    const wasHidden = payBillParent.classList.contains("hidden");
    addParent.classList.add("hidden");
    cashParent.classList.add("hidden");
    transferParent.classList.add("hidden");
    bonusParent.classList.add("hidden");
    transactionParent.classList.add("hidden");
    if (wasHidden) { payBillParent.classList.remove("hidden"); setActiveButton("pay-bill-button"); }
    else { payBillParent.classList.add("hidden"); setActiveButton(null); }
});


document.getElementById("transaction-button").addEventListener("click", function () {
    showTransactionHistory();
});

document.getElementById("view-all-transactions-btn").addEventListener("click", function () {
    renderTransactions(true);
});

document.getElementById("transfer-money-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const accountNumber = document.getElementById("transfer-account-number").value;
    const amount = getInputValueNumber("transfer-amount");
    const availableBalance = getInnerText("available-balance");
    const pin = getInputValueNumber("transfer-pin-number");

    if (accountNumber.length < 11) {
        alert("please provide valid account number");
        return;
    }
    if (pin != ValidPin) {
        alert("please provide valid pin number");
        return;
    }
    const availableNewBalance = availableBalance - amount;
    setInnerText(availableNewBalance);
    addTransaction("Transfer Money", amount, "Transferred to account " + accountNumber);
    showToast("Transfer successful!");
    document.getElementById("transfer-account-number").value = "";
    document.getElementById("transfer-amount").value = "";
    document.getElementById("transfer-pin-number").value = "";
});

document.getElementById("get-bonus-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const bonusCode = document.getElementById("bonus-code").value;
    if (!bonusCode) {
        alert("please enter bonus code");
        return;
    }
    showToast("Bonus code applied successfully!");
    addTransaction("Bonus", 500, "Bonus code applied: " + bonusCode);
    const bonusBalance = getInnerText("available-balance");
    setInnerText(bonusBalance + 500);
    document.getElementById("bonus-code").value = "";
});

document.getElementById("pay-bill-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const biller = document.getElementById("biller-select").value;
    const accountNumber = document.getElementById("biller-account-number").value;
    const amount = getInputValueNumber("pay-bill-amount");
    const pin = getInputValueNumber("pay-bill-pin");
    const availableBalance = getInnerText("available-balance");

    if (accountNumber.length < 11) {
        alert("please provide valid biller account number");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("please provide a valid amount");
        return;
    }
    if (amount > availableBalance) {
        alert("insufficient balance");
        return;
    }
    if (pin != ValidPin) {
        alert("please provide valid pin number");
        return;
    }
    setInnerText(availableBalance - amount);
    addTransaction("Pay Bill", amount, "Paid bill to " + biller + " (" + accountNumber + ")");
    showToast("Bill paid successfully to " + biller + "!");
    document.getElementById("biller-account-number").value = "";
    document.getElementById("pay-bill-amount").value = "";
    document.getElementById("pay-bill-pin").value = "";
    document.getElementById("biller-select").value = "";
});