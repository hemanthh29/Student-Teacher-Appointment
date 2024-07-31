import { app } from './firebase-config.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', function() {
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var selectedSlots = [];
    var selectedDay = "";

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var day = today.getDay();
        var date = today.getDate();
        var month = today.getMonth() + 1; // Months are zero-based
        var year = today.getFullYear();

        // Convert to 12-hour format
        var ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12; // the hour '0' should be '12'
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        document.getElementById('CurrentStatus').innerHTML = daysOfWeek[day] + ", " + date + "-" + month + "-" + year + " " + h + ":" + m + ":" + s + " " + ampm;
        setTimeout(startTime, 1000);
    }

    function disablePreviousDays() {
        var today = new Date();
        var currentDay = today.getDay();
        var slots = document.querySelectorAll('.slot-btn');

        slots.forEach(function(slot) {
            var slotDay = parseInt(slot.getAttribute('data-day')); // Assuming you have data-day attribute set for each button
            if (slotDay < currentDay) {
                slot.classList.add('disabled');
                slot.setAttribute('disabled', true);
            }
        });

        // Disable previous days in the dropdown
        var daySelect = document.getElementById('DaySelect');
        var options = daySelect.querySelectorAll('option');
        options.forEach(function(option) {
            var optionDay = daysOfWeek.indexOf(option.value);
            if (optionDay < currentDay && optionDay !== -1) {
                option.classList.add('disabled');
                option.setAttribute('disabled', true);
            }
        });
    }

    function disableCurrentTimeSlots() {
        var today = new Date();
        var currentHours = today.getHours();
        var currentMinutes = today.getMinutes();
        var ampm = currentHours >= 12 ? 'PM' : 'AM';
        currentHours = currentHours % 12;
        currentHours = currentHours ? currentHours : 12; // the hour '0' should be '12'

        var slots = document.querySelectorAll('.slot-btn');

        slots.forEach(function(slot) {
            var timeRange = slot.textContent.trim().split(' to ');
            if (timeRange.length !== 2) return; // Skip if the format is not as expected
            
            var startTime = timeRange[0].split(':');
            var endTime = timeRange[1].split(':');
            
            if (startTime.length !== 2 || endTime.length !== 2) return; // Skip if the format is not as expected
            
            var startHour = parseInt(startTime[0]);
            var startMinute = parseInt(startTime[1]);
            var startAMPM = timeRange[0].includes('PM') ? 'PM' : 'AM';

            var endHour = parseInt(endTime[0]);
            var endMinute = parseInt(endTime[1]);
            var endAMPM = timeRange[1].includes('PM') ? 'PM' : 'AM';

            // Convert to 24-hour format for comparison
            if (startAMPM === 'PM' && startHour !== 12) startHour += 12;
            if (startAMPM === 'AM' && startHour === 12) startHour = 0;
            if (endAMPM === 'PM' && endHour !== 12) endHour += 12;
            if (endAMPM === 'AM' && endHour === 12) endHour = 0;

            var currentHours24 = currentHours + (ampm === 'PM' ? 12 : 0);

            if ((currentHours24 > startHour || (currentHours24 === startHour && currentMinutes >= startMinute)) &&
                (currentHours24 < endHour || (currentHours24 === endHour && currentMinutes < endMinute))) {
                slot.classList.add('disabled');
                slot.setAttribute('disabled', true);
            }
        });
    }

    function handleSlotClick(event) {
        var button = event.target;
        if (button.classList.contains('slot-btn') && !button.classList.contains('disabled')) {
            var slotTime = button.textContent.trim();

            if (selectedSlots.includes(slotTime)) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline-primary');
                selectedSlots = selectedSlots.filter(function(item) {
                    return item !== slotTime;
                });
            } else {
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-primary');
                selectedSlots.push(slotTime);
            }
        }
    }

    function attachEventListeners() {
        var slots = document.querySelectorAll('.slot-btn');
        slots.forEach(function(slot) {
            slot.addEventListener('click', handleSlotClick);
        });

        var submitButton = document.getElementById('SubmitSlots');
        if (submitButton) {
            submitButton.addEventListener('click', handleSubmit);
        }
    }

    function updateSelectedSlotsTable(slots) {
        var tableBody = document.getElementById('SelectedSlots');
        tableBody.innerHTML = ""; // Clear existing table rows

        // Show all slots for all days
        daysOfWeek.forEach(function(day, index) {
            var daySlots = slots[day] || [];
            daySlots.forEach(function(slot, i) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${day}</td>
                    <td>${slot}</td>
                    <td><button class="btn btn-danger btn-sm remove-slot" data-slot="${slot}" data-day="${day}">Remove</button></td>
                `;
                tableBody.appendChild(row);
            });
        });

        // Add event listeners for remove buttons
        var removeButtons = document.querySelectorAll('.remove-slot');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var slotToRemove = button.getAttribute('data-slot');
                var dayToRemoveFrom = button.getAttribute('data-day');
                
                selectedSlots = selectedSlots.filter(function(slot) {
                    return slot !== slotToRemove;
                });

                // Update the Firestore to remove the slot
                var auth = getAuth(app);
                var db = getFirestore(app);
                var user = auth.currentUser;

                if (user) {
                    var userId = user.uid;
                    var userDocRef = doc(db, 'teachers', userId);

                    getDoc(userDocRef).then(function(docSnap) {
                        if (docSnap.exists()) {
                            var existingData = docSnap.data();
                            var existingSlots = existingData.slots || {};

                            // Remove the slot for the specific day
                            if (existingSlots[dayToRemoveFrom]) {
                                existingSlots[dayToRemoveFrom] = existingSlots[dayToRemoveFrom].filter(function(slot) {
                                    return slot !== slotToRemove;
                                });

                                // Update the document
                                setDoc(userDocRef, {
                                    slots: existingSlots
                                }, { merge: true }).then(function() {
                                    alert('Slot removed successfully.');
                                    updateSlotsTable(userDocRef); // Update the table after removing the slot
                                }).catch(function(error) {
                                    console.error('Error updating slots:', error);
                                    alert('Error removing slot.');
                                });
                            }
                        }
                    }).catch(function(error) {
                        console.error('Error getting document:', error);
                    });
                }
            });
        });
    }

    function handleSubmit() {
        var daySelect = document.getElementById('DaySelect');
        selectedDay = daySelect.value;

        if (selectedDay === "" || selectedSlots.length === 0) {
            alert('Please select a day and at least one time slot.');
            return;
        }

        var auth = getAuth(app);
        var db = getFirestore(app);
        var user = auth.currentUser;

        if (user) {
            var userId = user.uid;
            var userDocRef = doc(db, 'teachers', userId);

            // Fetch existing slots data
            getDoc(userDocRef).then(function(docSnap) {
                if (docSnap.exists()) {
                    var existingData = docSnap.data();
                    var existingSlots = existingData.slots || {};

                    // Update the slots for the selected day
                    existingSlots[selectedDay] = selectedSlots;

                    // Update the document
                    setDoc(userDocRef, {
                        slots: existingSlots
                    }, { merge: true }).then(function() {
                        alert('Slots updated successfully.');
                        // Reload and update the slots in the table
                        updateSlotsTable(userDocRef);
                    }).catch(function(error) {
                        console.error('Error updating slots:', error);
                        alert('Error updating slots.');
                    });
                } else {
                    console.error('No document found for the user.');
                    alert('Error: No document found.');
                }
            }).catch(function(error) {
                console.error('Error getting document:', error);
                alert('Error fetching existing slots.');
            });
        } else {
            console.error('No user is signed in.');
            alert('Please sign in to submit slots.');
        }
    }

    function updateSlotsTable(userDocRef) {
        getDoc(userDocRef).then(function(docSnap) {
            if (docSnap.exists()) {
                var userData = docSnap.data();
                var slots = userData.slots || {};
                updateSelectedSlotsTable(slots); // Update the table with all slots
            } else {
                console.error('No document found for the user.');
            }
        }).catch(function(error) {
            console.error('Error getting document:', error);
        });
    }

    function initializePage() {
        startTime();
        disablePreviousDays();
        disableCurrentTimeSlots();
        attachEventListeners();
    }

    var auth = getAuth(app);
    var db = getFirestore(app);
    var initialLoad = true;

    onAuthStateChanged(auth, function(user) {
        if (user && initialLoad) {
            var userId = user.uid;

            (async function() {
                try {
                    var idTokenResult = await user.getIdTokenResult();
                    var userRole = idTokenResult.claims.role;

                    if (userRole !== 'Teacher') {
                        console.error('User is not a Teacher');
                        document.getElementById('UserName').textContent = 'Not a Teacher';
                        return;
                    }

                    var userDocRef = doc(db, 'teachers', userId);
                    var userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        var userData = userDoc.data();
                        document.getElementById('UserName').textContent = userData.name || 'No Name';
                        
                        // Load and display existing slots
                        var slots = userData.slots || {};
                        updateSlotsTable(userDocRef); // Initialize with existing data
                    } else {
                        document.getElementById('UserName').textContent = 'No user data found';
                    }
                } catch (error) {
                    console.error('Error getting document for user ID:', userId, 'Error:', error);
                    document.getElementById('UserName').textContent = 'Error loading user data';
                } finally {
                    initialLoad = false; // Reset flag after the first load
                    initializePage(); // Initialize the page only once the user is authenticated
                }
            })();
        } else if (!user) {
            window.location.href = '../html/Index.html';
        }
    });
});
