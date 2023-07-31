

type DBTodo = {
    todoid: string;
    todotitle: string;
    tododescription: string;
    todoisdone: boolean;
    duedate: string | null;
    userid?: string,
}
export default DBTodo;

