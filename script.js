const tasks = [
    "DO Leetcode Virtual Contest or Codeforces Contest or Codechef Contest",
    "Revise OS",
    "Revise DBMS",
    "Solve Puzzle Problems",
    "Solve Aptitude Questions",
    "Manage Academics"
];

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const resetButton = document.getElementById('reset-button');
    
    loadTasks();

    resetButton.addEventListener('click', resetTasks);

    function loadTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.classList.add('complete-button');
            completeButton.addEventListener('click', () => toggleComplete(index, li));

            li.appendChild(completeButton);
            taskList.appendChild(li);
        });
    }

    function toggleComplete(index, li) {
        li.classList.toggle('completed');
        saveCompletionStatus(index, li.classList.contains('completed'));
    }

    function saveCompletionStatus(index, status) {
        let completionStatus = JSON.parse(localStorage.getItem('completionStatus')) || {};
        completionStatus[index] = status;
        localStorage.setItem('completionStatus', JSON.stringify(completionStatus));
    }

    function resetTasks() {
        localStorage.removeItem('completionStatus');
        loadTasks();
    }

    function loadCompletionStatus() {
        let completionStatus = JSON.parse(localStorage.getItem('completionStatus')) || {};
        Array.from(taskList.children).forEach((li, index) => {
            if (completionStatus[index]) {
                li.classList.add('completed');
            }
        });
    }

    function checkForReset() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        if (hours === 0 && minutes === 0 && seconds === 0) {
            resetTasks();
        }

        setTimeout(checkForReset, 1000);
    }

    loadCompletionStatus();
    checkForReset();
});
