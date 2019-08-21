// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults() {
  console.log('Calculating...');
  //   UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('Interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('Monthly-payment');
  const totalPayment = document.getElementById('Total-payment');
  const totalInterest = document.getElementById('Total-Interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}
function showError(error) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';

  const ErrorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  ErrorDiv.className = 'alert alert-danger';
  // appened text to error alert
  ErrorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(ErrorDiv, heading);
  setTimeout(clearError, 3000);
  function clearError() {
    document.querySelector('.alert').remove();
  }
}
