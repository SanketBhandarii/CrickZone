import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, X } from "lucide-react";

function UserMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserMatches = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/userMatches`, { withCredentials: true });
        setMatches(response.data.matches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserMatches();
  }, []);

  const confirmDelete = async (matchId) => {
    setMatches(matches.filter((m) => m._id !== matchId));
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/match/deleteMatch`, { matchId }, { withCredentials: true });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-white">Loading matches...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-9">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mx-6 mb-8">
          <button onClick={() => navigate("/zone")} className="flex items-center gap-2 text-zinc-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-semibold">Your Matches</h1>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl text-zinc-400 mb-2">No matches found</h2>
            <p className="text-zinc-500">Start playing to see your match history</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <div key={match._id} className="relative bg-zinc-900 border border-zinc-800 rounded-lg py-8 px-5 mx-6 hover:bg-zinc-800/50 transition-colors">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="absolute top-3 right-3 text-zinc-500 hover:text-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Overs: {match.over}</span>
                      <span>{match.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{match.teams}</h3>
                      <span className="text-xs text-zinc-500">{match.date}</span>
                    </div>
                    
                    <p className="text-sm text-zinc-300">{match.result}</p>
                  </div>

                  <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Delete Match?</AlertDialogTitle>
                      <AlertDialogDescription className="text-zinc-400">
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => confirmDelete(match._id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMatches;