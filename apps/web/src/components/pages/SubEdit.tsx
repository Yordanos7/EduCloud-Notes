import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Share2, Download } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";

const SubEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState(
    id ? "Introduction to Cloud Computing" : "Untitled Note"
  );
  const [content, setContent] = useState(
    id
      ? "<p>Cloud computing is the delivery of computing services over the internet...</p>"
      : ""
  );

  useEffect(() => {
    if (toolbarRef.current) {
      gsap.fromTo(
        toolbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleSave = () => {
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "The share link has been copied to your clipboard.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting...",
      description: "Your note is being exported to PDF.",
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toolbar */}
      <div
        ref={toolbarRef}
        className="border-b border-border bg-card shadow-royal-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="max-w-md font-playfair text-xl font-semibold border-none focus-visible:ring-0 px-2"
              placeholder="Note title..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-royal-md border border-border p-6 min-h-[600px]">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-full"
            placeholder="Start writing your notes..."
          />
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="fixed bottom-4 left-4 text-sm text-muted-foreground bg-card px-3 py-2 rounded-full shadow-royal-sm">
        All changes saved
      </div>
    </div>
  );
};

export default SubEdit;
