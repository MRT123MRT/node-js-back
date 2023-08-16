import { DateTime } from "luxon";

export type DTOTodo = {
    title: string;
    content: string;
    completed: boolean;
    id: string;
    dueDate: string | null;
    userid?: string;
}

export type DBTodo = {
    todoid: string;
    todotitle: string; //FRONT DOSNT NEED TO KNOW ABOUT DATABASE TYPES
    tododescription: string;
    todoisdone: boolean;
    duedate: string | null;
    userid?: string,
}

export const convertToDTOTodo = (dbTodo: DBTodo): DTOTodo => {

    return {
        title: dbTodo.todotitle,
        content: dbTodo.tododescription,
        completed: dbTodo.todoisdone,
        id: dbTodo.todoid,
        dueDate: dbTodo.duedate 
    }
}

export const convertToDBTodo = (dtoTodo: DTOTodo): DBTodo => { // THIS CONVERSION NEEDS TO ONLY HAPPEN IN BACKEND

    console.log("convertToDBTodo: ", dtoTodo.dueDate, typeof dtoTodo.dueDate)

    return {
        todoid: dtoTodo.id,
        todotitle: dtoTodo.title,
        tododescription: dtoTodo.content,
        todoisdone: dtoTodo.completed,
        duedate: dtoTodo.dueDate ? dtoTodo.dueDate : null,
    } as DBTodo
}
