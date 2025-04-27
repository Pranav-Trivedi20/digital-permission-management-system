// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDnkqWIlJbeVUGRxbDk_BkgqeCCIvP7FXI',
  authDomain: 'college-permission-system.firebaseapp.com',
  databaseURL: 'https://college-permission-system-default-rtdb.firebaseio.com',
  projectId: 'college-permission-system',
  storageBucket: 'college-permission-system.firebasestorage.app',
  messagingSenderId: '734452865661',
  appId: '1:734452865661:web:e00398c43621a677bf6f14',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Form Submit
document
  .getElementById('permissionForm')
  .addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    // Get form data
    const bookingPerson = document.getElementById('bookingPerson').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const event = document.getElementById('event').value;
    const venue = document.getElementById('venue').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const comments = document.getElementById('comments').value;

    const venueId = venue; // Using venue input value as venue ID (you can customize)

    // Call the bookVenue function to check availability and book venue
    bookVenue(venueId, name, event, date, time);

    // Save additional booking request details into a separate node (optional for admins)
    database.ref('requests').push({
      bookingPerson: bookingPerson,
      name: name,
      department: department,
      event: event,
      venue: venue,
      date: date,
      time: time,
      comments: comments,
      status: 'Pending', // Initial status set to "Pending"
    });

    alert('Your booking request has been submitted!');
    document.getElementById('permissionForm').reset(); // Clear form after submission
  });

// Function to handle venue booking logic
function bookVenue(venueId, name, event, date, time) {
  const venueRef = firebase.database().ref("venues/" + venueId); // Reference to the venue
  venueRef.once("value", function(snapshot) {
    const venueData = snapshot.val(); // Get venue data

    if (venueData.filled === false) { // Check if the venue is available
      // Venue is available, proceed with booking
      updateVenueStatus(venueId, true); // Mark venue as booked

      // Create a new booking entry
      createBookingEntry(name, event, date, time, venueId);

    } else {
      alert("The selected venue is already booked.");
    }
  });
}

// Function to update venue status (mark as booked)
function updateVenueStatus(venueId, status) {
  const venueRef = firebase.database().ref("venues/" + venueId);
  venueRef.update({
    filled: status // Update venue status to true (booked)
  });
}

// Function to create a new booking entry in the database
function createBookingEntry(name, event, date, time, venueId) {
  const bookingRef = firebase.database().ref("bookings").push();
  bookingRef.set({
    name: name,
    event: event,
    date: date,
    time: time,
    venueId: venueId,
    status: "Pending", // Set initial booking status as "Pending"
  });
}
