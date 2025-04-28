// Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyAdWjqicmh30eKbLgtjsSyyGlG8lg6h6SI",
    authDomain: "ot-schedule-7dbc3.firebaseapp.com",
    databaseURL: "https://ot-schedule-7dbc3-default-rtdb.firebaseio.com",
    projectId: "ot-schedule-7dbc3",
    storageBucket: "ot-schedule-7dbc3.appspot.com",
    messagingSenderId: "1077228318065",
    appId: "1:1077228318065:web:fd9e3309c87a7df1cb5ad0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Doctor Management
  function addDoctor() {
    const name = document.getElementById("doctorName").value;
    const role = document.getElementById("doctorRole").value;
    const email = document.getElementById("doctorEmail").value;
  
    const newDocRef = database.ref("doctors").push();
    newDocRef.set({
      name: name,
      role: role,
      email: email
    }).then(() => {
      alert("Doctor added successfully!");
      loadDoctors();
      document.getElementById("doctorForm").reset();
    }).catch((error) => {
      console.error(error);
      alert("Error adding doctor: " + error.message);
    });
  }
  
  function updateDoctor() {
    const docId = prompt("Enter Doctor ID to Update:");
    const name = document.getElementById("doctorName").value;
    const role = document.getElementById("doctorRole").value;
    const email = document.getElementById("doctorEmail").value;
  
    if (!docId) return;
  
    database.ref("doctors/" + docId).update({
      name: name,
      role: role,
      email: email
    }).then(() => {
      alert("Doctor updated!");
      loadDoctors();
      document.getElementById("doctorForm").reset();
    }).catch((error) => {
      console.error(error);
      alert("Error updating doctor: " + error.message);
    });
  }
  
  function deleteDoctor() {
    const docId = prompt("Enter Doctor ID to Delete:");
  
    if (!docId) return;
  
    database.ref("doctors/" + docId).remove()
    .then(() => {
      alert("Doctor deleted!");
      loadDoctors();
    }).catch((error) => {
      console.error(error);
      alert("Error deleting doctor: " + error.message);
    });
  }
  
  function loadDoctors() {
    document.getElementById("doctorListItems").innerHTML = "";
  
    database.ref("doctors").once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const doc = childSnapshot.val();
        const li = document.createElement("li");
        li.innerText = `${doc.name} - ${doc.role} (${doc.email})`;
        document.getElementById("doctorListItems").appendChild(li);
      });
    });
  }
  
  // Operation Scheduling
  function postOperation() {
    const patientName = document.getElementById("patientName").value;
    const operationType = document.getElementById("operationType").value;
    const operationDateTime = document.getElementById("operationDateTime").value;
    const surgeonName = document.getElementById("surgeonName").value;
  
    const newOpRef = database.ref("surgeries").push();
    newOpRef.set({
      patientName: patientName,
      operationType: operationType,
      operationDateTime: operationDateTime,
      surgeonName: surgeonName,
      status: "scheduled"
    }).then(() => {
      alert("Operation scheduled successfully!");
      loadOperations();
      document.getElementById("operationForm").reset();
    }).catch((error) => {
      console.error(error);
      alert("Error posting operation: " + error.message);
    });
  }
  
  function loadOperations() {
    document.getElementById("operationListItems").innerHTML = "";
  
    database.ref("surgeries").once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const op = childSnapshot.val();
        const li = document.createElement("li");
        li.innerText = `${op.patientName} - ${op.operationType} at ${op.operationDateTime} (Surgeon: ${op.surgeonName})`;
        document.getElementById("operationListItems").appendChild(li);
      });
    });
  }
  
  // Logout
  function logout() {
    firebase.auth().signOut()
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  // Load data on page load
  window.onload = function() {
    loadDoctors();
    loadOperations();
  };
  