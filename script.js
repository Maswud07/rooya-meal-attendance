// script.js

// Function to set tomorrow's date as default in the date input
function setDefaultDate() {
  const dateInput = document.getElementById("date");
  const today = new Date();
  today.setDate(today.getDate() + 1); // Set to tomorrow's date
  const tomorrow = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  dateInput.value = tomorrow; // Set as default value
}

// Call the setDefaultDate function when the page loads
window.onload = setDefaultDate;

function submitForm() {
  const nameInput = document.getElementById("name");
  const attendance = document.querySelector('input[name="attendance"]:checked');
  const dateInput = document.getElementById("date");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const popup = document.getElementById("popup");

  // Check if name, date, and attendance option are provided
  if (!nameInput.value || !dateInput.value || !attendance) {
    confirmationMessage.innerText = "Please complete the form before submitting.";
    confirmationMessage.style.color = "red";
    return;
  }

  // Show confirmation message
  confirmationMessage.innerText = `Thank you, ${nameInput.value}! Your attendance is recorded as: ${attendance.value} on ${dateInput.value}.`;
  confirmationMessage.style.color = "#4caf50";

  // Display popup
  popup.style.display = "block";

  // Hide popup after 2 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);

  // Save data to Google Sheets
  const data = {
    name: nameInput.value,
    attendance: attendance.value,
    date: dateInput.value // Capture the selected date
  };

  fetch("https://script.google.com/macros/s/AKfycbxWEStq1OaqRdjCbQliM4d123OrvA9eIXhLK_mR378p7OzXrJ2seZ-J-9DCjzT1ag9s/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors",
    body: JSON.stringify(data)
  })
  .then(response => console.log("Response from server:", response))
  .catch(error => console.error("Error:", error));

  // Clear form fields
  nameInput.value = "";
  dateInput.value = "";
  attendance.checked = false;
}

