import {todo} from "./task";
import {isToday,parseISO,isThisWeek} from "date-fns";

export default class DateSort{
    static allTaskArray = todo.getTask();
    static todayTask = [];
    static weekTask = [];

    static getAllTask(){
        return DateSort.allTaskArray;
    }

    static isToday(){
        DateSort.todayTask.length = 0;
        DateSort.allTaskArray.forEach(task =>{
            if(isToday(parseISO(task.date))){
                DateSort.todayTask.push(task);
            }
        })
        return DateSort.todayTask;
    }

    static isThisWeek(){
        DateSort.weekTask.length = 0;
        DateSort.allTaskArray.forEach(task =>{
            if(isThisWeek(parseISO(task.date))){
                DateSort.weekTask.push(task);
            }
        })
        return DateSort.weekTask;
    }

    static removeTask(day,task){
        if(day === 'all-task'){
            DateSort.allTaskArray.splice(task,1);
        }else if(day === 'today'){
            DateSort.todayTask.splice(task,1);
        }else if(day === 'week'){
            DateSort.weekTask.splice(task,1);
        }
    }
}