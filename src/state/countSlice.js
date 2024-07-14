import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tasks : [],
    name : "",
    description : "",
    deadline : "",
    status : "",
}

const taskSlice = createSlice({
    name : 'task',
    initialState,
    reducers : {
        addTask : (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask : (state, action) => {
            state.tasks.splice(action.payload, 1);                      
        },
        updateTask : (state, action) => {
            const {index, newTask} = action.payload;
            state.tasks.splice(index, 1, newTask);
        },
        setName : (state, action) => {
            state.name = action.payload;
        },
        setDescription : (state, action) => {
            state.description = action.payload;
        },
        setDeadline : (state, action) => {
            state.deadline = action.payload;
        }, 
        setStatus : (state, action) => {
            state.status = action.payload;
        },       
    }
})

export const {addTask, deleteTask, updateTask, setName, setDescription, setDeadline, setStatus} = taskSlice.actions;
export default taskSlice.reducer;