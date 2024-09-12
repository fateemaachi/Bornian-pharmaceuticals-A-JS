// Physicians data
const physicians = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
  { id: 2, name: "Dr. Lee", specialty: "Neurology" },
  { id: 3, name: "Dr. Patel", specialty: "Oncology" },
  { id: 4, name: "Dr. Johnson", specialty: "General Practitioner" },
  { id: 5, name: "Dr. Kim", specialty: "Gynecology" }
];

// Generate time slots between 9:00 AM and 6:00 PM
function generateTimeSlots() {
  const startTime = 9;  // Start at 9 AM
  const endTime = 18;   // End at 6 PM
  let timeSlots = [];
  for (let hour = startTime; hour <= endTime; hour++) {
    const time12HourFormat = convertTo12HourFormat(hour);
    timeSlots.push(time12HourFormat);
  }
  return timeSlots;
}

// Convert 24-hour time to 12-hour format (e.g., 14:00 to 2:00 PM)
function convertTo12HourFormat(hour) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = (hour % 12) || 12; // Convert 24-hour to 12-hour
  return `${hour12}:00 ${suffix}`;
}

// Display available physicians
function displayAvailablePhysicians() {
  const selectPhysician = document.getElementById('physician-select');
  physicians.forEach(doc => {
    let option = document.createElement('option');
    option.value = doc.id;
    option.text = `${doc.name} (${doc.specialty})`;
    selectPhysician.appendChild(option);
  });
}

// Populate available times
function populateTimeSlots() {
  const timeSelect = document.getElementById('appointment-time');
  timeSelect.innerHTML = '';  // Clear existing times
  const timeSlots = generateTimeSlots();
  timeSlots.forEach(time => {
    let option = document.createElement('option');
    option.value = time;
    option.text = time;
    timeSelect.appendChild(option);
  });
}

// Update available times based on the selected physician
function updateAvailableTimes() {
  const physicianId = document.getElementById('physician-select').value;
  const timeSelect = document.getElementById('appointment-time');
  timeSelect.innerHTML = ''; // Clear existing times

  if (physicianId) {
    const selectedDoc = physicians.find(doc => doc.id == physicianId);
    if (selectedDoc) {
      const timeSlots = generateTimeSlots(); // Assuming all doctors have the same time slots
      timeSlots.forEach(time => {
        let option = document.createElement('option');
        option.value = time;
        option.text = time;
        timeSelect.appendChild(option);
      });
    }
  }
}

// Validate input fields
function validateInputFields(name, age, phone, email, date, slot) {
  if (!name || !age || !phone || !email || !date || !slot) {
    alert('Please fill in all fields.');
    return false;
  }
  if (!validateAge(age)) {
    alert('Please enter a valid age (minimum 5).');
    return false;
  }
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  if (!validatePhone(phone)) {
    alert('Please enter a valid phone number (11-14 characters, including optional + to include country code).');
    return false;
  }
  return true;
}

// Validate Email Input
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

// Validate Phone Number Input
function validatePhone(phone) {
  const re = /^\+?\d{11,14}$/;
  return re.test(phone);
}

// Validate Age Input
function validateAge(age) {
  const re = /^\d+$/;
  return re.test(age) && parseInt(age, 10) >= 5;
}

// Handle appointment form submission
document.getElementById("appointment-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const appointmentDate = document.getElementById("appointment-date").value;
  const appointmentTime = document.getElementById("appointment-time").value;
  const physicianId = document.getElementById('physician-select').value;

  if (validateInputFields(name, age, phone, email, appointmentDate, appointmentTime) && physicianId) {
    const selectedDoc = physicians.find(doc => doc.id == physicianId);
    const receipt = `
        <div>
          
          <p class="mt-3 capitalize">Name: ${name}</p>
          <p class="mt-3">Age: ${age}</p>
          <p class="mt-3">Phone: ${phone}</p>
          <p class="mt-3">Email: ${email}</p>
          <p class="mt-3">Appointment with: ${selectedDoc.name}</p>
          <p class="mt-3">Specialty: ${selectedDoc.specialty}</p>
          <p class="mt-3">Date: ${appointmentDate}</p>
          <p class="mt-3">Time: ${appointmentTime}</p>
          <a href="" class="mt-3 text-center text-white flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</a>
          
        </div>
    `;
    document.getElementById("appt").style.display = "none";
    document.getElementById("appointment-form").style.display = "none";
    document.getElementById('appointment-receipt').innerHTML = receipt;
    document.getElementById("confirmed").classList.remove("hidden");
    document.getElementById('appointment-receipt').classList.remove("hidden");
  } else {
    alert("Please select a physician, date, and time.");
  }
});

// // Get a diagnosis and administer drugs based on symptoms
// function getDiagnosis() {
//   const symptoms = document.getElementById('symptoms').value.toLowerCase();
//   const diagnosis = diagnoses[symptoms] || "Please visit a physician for further examination.";
//   document.getElementById('diagnosis-result').innerText = `Diagnosis: ${diagnosis}`;
//   administerDrugs(diagnosis);
// }

// // Administer drugs based on the diagnosis
// function administerDrugs(diagnosis) {
//   const drug = drugPrescription[diagnosis] || "No specific medication found. Please visit a physician.";
//   document.getElementById('prescription-result').innerText = `Prescribed Drug: ${drug}`;
// }

// Initialize form options on page load
window.onload = function() {
  displayAvailablePhysicians();
  populateTimeSlots();
};

// Event listener to update available times when a physician is selected
document.getElementById('physician-select').addEventListener('change', updateAvailableTimes);

// Block weekends in the date picker
document.getElementById('appointment-date').addEventListener('input', function() {
  const selectedDate = new Date(this.value);
  const day = selectedDate.getDay();
  if (day === 0 || day === 6) {  // Sunday (0) or Saturday (6)
    alert("Weekends are not available. Please select a weekday.");
    this.value = '';
  }
});
