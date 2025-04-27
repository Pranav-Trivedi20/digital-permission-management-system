// Firebase Configuration
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

// Reference to the bookings node in the Firebase Realtime Database
const bookingsRef = database.ref("bookings");

// Fetch bookings data and display in the table
bookingsRef.on("value", function(snapshot) {
  const bookings = snapshot.val();
  const tableBody = document.getElementById("bookingTable").getElementsByTagName('tbody')[0];

  // Clear the existing table rows
  tableBody.innerHTML = "";

  // Loop through the bookings and populate the table
  for (const key in bookings) {
    const booking = bookings[key];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${booking.bookingPerson}</td>
      <td>${booking.name}</td>
      <td>${booking.event}</td>
      <td>${booking.venueId}</td>
      <td>${booking.date}</td>
      <td>${booking.time}</td>
      <td>${booking.status}</td>
      <td>
        <button class="approve" onclick="updateBookingStatus('${key}', 'Approved')">Approve</button>
        <button class="reject" onclick="updateBookingStatus('${key}', 'Rejected')">Reject</button>
      </td>
    `;

    tableBody.appendChild(row);
  }
});

// Function to update the status of a booking
function updateBookingStatus(bookingId, status) {
  const bookingRef = database.ref("bookings/" + bookingId);
  bookingRef.update({
    status: status
  });

  // Update the venue status accordingly if the booking is approved or rejected
  const bookingData = bookingRef.once("value").then(function(snapshot) {
    const venueId = snapshot.val().venueId;
    const venueRef = database.ref("venues/" + venueId);

    if (status === "Approved") {
      // Mark the venue as filled (booked)
      venueRef.update({
        filled: true
      });
    } else {
      // Mark the venue as available (unfilled) if rejected
      venueRef.update({
        filled: false
      });
    }
  });

  alert(`Booking has been ${status}!`);
}
