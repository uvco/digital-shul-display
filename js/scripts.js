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
    const widgetImage = document.querySelector(".flowers");
    let currentAnnouncementIndex = 0;
    let announcements = [];

    // Fetch CSV content from Google Sheets
    fetch("https://docs.google.com/spreadsheets/d/1NjfsLPr7la-H5XAcFwG94xm79BwBjuZMsrWJcGfB7FI/pub?gid=0&single=true&output=csv")
        .then(response => response.text())
        .then(csvData => {
            // Split the CSV data by line to get individual lines
            announcements = csvData.split('\n').filter(announcement => announcement.trim() !== '');

            if (announcements.length > 0) {
                // Display the first announcement
                updateAnnouncement();

                setInterval(function() {
                    currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;
                    updateAnnouncement();
                }, 5000); // Adjust timing as needed
            } else {
                rotatingAnnouncements.innerHTML = "No announcements available";
                widgetImage.style.display = "none"; // Hide icon if no announcements
            }
        })
        .catch(error => {
            rotatingAnnouncements.innerHTML = "Failed to load announcements.";
            widgetImage.style.display = "none"; // Hide icon on error
        });

    function updateAnnouncement() {
        let currentAnnouncement = announcements[currentAnnouncementIndex];

        // Check if the announcement contains the "*" character
        const hasIcon = currentAnnouncement.includes('*');

        // Remove "*" and commas from the text before displaying it
        let cleanedAnnouncement = currentAnnouncement.replace('*', '').replace(/,/g, '').trim();

        // Show or hide the icon based on the presence of "*"
        if (hasIcon) {
            widgetImage.style.display = "block"; // Show the icon
        } else {
            widgetImage.style.display = "none"; // Hide the icon
        }

        // Update the announcement text
        rotatingAnnouncements.innerHTML = cleanedAnnouncement;
    }
});

/*
document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.getElementById("weekdays-table");

    // Fetch CSV content from Google Sheet
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQg-EDe91WIod2v1KbAL4FLq7DT_IuHAqNhuUGdwF9iSdWSAVwha_KoL79lx8hZpaqQDWlEUPnyAscd/pub?gid=0&single=true&output=csv")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(csvData => {
            console.log("CSV Data fetched successfully:", csvData);
            const rows = csvData.split('\n').filter(row => row.trim() !== '');

            if (rows.length > 0) {
                const table = document.createElement('table');
                table.classList.add('responsive-table');

                rows.forEach((row, rowIndex) => {
                    const tr = document.createElement('tr');
                    const cells = row.split(',');

                    let skipNextCell = false;  // To handle skipping cells after merge

                    cells.forEach((cell, cellIndex) => {
                        if (skipNextCell) {
                            skipNextCell = false;  // Skip this iteration if it’s a merged cell
                            return;
                        }

                        // By default, create <td> for normal cells
                        let cellElement = document.createElement('td');

                        // Check if the next cell is empty (indicating a merge across columns)
                        if (cellIndex < cells.length - 1 && cells[cellIndex + 1].trim() === '') {
                            cellElement = document.createElement('th'); // Make it a <th> if merged
                            cellElement.colSpan = 2;  // Merge two columns
                            skipNextCell = true;  // Skip the next cell
                        }

                        // Populate the cell content
                        cellElement.textContent = cell.trim();
                        tr.appendChild(cellElement);
                    });

                    table.appendChild(tr);
                });

                tableContainer.innerHTML = '';  // Clear loading message
                tableContainer.appendChild(table);
            } else {
                console.error("No rows available in the CSV data.");
                tableContainer.innerHTML = "No rows available";
            }
        })
        .catch(error => {
            console.error("Failed to load table data:", error);
            tableContainer.innerHTML = "Failed to load table data.";
        });
});
*/

