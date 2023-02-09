
class newTask{
    constructor(title,Date,priority){
        this.title = title;
        this.date = Date;
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