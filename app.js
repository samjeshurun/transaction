function updateBalance() {
    const balance = localStorage.getItem('balance') || 0;
    document.querySelectorAll('#balance-amount').forEach(el => el.textContent = balance);
  }
  
  function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  }
  
  function saveTransaction(type, amount) {
    const transactions = getTransactions();
    transactions.push({
      type,
      amount,
      date: new Date().toLocaleString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  function displayTransactions(filterType) {
    const container = document.getElementById('transaction-list');
    if (!container) return;
  
    const transactions = getTransactions().filter(t => t.type === filterType);
    container.innerHTML = '';
  
    if (transactions.length === 0) {
      container.innerHTML = '<p>No transactions yet.</p>';
      return;
    }
  
    transactions.reverse().forEach(t => {
      const div = document.createElement('div');
      div.className = `transaction ${t.type}`;
      div.textContent = `${t.date} - ₹${t.amount}`;
      container.appendChild(div);
    });
  }
  
  function addIncome() {
    const input = document.getElementById('amount');
    let amount = parseFloat(input.value);
    if (isNaN(amount) || amount <= 0) return alert('Enter a valid income');
  
    let current = parseFloat(localStorage.getItem('balance') || 0);
    const newBalance = (current + amount).toFixed(2);
    localStorage.setItem('balance', newBalance);
    saveTransaction('income', amount.toFixed(2));
  
    input.value = '';
    updateBalance();
    displayTransactions('income');
  }
  
  function addExpense() {
    const input = document.getElementById('amount');
    let amount = parseFloat(input.value);
    if (isNaN(amount) || amount <= 0) return alert('Enter a valid expense');
  
    let current = parseFloat(localStorage.getItem('balance') || 0);
    const newBalance = (current - amount).toFixed(2);
    localStorage.setItem('balance', newBalance);
    saveTransaction('expense', amount.toFixed(2));
  
    input.value = '';
    updateBalance();
    displayTransactions('expense');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
    const page = window.location.pathname;
    if (page.includes('income')) displayTransactions('income');
    if (page.includes('expense')) displayTransactions('expense');
  });