/*
document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.getElementById("shabat-table");

    // Fetch CSV content from Google Sheet
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSKr08rkxnDCYDAkre_kB-z9dXn9uXMb8t6P11xsc2eOMOuv7Aq92MGsqJ228PK8StkOvtPWZpzgQLx/pub?gid=0&single=true&output=csv")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(csvData => {
            console.log("CSV Data fetched successfully:", csvData);
            const rows = csvData.split('\n').filter(row => row.trim() !== '');

            if (rows.length > 0) {
                const table = document.createElement('table');
                table.classList.add('responsive-table');

                rows.forEach((row, rowIndex) => {
                    const tr = document.createElement('tr');
                    const cells = row.split(',');

                    let skipNextCell = false;  // To handle skipping cells after merge

                    cells.forEach((cell, cellIndex) => {
                        if (skipNextCell) {
                            skipNextCell = false;  // Skip this iteration if it’s a merged cell
                            return;
                        }

                        // By default, create <td> for normal cells
                        let cellElement = document.createElement('td');

                        // Check if the next cell is empty (indicating a merge across columns)
                        if (cellIndex < cells.length - 1 && cells[cellIndex + 1].trim() === '') {
                            cellElement = document.createElement('th'); // Make it a <th> if merged
                            cellElement.colSpan = 2;  // Merge two columns
                            skipNextCell = true;  // Skip the next cell
                        }

                        // Populate the cell content
                        cellElement.textContent = cell.trim();
                        tr.appendChild(cellElement);
                    });

                    table.appendChild(tr);
                });

                tableContainer.innerHTML = '';  // Clear loading message
                tableContainer.appendChild(table);
            } else {
                console.error("No rows available in the CSV data.");
                tableContainer.innerHTML = "No rows available";
            }
        })
        .catch(error => {
            console.error("Failed to load table data:", error);
            tableContainer.innerHTML = "Failed to load table data.";
        });
});
*/

/*
document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.getElementById("holiday-table");

    // Fetch CSV content from Google Sheet
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQMhc8XYcttvqMA4eHIkUrO5jO0miEi6QnsRzeI4CA6hyUKrX1NHwAMkHGq1UuxVjXbDivUsb44ppWr/pub?gid=0&single=true&output=csv")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(csvData => {
            console.log("CSV Data fetched successfully:", csvData);
            const rows = csvData.split('\n').filter(row => row.trim() !== '');

            // Check if there's more than just a header row or merged row
            if (rows.length <= 1) {
                console.log("No content beyond the header or merged row.");
                tableContainer.innerHTML = '';  // Remove any table content
                return;  // Exit, don't create a table
            }

            const table = document.createElement('table');
            table.classList.add('responsive-table');

            rows.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                const cells = row.split(',');

                let skipNextCell = false;  // To handle skipping cells after merge

                cells.forEach((cell, cellIndex) => {
                    if (skipNextCell) {
                        skipNextCell = false;  // Skip this iteration if it’s a merged cell
                        return;
                    }

                    // By default, create <td> for normal cells
                    let cellElement = document.createElement('td');

                    // Check if the next cell is empty (indicating a merge across columns)
                    if (cellIndex < cells.length - 1 && cells[cellIndex + 1].trim() === '') {
                        cellElement = document.createElement('th'); // Make it a <th> if merged
                        cellElement.colSpan = 2;  // Merge two columns
                        skipNextCell = true;  // Skip the next cell
                    }

                    // Populate the cell content
                    cellElement.textContent = cell.trim();
                    tr.appendChild(cellElement);
                });

                table.appendChild(tr);
            });

            // Clear the container and append the table
            tableContainer.innerHTML = '';  // Clear loading message
            tableContainer.appendChild(table);
        })
        .catch(error => {
            console.error("Failed to load table data:", error);
            tableContainer.innerHTML = "Failed to load table data.";
        });
});
*/

setInterval(function() {
    location.reload(); // Refresh the whole page
}, 600000); // Refresh every 10 minutes

let currentPage = 1;
let page1Content = null;  // Variable to store content of page1
let page2Content = null;  // Variable to store content of page2
let page1TablesInflated = false;  // Flag to track if page1 tables have been inflated

// Function to load page content and switch between them
function loadPageContent(page, callback) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            callback(html);
        })
        .catch(error => console.error('Error loading page:', error));
}

function togglePages() {
    const mainContent = document.getElementById('main-content');

    if (currentPage === 1) {
        // If on page1, move to page2
        if (page2Content) {
            mainContent.innerHTML = '';  // Clear the existing content
            mainContent.appendChild(page2Content.cloneNode(true));  // Restore stored DOM
        } else {
            loadPageContent('page2.html', function(content) {
                mainContent.innerHTML = content;
                page2Content = mainContent.cloneNode(true);  // Store the cloned DOM for page2
            });
        }
        currentPage = 2;
    } else {
        // If on page2, move back to page1
        mainContent.innerHTML = '';  // Clear the existing content
        mainContent.appendChild(page1Content.cloneNode(true));  // Restore stored DOM for page1
        currentPage = 1;
    }
}

// Initial setup: Load the first page and set the interval for toggling
document.addEventListener('DOMContentLoaded', function() {
    loadPageContent('page1.html', function(content) {
        document.getElementById('main-content').innerHTML = content;

        // Inflate tables after the first load
        inflateTables();

        // Store the DOM after tables are inflated
        page1Content = document.getElementById('main-content').cloneNode(true);
    });

    setInterval(togglePages, 10000);  // Switch pages every 10 seconds
});

