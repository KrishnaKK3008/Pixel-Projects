document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const dueTasksDiv = document.querySelector('.due-tasks');
    const upcomingTasksDiv = document.querySelector('.upcoming-tasks');
    const todayTasksDiv = document.querySelector('.today-tasks');
    const searchTaskInput = document.getElementById('searchTask');
    const errorMessageDiv = document.getElementById('errorMessage');
    const errorMessageText = document.getElementById('errorMessageText');
    const closeErrorBtn = document.getElementById('closeError');
    const emptyDueDiv = document.getElementById('emptyDue');
    const emptyUpcomingDiv = document.getElementById('emptyUpcoming');
    const emptyTodayDiv = document.getElementById('emptyToday');

    let tasks = loadTasks();

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayMessage(message, isError = true) {
        errorMessageText.textContent = message;
        errorMessageDiv.style.display = 'flex';
        errorMessageDiv.style.backgroundColor = isError ? '#ffecb3' : '#e0f7fa';
        errorMessageDiv.style.borderColor = isError ? '#ffcc80' : '#b2ebf2';
        errorMessageDiv.style.color = isError ? '#795548' : '#0097a7';
    }

    function clearMessage() {
        errorMessageDiv.style.display = 'none';
        errorMessageText.textContent = '';
    }

    closeErrorBtn.addEventListener('click', clearMessage);

    function renderTasks(taskList, container) {
        container.innerHTML = '';
        if (taskList.length === 0) {
            const emptyMessageDiv = container === dueTasksDiv ? emptyDueDiv : (container === upcomingTasksDiv ? emptyUpcomingDiv : emptyTodayDiv);
            if (emptyMessageDiv) {
                emptyMessageDiv.style.display = 'block';
            }
            return;
        } else {
            const emptyMessageDiv = container === dueTasksDiv ? emptyDueDiv : (container === upcomingTasksDiv ? emptyUpcomingDiv : emptyTodayDiv);
            if (emptyMessageDiv) {
                emptyMessageDiv.style.display = 'none';
            }
        }

        const groupedTasks = {};
        taskList.forEach(task => {
            if (!groupedTasks[task.date]) {
                groupedTasks[task.date] = [];
            }
            groupedTasks[task.date].push(task);
        });

        for (const date in groupedTasks) {
            const daySection = document.createElement('div');
            daySection.classList.add('task-day');
            const dateHeading = document.createElement('h3');
            dateHeading.textContent = formatDate(date);
            daySection.appendChild(dateHeading);

            groupedTasks[date].forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item');
                taskItem.dataset.taskId = task.id;

                const taskDetails = document.createElement('div');
                taskDetails.classList.add('task-details');
                taskDetails.textContent = task.text;
                const timeSpan = document.createElement('span');
                timeSpan.classList.add('task-time');
                timeSpan.textContent = formatTime(task.time);
                taskDetails.appendChild(timeSpan);
                taskItem.appendChild(taskDetails);

                const taskActions = document.createElement('div');
                taskActions.classList.add('task-actions');

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit-btn');
                editButton.addEventListener('click', () => editTask(task.id));
                taskActions.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', () => deleteTask(task.id));
                taskActions.appendChild(deleteButton);

                taskItem.appendChild(taskActions);
                daySection.appendChild(taskItem);
            });
            container.appendChild(daySection);
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const period = parseInt(hours) < 12 ? 'am' : 'pm';
        const formattedHours = parseInt(hours) % 12 === 0 ? 12 : parseInt(hours) % 12;
        return `${formattedHours}:${minutes} ${period}`;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;
        const taskTime = timeInput.value;

        if (!taskText || !taskDate || !taskTime) {
            displayMessage('Please fill in all fields.');
            return;
        }
        clearMessage();

        const newTask = {
            id: Date.now(),
            text: taskText,
            date: taskDate,
            time: taskTime
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        filterAndDisplayTasks();
    }

    addTaskBtn.addEventListener('click', addTask);

    function editTask(taskId) {
        const taskToEdit = tasks.find(task => task.id === taskId);
        if (taskToEdit) {
            taskInput.value = taskToEdit.text;
            dateInput.value = taskToEdit.date;
            timeInput.value = taskToEdit.time;
            addTaskBtn.textContent = 'Save Edit';
            addTaskBtn.removeEventListener('click', addTask);
            addTaskBtn.addEventListener('click', function saveEditedTask() {
                const updatedText = taskInput.value.trim();
                const updatedDate = dateInput.value;
                const updatedTime = timeInput.value;

                if (!updatedText || !updatedDate || !updatedTime) {
                    displayMessage('Please fill in all fields.');
                    return;
                }
                clearMessage();

                taskToEdit.text = updatedText;
                taskToEdit.date = updatedDate;
                taskToEdit.time = updatedTime;
                saveTasks();
                taskInput.value = '';
                dateInput.value = '';
                timeInput.value = '';
                addTaskBtn.textContent = 'Add Task';
                addTaskBtn.removeEventListener('click', saveEditedTask);
                addTaskBtn.addEventListener('click', addTask);
                filterAndDisplayTasks();
            });
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        filterAndDisplayTasks();
    }

    function filterAndDisplayTasks() {
        const searchTerm = searchTaskInput.value.toLowerCase();
        const today = new Date().toISOString().split('T')[0];
        const dueTasks = [];
        const upcomingTasks = [];
        const todayTasks = [];

        tasks.forEach(task => {
            const taskLower = task.text.toLowerCase();
            if (taskLower.includes(searchTerm)) {
                if (task.date < today) {
                    dueTasks.push(task);
                } else if (task.date === today) {
                    todayTasks.push(task);
                } else {
                    upcomingTasks.push(task);
                }
            }
        });

        renderTasks(todayTasks.sort((a, b) => a.time.localeCompare(b.time)), todayTasksDiv);
        renderTasks(dueTasks.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)), dueTasksDiv);
        renderTasks(upcomingTasks.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)), upcomingTasksDiv);
    }

    searchTaskInput.addEventListener('input', filterAndDisplayTasks);

    filterAndDisplayTasks(); // Initial display of tasks
});