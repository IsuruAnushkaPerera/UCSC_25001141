// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

// GPA Calculator Logic
const courseList = document.getElementById('course-list');
const addCourseBtn = document.getElementById('add-course');
const calculateGpaBtn = document.getElementById('calculate-gpa');
const gpaResult = document.getElementById('gpa-result');

addCourseBtn.addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'course-row';
    row.innerHTML = `
        <input type="number" placeholder="Credits" class="credits-input" min="1">
        <select class="grade-input">
            <option value="4.0">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3.0">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2.0">C</option>
            <option value="1.7">C-</option>
            <option value="1.3">D+</option>
            <option value="1.0">D</option>
            <option value="0.0">F</option>
        </select>
    `;
    courseList.appendChild(row);
});

calculateGpaBtn.addEventListener('click', () => {
    const creditsInputs = document.querySelectorAll('.credits-input');
    const gradeInputs = document.querySelectorAll('.grade-input');
    
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < creditsInputs.length; i++) {
        const credits = parseFloat(creditsInputs[i].value);
        const grade = parseFloat(gradeInputs[i].value);

        if (!isNaN(credits) && credits > 0) {
            totalPoints += grade * credits;
            totalCredits += credits;
        }
    }

    if (totalCredits > 0) {
        const gpa = (totalPoints / totalCredits).toFixed(2);
        gpaResult.textContent = `Result: ${gpa}`;
    } else {
        gpaResult.textContent = 'Please enter valid credits.';
    }
});

// Pomodoro Timer Logic
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-timer');
const resetBtn = document.getElementById('reset-timer');

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    // Logic: Ensure the timer does not speed up if clicked multiple times
    if (timerId !== null) return;

    timerId = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alert('Time is up! Take a break.');
            timeLeft = 25 * 60;
            updateTimerDisplay();
        }
    }, 1000);
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
});
