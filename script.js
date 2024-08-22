document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const taskCount = document.getElementById('taskCount');
    const selectAllCheckbox = document.getElementById('selectAll');

    // Display current date and time
    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
        document.getElementById('currentDateTime').textContent = dateTimeString;
    }
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute

    // Add task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        if (taskText.trim() === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-text">${taskText}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="del-btn">Del</button>
            </div>
        `;

        const checkbox = li.querySelector('.task-checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const delBtn = li.querySelector('.del-btn');

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            updateTaskCount();
        });

        editBtn.addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', taskText);
            if (newTaskText) {
                li.querySelector('.task-text').textContent = newTaskText;
            }
        });

        delBtn.addEventListener('click', () => {
            li.remove();
            updateTaskCount();
        });

        taskList.appendChild(li);
        updateTaskCount();
    }

    clearCompletedBtn.addEventListener('click', () => {
        const completedTasks = document.querySelectorAll('.completed');
        completedTasks.forEach(task => task.remove());
        updateTaskCount();
    });

    selectAllCheckbox.addEventListener('change', () => {
        const allTasks = document.querySelectorAll('.task-checkbox');
        allTasks.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
            if (selectAllCheckbox.checked) {
                checkbox.closest('li').classList.add('completed');
            } else {
                checkbox.closest('li').classList.remove('completed');
            }
        });
        updateTaskCount();
    });

    function updateTaskCount() {
        const totalTasks = taskList.querySelectorAll('li').length;
        const completedTasks = taskList.querySelectorAll('.completed').length;
        taskCount.textContent = `${totalTasks - completedTasks} uncompleted tasks`;
    }
});
