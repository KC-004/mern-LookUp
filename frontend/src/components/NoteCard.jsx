import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils.js"
import { api } from "../lib/axios.js"
import toast from "react-hot-toast"


export const NoteCard = ({note, setNotes}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if(!window.confirm("Are you sure want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id)) // get rid of the deleted one
            toast.success("Note deleted successfully!");
        } catch (error) {
            console.log("Error deleting the note", error)
            toast.error("Failed to delete!");
        }
    }
  return (
    <Link to={`/note/${note._id}`} 
    className="card bg-base-300 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-blue-500"
    >
        <div className="card-body">
            <h3 className="font-bold">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4"/>
                    <button className="btn btn-ghost btn-xs text-red-500" onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className="size-4"></Trash2Icon>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}
