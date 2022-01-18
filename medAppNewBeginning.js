//const button = document.getElementById('new prescription');

function newPatient() {
  const addPatient = document.getElementById('newPtDemographics');
  addPatient.style.display = 'block';
}

function findPatient() {
  //read name and retrieve patient object from backend from patients object and
  //display demographic information
  const name = document.getElementById('search').value;
  let patients = localStorage.getItem('patients');
  patients = JSON.parse(patients);
  let patient = patients[name];
  nameDisplay = document.getElementById('nameDisplay');
  ageDisplay = document.getElementById('ageDisplay');
  nameDisplay.innerHTML = 'Name: ' + name;
  ageDisplay.innerHTML = 'Age: ' + patient.age;
  //end of section

  //retrieve display prescription list
  patient.prescriptions.forEach((prescription) => {
    const div = document.getElementById('prescriptions');
    const newPrescription = document.createElement('div');
    newPrescription.classList.add('prescription');
    newPrescription.innerHTML =
      'Drug: ' +
      prescription.drug +
      ' Dosage: ' +
      prescription.dosage +
      ' ' +
      prescription.measurement;
    div.appendChild(newPrescription);
  });
  //end of section

  var currentNote = document.getElementById('currentNote');
  currentNote.innerHTML = ' ';

  let i = 0;
  console.log(patients[name].notes[0].subjective);
  var div = document.getElementById('currentNote');
  var subjectiveElement = document.createElement('div');
  subjectiveElement.classList.add('current-note-sub', 'content-1');
  subjectiveElement.innerHTML = 'Subjective: ' + patient.notes[i].subjective;
  div.appendChild(subjectiveElement);
  const objectiveElement = document.createElement('div');
  objectiveElement.classList.add('current-note-sub', 'content-1');
  objectiveElement.innerHTML = 'objective: ' + patient.notes[i].objective;
  div.appendChild(objectiveElement);
  const assessmentElement = document.createElement('div');
  assessmentElement.classList.add('current-note-sub', 'content-1');
  assessmentElement.innerHTML = 'Assessment: ' + patient.notes[i].assessment;
  div.appendChild(assessmentElement);
  const planElement = document.createElement('div');
  planElement.classList.add('current-note-sub', 'content-1');
  planElement.innerHTML = 'Plan: ' + patient.notes[i].plan;
  div.appendChild(planElement);
  //End section retrieve and display current note

  //retrieve and display past notes
  for (i = 1; i < patient.notes.length; i++) {
    let div = document.getElementById('pastNotes');
    let pastNote = document.createElement('div');
    pastNote.classList.add('past-note');
    pastNote.id = i;
    //console.log(pastNote.id);
    pastNote.onclick = function () {
      var currentNote = document.getElementById('currentNote');
      currentNote.innerHTML = ' ';
      let i = pastNote.id;
      console.log(patients[name].notes[i].subjective);
      var div = document.getElementById('currentNote');
      var subjectiveElement = document.createElement('div');
      subjectiveElement.classList.add('current-note-sub', 'content-1');
      subjectiveElement.innerHTML =
        'Subjective: ' + patient.notes[i].subjective;
      div.appendChild(subjectiveElement);
      const objectiveElement = document.createElement('div');
      objectiveElement.classList.add('current-note-sub', 'content-1');
      objectiveElement.innerHTML = 'objective: ' + patient.notes[i].objective;
      div.appendChild(objectiveElement);
      const assessmentElement = document.createElement('div');
      assessmentElement.classList.add('current-note-sub', 'content-1');
      assessmentElement.innerHTML =
        'Assessment: ' + patient.notes[i].assessment;
      div.appendChild(assessmentElement);
      const planElement = document.createElement('div');
      planElement.classList.add('current-note-sub', 'content-1');
      planElement.innerHTML = 'Plan: ' + patient.notes[i].plan;
      div.appendChild(planElement);
    };
    pastNote.innerHTML =
      'Date: ' +
      patient.notes[i].date +
      ' Complaint: ' +
      patient.notes[i].complaint;
    div.prepend(pastNote);
  }
}
//console.log(patient);
//patients = JSON.parse(patients);

function createPatient() {
  let patients = localStorage.getItem('patients');
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  if (patients !== null) {
    //instead of parsing here can just append array with new patient if it already exists.
    //Will need to parse to retrieve data to fill patient details when select new patient or
    //reopen broswer.
    patients = JSON.parse(patients);
  } else {
    patients = {};
  }
  patients[name] = { age: age, prescriptions: [], notes: [] };
  //patients.push({ [name]: { age: age } });
  localStorage.setItem('patients', JSON.stringify(patients));
  //console.log(patients[name]);
  nameDisplay = document.getElementById('nameDisplay');
  ageDisplay = document.getElementById('ageDisplay');
  nameDisplay.innerHTML = 'name: ' + name;
  ageDisplay.innerHTML = 'Age: ' + age;
}
function addPrescription() {
  const addPrescription = document.getElementById('addPrescription');
  addPrescription.style.display = 'block';
}

