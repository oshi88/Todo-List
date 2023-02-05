
class newTask{
    constructor(title,dueDate,priority){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class todo{
    
    static allTasks = [];

    static setTask(task){
        todo.allTasks.push(task);
    }

    static getTask(){
        return todo.allTasks;
    }

    
}

export {
    newTask,todo
}