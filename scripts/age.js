const months = [31,28,31,30,31,30,31,31,30,31,30,31];
function ageCalculate() {
    let inputDateValue = document.getElementById("date-input").value.trim(); // Trim to remove leading and trailing whitespace

    // Check if the input date is empty
    if (inputDateValue === '') {
        document.getElementById("noInput").innerHTML="Please fill all the forms"
        return;
    }   else {
        // Clear the message if input is not empty
        document.getElementById("noInput").innerHTML = "";
    }

    let inputDate = new Date(inputDateValue);

    // Check if inputDate is a valid date
    if (isNaN(inputDate.getTime())) {
        alert("Please enter a valid date.");
        return;
    }

    let today = new Date();
    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    };

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ) {
        alert("Booking future birth dates are illegal unless you're Jesus! Please enter a valid year.");
        displayResult("-", "-", "-");
        return;
    }

    let birthYear = currentYear - birthDetails.year;
    let birthMonth;
    let birthDate;

    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    } else {
        let daysInPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        birthMonth--;
        birthDate = daysInPreviousMonth + currentDate - birthDetails.date;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }

    displayResult(birthDate, birthMonth, birthYear);
}

function displayResult(bDate, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function leapChecker(year) {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
}

