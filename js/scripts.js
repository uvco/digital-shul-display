document.addEventListener("DOMContentLoaded", function() {
    const lectureContainer = document.getElementById("lectures-container");

    // Fetch CSV content from Google Sheet
    fetch("https://docs.google.com/spreadsheets/d/1cNv6p73Wsa25hUs8DBTw5TDVx6c9LARY25ckM8csUaU/pub?gid=0&single=true&output=csv") // Replace with your Google Sheet URL
        .then(response => response.text())
        .then(csvData => {
            // Split the CSV data by line to get individual lines
            const lectures = csvData.split('\n').filter(lecture => lecture.trim() !== '');

            if (lectures.length > 0) {
                lectureContainer.innerHTML = '';  // Clear the loading message
                lectures.forEach((lecture, index) => {
                    // Create a div for each lecture
                    const lectureDiv = document.createElement('div');
                    lectureDiv.className = 'lecture-item';
                    lectureDiv.innerHTML = lecture;
                    lectureContainer.appendChild(lectureDiv);

                    // Add separator bar after each lecture except the last one
                    if (index < lectures.length - 1) {
                        const separatorDiv = document.createElement('div');
                        separatorDiv.className = 'lecture-separator';
                        separatorDiv.innerHTML = '|';
                        lectureContainer.appendChild(separatorDiv);
                    }
                });
            } else {
                lectureContainer.innerHTML = "No lectures available";
            }
        })
        .catch(error => {
            lectureContainer.innerHTML = "Failed to load lectures.";
        });
});

document.addEventListener("DOMContentLoaded", function() {
    const rotatingAnnouncements = document.getElementById("rotating-announcements");
    let currentAnnouncementIndex = 0;
    let announcements = [];

    // Fetch CSV content from Google Sheet
    fetch("https://docs.google.com/spreadsheets/d/1NjfsLPr7la-H5XAcFwG94xm79BwBjuZMsrWJcGfB7FI/pub?gid=0&single=true&output=csv")
        .then(response => response.text())
        .then(csvData => {
            // Split the CSV data by line to get individual lines
            announcements = csvData.split('\n').filter(announcement => announcement.trim() !== '');

            if (announcements.length > 0) {
                rotatingAnnouncements.innerHTML = announcements[0];

                setInterval(function() {
                    currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;
                    rotatingAnnouncements.innerHTML = announcements[currentAnnouncementIndex];
                }, 5000); // Adjust timing as needed
            } else {
                rotatingAnnouncements.innerHTML = "No announcements available";
            }
        })
        .catch(error => {
            rotatingAnnouncements.innerHTML = "Failed to load announcements.";
        });
});