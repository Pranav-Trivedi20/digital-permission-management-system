// Your Firebase connection already done in script.js
// This script will help in booking logic

// Book Venue Function
function bookVenue(venueId, userName, eventName, date, time) {
    const db = firebase.database();

    // Step 1: Check if Venue is Available
    db.ref('venues/' + venueId).once('value')
    .then(snapshot => {
        const venue = snapshot.val();
        if (venue) {
            if (venue.available && !venue.filled) {
                // Step 2: Venue is Available → Book it
                const updates = {};
                updates['venues/' + venueId + '/filled'] = true;  // Mark venue as filled

                // Optional: you can create a booking record also
                const newBookingKey = db.ref().child('bookings').push().key;
                const bookingData = {
                    venueId: venueId,
                    venueName: venue.name,
                    bookedBy: userName,
                    eventName: eventName,
                    date: date,
                    time: time,
                    status: "Pending"  // Admin will approve
                };
                updates['bookings/' + newBookingKey] = bookingData;

                return db.ref().update(updates);
            } else {
                alert("Venue already booked or unavailable!");
            }
        } else {
            alert("Venue not found!");
        }
    })
    .then(() => {
        alert("Venue booking request sent successfully!");
    })
    .catch(error => {
        console.error(error);
        alert("Booking failed, please try again.");
    });
}