// Call this function to inflate all tables you need
function inflateTables() {

    if (!page1TablesInflated) {
        // Call your inflateTableFromCSV function for each table
        inflateTableFromCSV(
            "weekdays-table",
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQg-EDe91WIod2v1KbAL4FLq7DT_IuHAqNhuUGdwF9iSdWSAVwha_KoL79lx8hZpaqQDWlEUPnyAscd/pub?gid=0&single=true&output=csv"
        );

        inflateTableFromCSV(
            "shabat-table",
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKr08rkxnDCYDAkre_kB-z9dXn9uXMb8t6P11xsc2eOMOuv7Aq92MGsqJ228PK8StkOvtPWZpzgQLx/pub?gid=0&single=true&output=csv"
        );

        inflateTableFromCSVHolidays(
            "holiday-table",
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMhc8XYcttvqMA4eHIkUrO5jO0miEi6QnsRzeI4CA6hyUKrX1NHwAMkHGq1UuxVjXbDivUsb44ppWr/pub?gid=0&single=true&output=csv"
        );
    }

    page1TablesInflated = true;
}

// Function to inflate tables from Google Sheets CSV
function inflateTableFromCSV(tableId, csvUrl) {
    const tableContainer = document.getElementById(tableId);

    if (tableContainer) {
        fetch(csvUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(csvData => {
                console.log(`CSV Data fetched successfully for ${tableId}:`, csvData);
                const rows = csvData.split('\n').filter(row => row.trim() !== '');

                if (rows.length > 0) {
                    const table = document.createElement('table');
                    table.classList.add('responsive-table');

                    rows.forEach((row, rowIndex) => {
                        const tr = document.createElement('tr');
                        const cells = row.split(',');

                        let skipNextCell = false;

                        cells.forEach((cell, cellIndex) => {
                            if (skipNextCell) {
                                skipNextCell = false;
                                return;
                            }

                            let cellElement = document.createElement('td');

                            if (cellIndex < cells.length - 1 && cells[cellIndex + 1].trim() === '') {
                                cellElement = document.createElement('th');
                                cellElement.colSpan = 2;
                                skipNextCell = true;
                            }

                            cellElement.textContent = cell.trim();
                            tr.appendChild(cellElement);
                        });

                        table.appendChild(tr);
                    });

                    tableContainer.innerHTML = '';
                    tableContainer.appendChild(table);
                } else {
                    console.error(`No rows available in the CSV data for ${tableId}.`);
                    tableContainer.innerHTML = "No rows available.";
                }
            })
            .catch(error => {
                console.error(`Failed to load table data for ${tableId}:`, error);
                tableContainer.innerHTML = "Failed to load table data.";
            });
    }
}

function inflateTableFromCSVHolidays(tableId, csvUrl) {
    const tableContainer = document.getElementById(tableId);

    if (tableContainer) {
        fetch(csvUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(csvData => {
                console.log("CSV Data fetched successfully:", csvData);
                const rows = csvData.split('\n').filter(row => row.trim() !== '');

                // Check if there's more than just a header row or merged row
                if (rows.length <= 1) {
                    console.log("No content beyond the header or merged row.");
                    tableContainer.innerHTML = '';  // Remove any table content
                    return;  // Exit, don't create a table
                }

                const table = document.createElement('table');
                table.classList.add('responsive-table');

                rows.forEach((row, rowIndex) => {
                    const tr = document.createElement('tr');
                    const cells = row.split(',');

                    let skipNextCell = false;  // To handle skipping cells after merge

                    cells.forEach((cell, cellIndex) => {
                        if (skipNextCell) {
                            skipNextCell = false;  // Skip this iteration if it’s a merged cell
                            return;
                        }

                        // By default, create <td> for normal cells
                        let cellElement = document.createElement('td');

                        // Check if the next cell is empty (indicating a merge across columns)
                        if (cellIndex < cells.length - 1 && cells[cellIndex + 1].trim() === '') {
                            cellElement = document.createElement('th'); // Make it a <th> if merged
                            cellElement.colSpan = 2;  // Merge two columns
                            skipNextCell = true;  // Skip the next cell
                        }

                        // Populate the cell content
                        cellElement.textContent = cell.trim();
                        tr.appendChild(cellElement);
                    });

                    table.appendChild(tr);
                });

                // Clear the container and append the table
                tableContainer.innerHTML = '';  // Clear loading message
                tableContainer.appendChild(table);
            })
            .catch(error => {
                console.error("Failed to load table data:", error);
                tableContainer.innerHTML = "Failed to load table data.";
            });
    }
}