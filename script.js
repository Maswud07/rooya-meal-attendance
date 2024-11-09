function submitForm() {
  const nameInput = document.getElementById("name");
  const attendance = document.querySelector('input[name="attendance"]:checked');
  const confirmationMessage = document.getElementById("confirmationMessage");
  const popup = document.getElementById("popup");

  if (!nameInput.value || !attendance) {
    confirmationMessage.innerText = "Please complete the form before submitting.";
    confirmationMessage.style.color = "red";
    return;
  }

  // Data to send to Google Sheets
  const formData = {
    name: nameInput.value,
    attendance: attendance.value
  };

  // Full Google Apps Script Web App URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwb6Oyo4LYA9bTRo2wJFb7TC5UXvoYNMJ4Iw5uUxzm4C03p8LwV2BSUdPlkNv2AwZ9cqw/exec';

  // Send data to Google Sheets
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      confirmationMessage.innerText = `Thank you, ${nameInput.value}! Your attendance is recorded as: ${attendance.value}.`;
      confirmationMessage.style.color = "#4caf50";

      // Show popup
      popup.style.display = "block";
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);

      // Clear form fields
      nameInput.value = "";
      attendance.checked = false;
    } else {
      confirmationMessage.innerText = "There was an issue with submission. Please try again.";
      confirmationMessage.style.color = "red";
    }
  })
  .catch(error => {
    confirmationMessage.innerText = "Error submitting form. Please check your network and try again.";
    confirmationMessage.style.color = "red";
    console.error("Error!", error);
  });
}