function createPrescription() {
  const div = document.getElementById('prescriptions');

  const newPrescription = document.createElement('div');
  newPrescription.classList.add('prescription');
  const name = document.getElementById('name').value;
  //console.log(name);
  //var patient = JSON.parse(localStorage.getItem('patients.[name]'));
  //newPrescription.innerHTML = patient;
  //div.appendChild(newPrescription);
  //console.log('testing');
  //console.log(patient);
  //console.log('testing');

  //console.log(patient);
  var drug = document.getElementById('prescriptionForm').drug.value;
  var dosage = document.getElementById('prescriptionForm').dosage.value;
  var measurement =
    document.getElementById('prescriptionForm').measurement.value;
  newPrescription.innerHTML =
    'Drug: ' + drug + ' Dosage: ' + dosage + ' ' + measurement;
  div.appendChild(newPrescription);
  var patients = JSON.parse(localStorage.getItem('patients'));
  patients[name].prescriptions.push({
    drug: drug,
    dosage: dosage,
    measurement: measurement,
  });
  //console.log(patients[name]);
  localStorage.setItem('patients', JSON.stringify(patients));
  /*
  const drugObject = { drug: drug.value };
  Object.assign(patients[name], drugObject);
  const dosageObject = { dosage: dosage.value };
  Object.assign(patients[name], dosageObject);
  const measurementObject = { measurement: measurement.value };
  Object.assign(patients[name], measurementObject);
  localStorage.setItem('patients', JSON.stringify(patients));
  */
}
function createNote() {
  var date = document.getElementById('date').value;
  //console.log(date);
  var complaint = document.getElementById('complaint').value;
  console.log(complaint);
  var subjective = document.getElementById('subjective').value;
  console.log(subjective);
  var objective = document.getElementById('objective').value;
  var assessment = document.getElementById('assessment').value;
  var plan = document.getElementById('plan').value;
  var patients = JSON.parse(localStorage.getItem('patients'));
  const name = document.getElementById('name').value;
  //console.log(patients[name]);
  patients[name].notes.push({
    date: date,
    complaint: complaint,
    subjective: subjective,
    objective: objective,
    assessment: assessment,
    plan: plan,
  });
  let patient = patients[name];
  if (patients[name].notes.length > 1) {
    const div = document.getElementById('pastNotes');
    const pastNote = document.createElement('div');
    pastNote.classList.add('past-note');
    pastNote.innerHTML = 'Date: ' + patient.notes[1].date;

    ' Complaint: ' + patient.notes[1].complaint;

    div.prepend(pastNote);
  }

  localStorage.setItem('patients', JSON.stringify(patients));

  currentNote.innerHTML = ' ';
  var div = document.getElementById('currentNote');
  var subjectiveElement = document.createElement('div');
  subjectiveElement.classList.add('current-note-sub', 'content-1');
  subjectiveElement.innerHTML = 'Subjective: ' + subjective;
  div.appendChild(subjectiveElement);
  const objectiveElement = document.createElement('div');
  objectiveElement.classList.add('current-note-sub', 'content-1');
  objectiveElement.innerHTML = 'objective: ' + objective;
  div.appendChild(objectiveElement);
  const assessmentElement = document.createElement('div');
  assessmentElement.classList.add('current-note-sub', 'content-1');
  assessmentElement.innerHTML = 'Assessment: ' + assessment;
  div.appendChild(assessmentElement);
  const planElement = document.createElement('div');
  planElement.classList.add('current-note-sub', 'content-1');
  planElement.innerHTML = 'Plan: ' + plan;
  div.appendChild(planElement);
}

function noteModal() {
  const noteModal = document.getElementById('noteModal');
  noteModal.style.display = 'block';
}
function addProblem() {
  const addProblem = document.getElementById('addProblem');
  addProblem.style.display = 'block';
}
function closeProblem() {
  const addProblem = document.getElementById('addProblem');
  addProblem.style.display = 'none';
}
function closeNote() {
  const noteModal = document.getElementById('noteModal');
  noteModal.style.display = 'none';
}

function closePrescription() {
  const addPrescription = document.getElementById('addPrescription');
  addPrescription.style.display = 'none';
}
function closeDemo() {
  const addPatient = document.getElementById('newPtDemographics');
  addPatient.style.display = 'none';
}

function addPastNotes() {
  const name = document.getElementById('search').value;
  //console.log(name);
  let patients = localStorage.getItem('patients');
  patients = JSON.parse(patients);
  let patient = patients[name];

  for (let i = 1; i < patient.notes.length; i++) {
    const div = document.getElementById('pastNotes');
    const pastNote = document.createElement('div');
    pastNote.classList.add('past-note');
    pastNote.innerHTML = 'Date: ' + patient.notes[i].date;

    ' Complaint: ' + patient.notes[i].complaint;
    div.appendChild(pastNote);
  }
}

//button.addEventListener('click', () => {});

/*function AddPre() {
  var pre = document.createElement('pre');
  pre.innerHTML =
    '<pre>\n\
Drug:               Dosage:           Instructions: \r\n\
</pre>';
  var container1 = document.getElementById('container1');
  container1.appendChild('pre');
}
*/
