Student-Teacher Appointment System

Project Description:

The Student-Teacher Appointment System is a web-based application designed to facilitate and manage appointments between students and teachers. The application allows students to book appointments with teachers, view their schedules, and send messages. Teachers can manage their availability, accept or reject appointments, and track their appointments. The system is built using HTML, CSS, JavaScript, and Firebase for backend operations.

File Structure:

Index.html: The main landing page providing role-based navigation (Teacher, Student, Admin).
SignUp.html: Interface for new users to create an account with role selection.
SignIn.html: Login page for existing users to access their accounts.
Admin.html: Dashboard for Admins to manage teachers and view appointments.
Student.html: Dashboard for students to view and book appointments, manage classes, and send messages.
Teacher.html: Dashboard for teachers to manage their schedules, appointments, and messages.
firebase-config.js: Configures Firebase services for the application.
Authentication.js: Handles user authentication, role management, and teacher account management.
Admin.js: Implements functionalities for Admin dashboard operations.
Student.js: Manages student interactions, appointment bookings, and class management.
Teacher.js: Manages teacher interactions, slot management, and appointment handling.
SetCustomClaims.js: Manages setting and deleting user custom claims in Firebase.
Messages.js: Handles message sending and display in the chat interface.
Styles.css: Custom styling for general layout and components.
Authentication.css: Styles specific to authentication pages.
Admin.css: Styles for the Admin dashboard.
Student.css: Styles for the Student dashboard.
Teacher.css: Styles for the Teacher dashboard.
index.js: Imports necessary JavaScript files for the project.
package.json: Manages dependencies and scripts for Firebase Cloud Functions.

Technologies Used:

HTML: For structuring the web pages.
CSS: For styling and layout.
JavaScript: For interactive functionality and dynamic content.
Firebase: For authentication, Firestore database, and backend services.
Bootstrap: For responsive design and layout adjustments.
Google Fonts: For custom typography (Bree Serif, Roboto).
Features
Role-Based Access: Different interfaces and functionalities for Admins, Teachers, and Students.
User Authentication: Sign-up and login functionality with role-based access control.

Appointment Management:

Students can book, view, and manage appointments.
Teachers can manage their available slots, view pending appointments, and handle appointment requests.
Messaging System: Allows students and teachers to send and receive messages.
Admin Dashboard: Manage teacher accounts and view overall appointments.
Additional Interactions
Dynamic Slot Management: Teachers can add and remove available slots.
Real-Time Updates: Appointments and messages are updated in real-time using Firebase.
Responsive Design: Interfaces are responsive and work across various devices.
Error Handling
Authentication Errors: Proper handling of sign-up, sign-in errors, and role-based access issues.
Appointment Errors: Clear messages for invalid operations, such as attempting to book unavailable slots or handle overlapping appointments.

Usage:

Sign Up / Sign In: Create an account or log in based on your role (Admin, Teacher, Student).
Admin Functions: Manage teachers and view appointments from the Admin dashboard.
Student Functions: Book appointments, manage classes, and send messages from the Student dashboard.
Teacher Functions: Manage your slots, appointments, and messages from the Teacher dashboard.
Logout: Ensure to log out after use to secure your account.
Future Improvements
Enhanced Scheduling: Add features for recurring appointments and calendar integrations.
Improved Messaging: Include attachments and real-time notifications for messages.
Analytics Dashboard: Implement analytics for tracking appointment statistics and user activity.

~~ You can add teachers from Admin.html only.
~~ After creating an account for a student admin approval is needed, you can either approve or decline it.

Screenshots:

![Index.html](Screenshots/Index.png)
![SignUp.html](Screenshots/SignUp.png)
![SignIn.html](Screenshots/SignIn.png)
![Student.html](Screenshots/Student.png)
![Admin.html](Screenshots/Admin.png)
![Teacher.html](Screenshots/Teacher.png)

How to Run:

1) Clone the Repository: git clone https://github.com/hemanthh29/Student-Teacher-Appointment
2) If you are using vs code you can directly install live server and can use my project
3) Or you can open the directory of project in cmd and use python server to use my project
4) To use python server run this command python -m http.server 8080
5) Then open this url 'http://localhost:8080/html/Index.html'

Run the Application: Open index.html.

Issues:

1) After adding a teacher the page will get logout please just go back and login again then you can see the existing teachers with new ones if you are experiencing no details to display just go back and login in again.
2) The messages is not implemented there are some errors like blank message updation will implement this soon after fixing them.

Built By [Hemanth]