let tasks = [];

function addTask() {
  const taskText = document.getElementById('task').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!taskText || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  const task = { taskText, date, time };
  tasks.push(task);
  displayTasks();
  clearInputs();
}

function clearInputs() {
  document.getElementById('task').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
}

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Group tasks by date
  const grouped = {};
  tasks.forEach(task => {
    if (!grouped[task.date]) grouped[task.date] = [];
    grouped[task.date].push(task);
  });

  Object.keys(grouped)
    .sort()
    .forEach(date => {
      const dateEl = document.createElement('div');
      dateEl.innerHTML = `<div class="task-date">${formatDate(date)}</div>`;
      grouped[date].forEach((task, idx) => {
        const taskEl = document.createElement('div');
        taskEl.className = 'task-item';
        taskEl.innerHTML = `
          <div>
            <div class="task-desc">${task.taskText} at <strong>${formatTime(task.time)}</strong></div>
          </div>
          <div class="task-buttons">
            <button class="edit" onclick="editTask('${date}', ${idx})">Edit</button>
            <button class="delete" onclick="deleteTask('${date}', ${idx})">Delete</button>
          </div>
        `;
        dateEl.appendChild(taskEl);
      });
      taskList.appendChild(dateEl);
    });
}

function formatDate(dateStr) {
  const parts = dateStr.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(':');
  const h = parseInt(hour);
  const ampm = h >= 12 ? 'pm' : 'am';
  const formattedHour = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHour}:${minute} ${ampm}`;
}

function deleteTask(date, index) {
  tasks = tasks.filter((task, i) => !(task.date === date && groupedIndex(date, i) === index));
  displayTasks();
}

function groupedIndex(date, index) {
  const filtered = tasks.filter(task => task.date === date);
  return filtered[index];
}

function editTask(date, index) {
  const filtered = tasks.filter(task => task.date === date);
  const task = filtered[index];
  document.getElementById('task').value = task.taskText;
  document.getElementById('date').value = task.date;
  document.getElementById('time').value = task.time;

  tasks = tasks.filter(t => !(t.date === date && t.taskText === task.taskText && t.time === task.time));
  displayTasks();
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll('.task-item');
  items.forEach(item => {
    const text = item.querySelector('.task-desc').innerText.toLowerCase();
    item.style.display = text.includes(query) ? 'flex' : 'none';
  });
});
