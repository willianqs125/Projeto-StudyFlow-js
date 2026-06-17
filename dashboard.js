document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (userData) document.getElementById("userNameDisplay").textContent = `Olá, ${userData.name}`;

    document.getElementById("btnDashboardLogout").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "login1.html";
    });

    const todoForm = document.getElementById("todoForm"), taskInput = document.getElementById("taskInput"), taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks_studyflow")) || [];

    const updateProgress = () => {
        const completed = tasks.filter(t => t.completed).length;
        const p = tasks.length === 0 ? 0 : (completed / tasks.length) * 100;
        document.getElementById("progressBar").style.width = p + "%";
        document.getElementById("progressText").textContent = Math.round(p) + "% concluído";
    };

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((t, i) => {
            const li = document.createElement("li");
            li.className = `task-item ${t.completed ? 'completed' : ''}`;
            li.innerHTML = `<div>${t.text} <small>(${t.category})</small></div>
            <div><button onclick="toggleTask(${i})">✓</button><button onclick="deleteTask(${i})">🗑️</button></div>`;
            taskList.appendChild(li);
        });
        updateProgress();
    };

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        tasks.push({ text: taskInput.value, category: document.getElementById("categoryInput").value, completed: false });
        localStorage.setItem("tasks_studyflow", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
    });

    window.toggleTask = (i) => { tasks[i].completed = !tasks[i].completed; localStorage.setItem("tasks_studyflow", JSON.stringify(tasks)); renderTasks(); };
    window.deleteTask = (i) => { tasks.splice(i, 1); localStorage.setItem("tasks_studyflow", JSON.stringify(tasks)); renderTasks(); };

    document.getElementById("btnGenerateSchedule").addEventListener("click", () => {
        tasks.push({ text: "Revisar Matemática", category: "Matemática", completed: false });
        renderTasks();
    });

    renderTasks();
});
