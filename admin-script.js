// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDnkqWIlJbeVUGRxbDk_BkgqeCCIvP7FXI',
  authDomain: 'college-permission-system.firebaseapp.com',
  databaseURL: 'https://college-permission-system-default-rtdb.firebaseio.com',
  projectId: 'college-permission-system',
  storageBucket: 'college-permission-system.appspot.com',
  messagingSenderId: '734452865661',
  appId: '1:734452865661:web:e00398c43621a677bf6f14',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 2. Fetch Bookings from Firebase and display
const bookingsTable = document.getElementById('bookingsTableBody');

database.ref('requests').on('value', function(snapshot) {
  bookingsTable.innerHTML = ''; // Clear table before adding new

  snapshot.forEach(function(childSnapshot) {
    const booking = childSnapshot.val();
    const bookingKey = childSnapshot.key;

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${booking.bookingPerson}</td>
      <td>${booking.name}</td>
      <td>${booking.department}</td>
      <td>${booking.event}</td>
      <td>${booking.venue}</td>
      <td>${booking.date}</td>
      <td>${booking.time}</td>
      <td>${booking.status}</td>
      <td>
        <button onclick="approveBooking('${bookingKey}', '${booking.venue}')">Approve</button>
        <button onclick="rejectBooking('${bookingKey}', '${booking.venue}')">Reject</button>
      </td>
    `;

    bookingsTable.appendChild(row);
  });
});

// 3. Approve Booking
function approveBooking(bookingKey, venueId) {
  database.ref('requests/' + bookingKey).update({
    status: 'Approved'
  });
  alert('Booking Approved!');
}

// 4. Reject Booking
function rejectBooking(bookingKey, venueId) {
  database.ref('requests/' + bookingKey).update({
    status: 'Rejected'
  });

  // Also make venue available again
  database.ref('venues/' + venueId).update({
    filled: false
  });

  alert('Booking Rejected and Venue Released!');
}
