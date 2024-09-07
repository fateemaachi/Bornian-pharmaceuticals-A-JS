// Handle diagnosis form submission
// Diagnosis and drug prescription data
const diagnoses = {
  "fever": "Common Cold",
  "headache": "Migraine",
  "chest pain": "Heart-related issue",
  "cough" : "Cold and Catarrh",
  "sneezing" : "Allergies"
};

const drugPrescription = {
  "Common Cold": "Paracetamol",
  "Migraine": "Ibuprofen",
  "Heart-related issue": "Please visit a physician.",
  "Cold and Catarrh" : "Delsym (syrup)",
  "Allergies" : "Piriton or Loratadine"
};

document.getElementById("diagnosis-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get symptoms from input field
  const symptoms = document.getElementById('symptoms').value.toLowerCase();

  // Determine diagnosis based on symptoms
  const diagnosis = diagnoses[symptoms] || "Please visit a physician for further examination.";
  document.getElementById('diagnosis-result').innerText = `Diagnosis: ${diagnosis}`;

  // Determine prescribed drug based on diagnosis
  administerDrugs(diagnosis);
});

// Administer drugs based on the diagnosis
function administerDrugs(diagnosis) {
  const drug = drugPrescription[diagnosis] || "No specific medication found. Please visit a physician.";
  document.getElementById('prescription-result').innerText = `Prescribed Drug: ${drug}`;
}
