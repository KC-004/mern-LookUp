import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";


const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();
    
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`notes/${id}`);
                setNote(res.data);
                console.log(note)
            } 
            catch (error) {
                console.log("Error in NoteDetailPage", error);
                toast.error("Failed to fetch the note");
            }
            finally {
                setLoading(false);
            } 
        };

        fetchNote()
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10"/>
            </div>
        )
    }

    const handleDelete = async (e) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${note._id}`);
            toast.success("Note deleted successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error in the handleDelete()", error);
            toast.error("Failed to delete!");
        }
    };


    const handleSave = async (e) => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error on handleSave()", error);
            toast.error("Failed to update!");
        }
        finally {
            setSaving(false);
        }
    };


    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to={"/"} className="btn btn-ghost">
                            <ArrowLeftIcon/>
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5"/>
                            Delete Note
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text"
                                placeholder="Note title"
                                className="input input-bordered"
                                value={note.title}
                                onChange={(e) => setNote({...note, title: e.target.value})}/>
                                
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea 
                                className="textarea textarea-bordered h-32" 
                                placeholder="Write your note here..."
                                onChange={(e) => setNote({...note, content:e.target.value})}
                                value={note.content}/>
                                
                            </div>
                            
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving? "Saving...": "save Changes"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    ); 
};

export default NoteDetailPage;

