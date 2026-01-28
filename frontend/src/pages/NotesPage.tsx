import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/config/axios";
import type { Note } from "@/types";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const response = await api.get("/notes");
      setNotes(response.data);
    })();
  }, [notes]);

  const saveNote = async () => {
    await api.post("/notes", { title, content });
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-4 mb-8 border-b border-black">
        <h1 className="text-2xl font-bold">Notes App</h1>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>Add Note</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="name-1"
                    name="name"
                    placeholder="My first note"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Content</Label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-64"
                    placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, repellat. Blanditiis veritatis delectus aliquam! Blanditiis explicabo veritatis dolore eum sunt architecto soluta quia, harum voluptatibus facere saepe voluptatem quibusdam eius?"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={saveNote}>Save</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </nav>

      <div className="grid grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card key={note._id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
