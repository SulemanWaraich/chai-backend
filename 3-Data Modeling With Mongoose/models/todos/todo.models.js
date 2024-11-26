import mongoose from "mongoose";

const todoSchema = new mongoose.Schema( 
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
       createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
       },
       subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo",
        }
       ]
    },

    {timestamps: true});

const Todo = mongoose.models("Todo", todoSchema);