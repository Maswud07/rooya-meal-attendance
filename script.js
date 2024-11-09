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

  // Clear form fields
  nameInput.value = "";
  attendance.checked = false;
}


