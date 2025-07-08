import Note from "../models/Note.js"


// GET ALL NOTES
export const getAllNotes = async (_, res) => { 
    try {   
        const notes = await Note.find().sort({createdAt:-1}); //newest first, -1 will sort in desc

        res.status(200).json(notes)
    } 
    catch (error) {
        console.error("Error in getAllNotes controller.", error)
        res.status(500).json({message: "Internal server error."})
    }
}


// GET NOTE BY ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        
        if (!note) return res.status(404).json({message: "Notes not found!"});
        
        res.status(200).json(note);
    } 
    catch (error) {
        console.error("Error in getNoteById controller.", error);
        res.status(500).json({message: "Internal server error."});
    }
}


// CREATE NOTES
export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const note = new Note({title:title, content:content});
        const savedNode = await note.save() ;
        res.status(201).json(savedNode);
    } 
    catch (error) {
        console.error("Error in createNote controller.", error)
        res.status(500).json({message: "Internal server error."})
    }
}


// UPDATE NOTES
export const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content},
            {
                new: true,
            }
        );

        if (!updatedNote) return res.status(404).json({message: "Note not found!"});

        res.status(200).json({message:"Note updated successfully!"});
    } 
    catch (error) {
        console.error("Error in createNote controller.", error);
        res.status(500).json({message: "Internal server error."});
    }
}

//DELETENOTE
export const deleteNote = async (req,res) => {
    try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    
    if (!deletedNote) return res.status(404).json({message: "Note not found!"});

    res.status(200).json({message: "Note has been deleted", deletedNote})
    } 
    catch (error) {
        console.error("Error in DeleteNote controller.", error);
        res.status(500).json({message: "Internal server error."});
    }
}


///////////

