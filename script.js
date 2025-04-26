// 1. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnkqWIlJbeVUGRxbDk_BkgqeCCIvP7FXI",
    authDomain: "college-permission-system.firebaseapp.com",
    databaseURL: "https://college-permission-system-default-rtdb.firebaseio.com",
    projectId: "college-permission-system",
    storageBucket: "college-permission-system.firebasestorage.app",
    messagingSenderId: "734452865661",
    appId: "1:734452865661:web:e00398c43621a677bf6f14"
  };

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 3. Reference to Database
const database = firebase.database();

// 4. Handle Form Submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Collect Form Data
    const bookingPerson = document.getElementById('bookingPerson').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const eventName = document.getElementById('eventName').value;
    const venue = document.getElementById('venue').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const comments = document.getElementById('comments').value;

    // Push data to Firebase Database under 'bookings' node
    database.ref('bookings/').push({
        bookingPerson: bookingPerson,
        name: name,
        department: department,
        eventName: eventName,
        venue: venue,
        date: date,
        time: time,
        comments: comments,
        status: 'Pending' // default status
    });

    alert('Booking Request Launched Successfully!');

    // Reset Form
    document.getElementById('bookingForm').reset();
});
