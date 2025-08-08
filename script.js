const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');


function showAlert(message) {
  const alertBox = document.getElementById('alert');
  alertBox.textContent = message;
  alertBox.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 2000);
}
// Load from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

// Add task
addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
  renderTask(task, false);
  saveTasks();
  taskInput.value = '';
  showAlert("✅ Task added!");
}

});

// Support Enter key
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// Render task function
function renderTask(text, completed) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;

  const btns = document.createElement('div');
  btns.className = 'task-btns';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.className = 'complete-btn';
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
saveTasks();
showAlert("✔ Task marked as completed!");
    
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
   li.remove();
saveTasks();
showAlert("🗑️ Task deleted!");
  };

  btns.append(completeBtn, deleteBtn);
  li.append(span, btns);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    tasks.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
