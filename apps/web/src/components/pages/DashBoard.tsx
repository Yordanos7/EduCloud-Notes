import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Share2,
  Trash2,
  Edit,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";
import gsap from "gsap";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  title: string;
  snippet: string;
  lastUpdated: string;
}

const SubDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const gridRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Introduction to Cloud Computing",
      snippet:
        "Cloud computing is the delivery of computing services over the internet...",
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      title: "Database Management Systems",
      snippet:
        "DBMS is software that handles the storage, retrieval, and updating of data...",
      lastUpdated: "1 day ago",
    },
    {
      id: "3",
      title: "Web Development Notes",
      snippet:
        "HTML, CSS, and JavaScript are the core technologies for building web pages...",
      lastUpdated: "3 days ago",
    },
  ]);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".note-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [notes]);

  const handleNewNote = () => {
    navigate("/editor");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card shadow-royal-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="font-playfair text-2xl font-bold text-foreground">
              EduCloud Notes
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="font-playfair text-4xl font-bold mb-2 text-foreground">
            My Notes
          </h2>
          <p className="text-muted-foreground text-lg">
            Organize and manage all your study materials
          </p>
        </div>

        {/* Notes Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {notes.map((note) => (
            <Card
              key={note.id}
              className="note-card hover-lift shadow-royal-md border-2 cursor-pointer group"
            >
              <CardHeader>
                <CardTitle className="font-playfair text-xl line-clamp-1">
                  {note.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Updated {note.lastUpdated}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">
                  {note.snippet}
                </p>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/editor/${note.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">
              No notes yet. Create your first note!
            </p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-royal-lg hover:scale-110 transition-smooth animate-float"
        onClick={handleNewNote}
      >
        <Plus className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default SubDashboard;
