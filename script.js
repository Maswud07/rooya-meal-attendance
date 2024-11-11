function submitForm() {
  const nameInput = document.getElementById("name");
  const attendance = document.querySelector('input[name="attendance"]:checked');
  const confirmationMessage = document.getElementById("confirmationMessage");
  const popup = document.getElementById("popup");

  // Check if the name and attendance option are provided
  if (!nameInput.value || !attendance) {
    confirmationMessage.innerText = "Please complete the form before submitting.";
    confirmationMessage.style.color = "red";
    return;
  }

  // Show confirmation message in the confirmationMessage div
  confirmationMessage.innerText = `Thank you, ${nameInput.value}! Your attendance is recorded as: ${attendance.value}.`;
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
    date: new Date().toLocaleDateString() // Capture the current date
  };

 console.log("Submitting data:", data);
 fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbzza-j46W_dhuCSNxq4xz96yzCPydn1PO5Audy6bFAJ2SketyZ2EgccDm20FzZonAR6/exec/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => {
    console.log("Attendance saved:", result);
  })
  .catch(error => console.error("Error saving attendance:", error));

  // Clear form fields
  nameInput.value = "";
  attendance.checked = false;
}
