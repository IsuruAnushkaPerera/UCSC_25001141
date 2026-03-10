document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');

            // Update Active Link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Switch Tab
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === target) {
                    tab.classList.add('active');
                }
            });
        });
    });

    // --- Idea Board Logic ---
    const ideaInput = document.getElementById('idea-input');
    const addIdeaBtn = document.getElementById('add-idea');
    const ideaGrid = document.getElementById('idea-grid');

    addIdeaBtn.addEventListener('click', () => {
        const text = ideaInput.value.trim();
        if (text) {
            const note = document.createElement('div');
            note.className = 'sticky-note fade-in';
            note.innerHTML = `<p>${text}</p>`;
            ideaGrid.prepend(note);
            ideaInput.value = '';
        }
    });

    // --- GPA Calculator Logic ---
    const addCourseBtn = document.getElementById('add-course');
    const calculateGpaBtn = document.getElementById('calculate-gpa');
    const courseList = document.getElementById('course-list');
    const gpaResult = document.getElementById('gpa-result');
    const gpaValue = document.getElementById('gpa-value');

    addCourseBtn.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'course-row fade-in';
        row.innerHTML = `
            <input type="text" placeholder="Course Name" class="course-name">
            <input type="number" placeholder="Credits" class="course-credits" min="1">
            <select class="course-grade">
                <option value="4.0">A / A+</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C-</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.0">E / F</option>
            </select>
        `;
        courseList.appendChild(row);
    });

    calculateGpaBtn.addEventListener('click', () => {
        const rows = document.querySelectorAll('.course-row');
        let points = 0, credits = 0;
        rows.forEach(r => {
            const c = parseFloat(r.querySelector('.course-credits').value);
            const g = parseFloat(r.querySelector('.course-grade').value);
            if (!isNaN(c) && c > 0) { points += c * g; credits += c; }
        });
        if (credits > 0) {
            gpaValue.textContent = (points / credits).toFixed(2);
            gpaResult.classList.remove('hidden');
        } else {
            alert('Please enter credits for at least one course.');
        }
    });

    // --- Pomodoro Timer Logic ---
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timerStatus = document.querySelector('.timer-status');

    let timeLeft = 25 * 60, timerId = null, isRunning = false;

    function updateDisplay() {
        const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
        timerDisplay.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    startBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timerId);
            startBtn.textContent = 'Start';
            timerStatus.textContent = 'Timer paused.';
            isRunning = false;
        } else {
            isRunning = true;
            startBtn.textContent = 'Pause';
            timerStatus.textContent = 'Focusing...';
            timerId = setInterval(() => {
                timeLeft--;
                updateDisplay();
                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    alert('Time is up!');
                    resetBtn.click();
                }
            }, 1000);
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        isRunning = false;
        timeLeft = 25 * 60;
        updateDisplay();
        startBtn.textContent = 'Start';
        timerStatus.textContent = 'Timer reset.';
    });
});