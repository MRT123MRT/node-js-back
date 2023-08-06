import database from '../db/knex';
import DBTodo from '../../types/DBTodo';
import { DbUser } from '../../types/DbUser';

//todos queries
export const getTodoDB= async (userid: string) => {
    return await database('todos').where('userid', userid);   
}
export const addTodoToDB = async (dbtodo: DBTodo) => {
   await database('todos').insert(dbtodo) 
}
export const deleteTodoDB = async (todoid: string) => {
    await database('todos').where('todoid',todoid).del();
}
export const updateTodoDB = async (dbtodo: DBTodo) => {
    await database('todos').where('todoid', dbtodo.todoid).update(dbtodo);
}
export const fetchTodosDB = async (userid: string) => {
    return await database('todos').where('userid', userid);
}
//users queries
export const registerDB = async (user:DbUser) => {
    await database('users').insert({ //NOT HERE
        username: user.username,
        password: user.password,
        email: user.email
      });
    }

export const loginDB = async (username: string) => {
    return await database('users').where('username', username).first();
}
