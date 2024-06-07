// Define an array of sample quotes

const backendLocation =
  // "https://ip5ah4pm35.execute-api.us-east-1.amazonaws.com/";
  // "http://localhost:3000/";
  "https://1974lyrsva.execute-api.ap-south-1.amazonaws.com";

quotes = []

async function getQuotes() {
  await fetch(backendLocation)
    .then((res) => res.json())
    .then((data) => {
      quotes = data;
    })
    .catch((err) => alert(err));
}

async function postQuote(quote, passkey) {
  await fetch(backendLocation, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: quote, passkey: passkey}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getQuotes();
    })
    .catch((err) => console.log(err));

}

// Function to display a random quote
async function displayRandomQuote() {
  await getQuotes();
  const quoteElement = document.getElementById("quote");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex].value;
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  const newQuote = document.getElementById("newQuote").value;
  const passkey = document.getElementById("passkey").value;
  if (newQuote.trim() === "") {
    alert("Please enter a valid quote.");
    return;
  }
  if (passkey.trim() === "") {
    alert("Please enter a valid quote.");
    return;
  }
  await postQuote(newQuote, passkey);
  // Optionally, you can clear the textarea after submission
  document.getElementById("newQuote").value = "";
  document.getElementById("passkey").value = "";
  alert("Thank you for your submission!");
}

// Event listener for form submission
document
  .getElementById("quoteForm")
  .addEventListener("submit", handleFormSubmit);

// Display a random quote when the page loads
window.onload = displayRandomQuote;