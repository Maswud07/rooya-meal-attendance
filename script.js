function submitForm() {
  const nameField = document.getElementById("name");
  const attendanceYes = document.getElementById("yes");
  const attendanceNo = document.getElementById("no");

  // Ensure name field exists and has a value
  if (nameField && nameField.value.trim() !== "") {
    const name = nameField.value.trim();

    // Ensure an attendance option is selected
    let attendance;
    if (attendanceYes.checked) {
      attendance = attendanceYes.value;
    } else if (attendanceNo.checked) {
      attendance = attendanceNo.value;
    } else {
      alert("Please select if you'll be attending.");
      return; // Exit the function if no attendance option is selected
    }

    // Sending data to Google Sheets using the Apps Script Web App URL
    fetch('https://script.google.com/macros/s/AKfycbxm5RjPxiH7nnnkeiuSLy2nO7Q-gMcbDAAT6teQKTg7/exec', { // Replace with your Google Apps Script URL
      method: 'POST',
      body: new URLSearchParams({
        'name': name,
        'attendance': attendance
      }),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      document.getElementById("confirmationMessage").textContent = 
        `Thank you, ${name}. Your attendance is marked as '${attendance}' for tomorrow.`;
      showPopup();
      document.getElementById("attendanceForm").reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an issue with the submission. Please try again.');
    });
  } else {
    alert("Please enter your name.");
  }
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";

  // Hide popup after 2 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

