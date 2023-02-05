import { newTask,todo } from "./task";
export default class UI{
    static LoadHomePage(){
        UI.addNewTask();
    } 

    static addNewTask(){
        let title;
        let dueDate;
        let priorityBtn;
        let submitBtn = document.getElementById('submitBtn');

        function readInputsValue(){
            title = document.getElementById('title');
            dueDate = document.getElementById('dueDate');
            priorityBtn = document.getElementById('setPriority');
        }

        submitBtn.addEventListener('click', ()=>{
            readInputsValue();
            let setPriority;
            if(priorityBtn.checked == true){
                setPriority = 'high';
            }else{
                setPriority = 'low';
            }
            let task = new newTask(title.value,dueDate.value,setPriority);
            todo.setTask(task);
            console.log(todo.getTask());
            UI.loadAllTask();
            title.value = "";
            dueDate.value = "";
            priorityBtn.checked = false;
        })
    }

    static loadAllTask(){
        const taskContainer = document.getElementById('taskList');
        taskContainer.innerHTML = '';
        todo.getTask().forEach((task) => {
        const cssPriorityUI = (task) => (task.priority == 'high' ? "highPriority":"lowPriority")
        taskContainer.innerHTML += `<div class="highPriority"><div>
        <div>${task.title}</div>
        <div>${task.dueDate}</div>
            </div></div>`;
        });
    }
}
