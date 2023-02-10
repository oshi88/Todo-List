import { newTask,todo } from "./task";
import DateSort from "./taskDateFilter";

export default class UI{
    static LoadHomePage(){
        UI.inbox();
        UI.navMenu();
    } 

    static navMenu(){
        const inboxBtn = document.getElementById('inbox-tab');
        const todayBtn = document.getElementById('today-tab');                
        const weekBtn  = document.getElementById('week-tab');  
        const navMenuOpen = document.querySelector('.fa-bars');
        const menu = document.querySelector('.nav');

        navMenuOpen.addEventListener('click',()=>{
            navMenuBtn.classList.toggle('fa-bars');
            navMenuBtn.classList.toggle('fa-xmark');
            menu.classList.toggle('active');
        })
        inboxBtn.addEventListener('click',()=>{
            UI.inbox();
            console.log('Inbox Btn');
        })
        todayBtn.addEventListener('click',()=>{
            UI.taskLoader('today');
            console.log('today Btn');
        })
        weekBtn.addEventListener('click',()=>{
            UI.taskLoader('week');
            console.log('week Btn');
        })
    }

    static inbox(){
        let title;
        let dueDate;
        let priorityBtn;
        const submitBtn = document.getElementById('newTask-submitBtn');
        const addBtn = document.getElementById('addTask-btn');
        const popUpField = document.getElementById('newTask-popUp-window');
        const readInputsValue = () => {
            title = document.getElementById('task-title');
            dueDate = document.getElementById('date-picker');
            priorityBtn = document.getElementById('checkbox-Priority');
        }
        const emptyFieldCheck = () =>{
            title.value = "";
            dueDate.value = "";
        }
        addBtn.addEventListener('click',()=>{
            UI.newTaskPopUpWindow('popUp-open',popUpField,addBtn);
        })
        submitBtn.addEventListener('click', ()=>{
            readInputsValue();
            if(title.value === '' || dueDate.value === ''){
                emptyFieldCheck();
                return console.log('empty fields');
            }
            let task = new newTask(title.value,dueDate.value,priorityBtn.checked);
            todo.setTask(task);
            UI.taskLoader('all');
            title.value = "";
            dueDate.value = "";
            priorityBtn.checked = false;
            UI.newTaskPopUpWindow('popUp-close',popUpField,addBtn);
        })
        UI.taskLoader('all');
    }

    static newTaskPopUpWindow(action,popUpField,addBtn){
        if(action === 'popUp-open'){
                popUpField.classList.add('active');
                addBtn.classList.add('off');
            }
        if(action === 'popUp-close'){
                popUpField.classList.remove('active');
                addBtn.classList.remove('off');
            }
       } 

    static addBtn(key){
        const addBtn = document.getElementById('addTask-btn');
        if(key === 'active'){
            addBtn.classList.add('active');
        }
        if(key === 'off'){
            addBtn.classList.remove('active');
        }
    }   

    static taskLoader(taskSelection){
        const taskContainer = document.getElementById('taskList');
        taskContainer.innerHTML = ``;
        if(taskSelection==='all'){
            DateSort.allTaskArray.forEach((task) => {
                taskStructure(task,DateSort.getAllTask().indexOf(task),'all-task');
                UI.removeTask('allTask');
                });
        }
        if(taskSelection==='today'){
            DateSort.isToday().forEach((task)=>{
            taskStructure(task,DateSort.isToday().indexOf(task),'today');
            UI.removeTask('today');
            })
        }
        if(taskSelection==='week'){
            DateSort.isThisWeek().forEach((task)=>{
            taskStructure(task,DateSort.isThisWeek().indexOf(task),'week');
            UI.removeTask('week');
            })
        }
        function taskStructure(task,taskTypeValue,taskTypeName){
            let priorityClass = task.priority ? "highPriority" : "lowPriority";
            taskContainer.innerHTML += `<div class=${priorityClass}>
                <div>
                    <div class='task_Name_checkBtn'>
                        <div><input type="checkbox" class="remove-task" name=${taskTypeName} value="${taskTypeValue}"></div>
                        <div>${task.title}</div>
                    </div>
                    <div>${task.date}</div>
                </div>
                </div>`;
        }
    }

    static removeTask(taskType){
        const checkboxes = document.querySelectorAll(`.remove-task`);
        checkboxes.forEach(checkbox =>{
            checkbox.addEventListener("change",(e)=>{
                DateSort.removeTask(taskType,e.target.value);
                UI.taskLoader(taskType);
            })
        }) 
    }


}
