
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  BookHeart,
  CalendarDays,
  Camera,
  Edit3,
  Heart,
  Plus,
  Search,
  Trash2,
  X,
  Download,
  ArrowDownUp,
} from "lucide-react";

type MemoryCategory =
  | "Special day"
  | "Little moment"
  | "Achievement"
  | "Conversation"
  | "Celebration"
  | "Future dream";

type Memory = {
  id: string;
  title: string;
  date: string;
  category: MemoryCategory;
  description: string;
  photoUrl: string;
  createdAt: string;
};

const STORAGE_KEY = "fuer-immer-memory-journal";

const categories: MemoryCategory[] = [
  "Special day",
  "Little moment",
  "Achievement",
  "Conversation",
  "Celebration",
  "Future dream",
];

function getToday(): string {
  const now = new Date();
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  );

  return localDate.toISOString().slice(0, 10);
}

function loadMemories(): Memory[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    return Array.isArray(parsed) ? (parsed as Memory[]) : [];
  } catch {
    return [];
  }
}

function MemoryJournal() {
  const [memories, setMemories] = useState<Memory[]>(loadMemories);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">(
    "newest"
  );

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getToday);
  const [category, setCategory] = useState<MemoryCategory>("Little moment");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch {
      console.error("Could not save memories. Browser storage may be full.");
    }
  }, [memories]);

  const filteredMemories = useMemo(() => {
    const filtered = memories.filter((memory) => {
      const matchesSearch =
        memory.title.toLowerCase().includes(search.toLowerCase()) ||
        memory.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || memory.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      const comparison = a.date.localeCompare(b.date);
      return sortOrder === "newest" ? -comparison : comparison;
    });
  }, [memories, search, categoryFilter, sortOrder]);

  function resetForm() {
    setTitle("");
    setDate(getToday());
    setCategory("Little moment");
    setDescription("");
    setPhotoUrl("");
    setEditingId(null);
    setShowForm(false);
  }

  function openNewMemory() {
    resetForm();
    setShowForm(true);
  }

  function saveMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !date || !description.trim()) return;

    if (photoUrl.trim()) {
      try {
        const parsedUrl = new URL(photoUrl.trim());

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          alert("Please enter a valid image URL.");
          return;
        }
      } catch {
        alert("Please enter a valid image URL.");
        return;
      }
    }

    if (editingId) {
      setMemories((current) =>
        current.map((memory) =>
          memory.id === editingId
            ? {
                ...memory,
                title: title.trim(),
                date,
                category,
                description: description.trim(),
                photoUrl: photoUrl.trim(),
              }
            : memory
        )
      );
    } else {
      const newMemory: Memory = {
        id: crypto.randomUUID(),
        title: title.trim(),
        date,
        category,
        description: description.trim(),
        photoUrl: photoUrl.trim(),
        createdAt: new Date().toISOString(),
      };

      setMemories((current) => [newMemory, ...current]);
    }

    resetForm();
  }

  function editMemory(memory: Memory) {
    setTitle(memory.title);
    setDate(memory.date);
    setCategory(memory.category);
    setDescription(memory.description);
    setPhotoUrl(memory.photoUrl);
    setEditingId(memory.id);
    setShowForm(true);

    document.getElementById("memory-journal")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function deleteMemory(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this memory?"
    );

    if (!confirmed) return;

    setMemories((current) =>
      current.filter((memory) => memory.id !== id)
    );
  }

  function exportMemories() {
    const backup = {
      exportedAt: new Date().toISOString(),
      memories,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "our-little-forever-memories.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="memory-section section" id="memory-journal">
      <div className="section-heading">
        <p className="eyebrow">OUR LITTLE COLLECTION OF MOMENTS</p>

        <h2>
          The Memory <em>Journal ♡</em>
        </h2>

        <p className="section-subtitle">
          Big celebrations, ordinary afternoons and everything in
          between. Let's keep the little things, too.
        </p>
      </div>

      <div className="memory-journal" id="memory-journal-content">
        <div className="memory-toolbar">
          <div className="memory-toolbar-heading">
            <BookHeart size={25} />
            <div>
              <h3>Our scrapbook</h3>
              <p>{memories.length} memories collected</p>
            </div>
          </div>

          <div className="memory-toolbar-actions">
            <button
              className="memory-export-button"
              onClick={exportMemories}
              disabled={memories.length === 0}
              type="button"
            >
              <Download size={16} />
              Export
            </button>

            <button
              className="memory-add-button"
              onClick={openNewMemory}
              type="button"
            >
              <Plus size={17} />
              Add memory
            </button>
          </div>
        </div>

        {showForm && (
          <form className="memory-form" onSubmit={saveMemory}>
            <div className="memory-form-heading">
              <div>
                <p className="eyebrow">
                  {editingId ? "A MEMORY TO UPDATE" : "A NEW PAGE"}
                </p>

                <h3>
                  {editingId ? "Edit this memory" : "Save a little moment"}
                </h3>
              </div>

              <button
                type="button"
                className="memory-close-button"
                onClick={resetForm}
                aria-label="Close memory form"
              >
                <X size={20} />
              </button>
            </div>

            <label htmlFor="memory-title">Memory title</label>
            <input
              id="memory-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="The day we..."
              maxLength={100}
              required
            />

            <div className="memory-form-grid">
              <div>
                <label htmlFor="memory-date">Date</label>
                <input
                  id="memory-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="memory-category">Category</label>
                <select
                  id="memory-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as MemoryCategory)
                  }
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label htmlFor="memory-description">Tell the story</label>
            <textarea
              id="memory-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write what happened, what made it special, and what you want to remember..."
              rows={6}
              maxLength={5000}
              required
            />

            <label htmlFor="memory-photo">
              <Camera size={15} /> Photograph URL (optional)
            </label>
            <input
              id="memory-photo"
              type="url"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="https://..."
            />

            <p className="memory-form-hint">
              Use a direct image URL for now. We'll add private photo uploads
              when we build the shared database.
            </p>

            <div className="memory-form-footer">
              <span>{description.length}/5000 characters</span>

              <button className="memory-save-button" type="submit">
                <Heart size={15} />
                {editingId ? "Update memory" : "Save memory"}
              </button>
            </div>
          </form>
        )}

        <div className="memory-filters">
          <div className="memory-search">
            <Search size={17} />
            <input
              aria-label="Search memories"
              placeholder="Find a memory..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="All">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            className="memory-sort-button"
            onClick={() =>
              setSortOrder((current) =>
                current === "newest" ? "oldest" : "newest"
              )
            }
            type="button"
          >
            <ArrowDownUp size={15} />
            {sortOrder === "newest" ? "Newest first" : "Oldest first"}
          </button>
        </div>

        {filteredMemories.length === 0 ? (
          <div className="memory-empty">
            <div className="memory-empty-icon">
              <BookHeart size={38} />
            </div>

            <h3>
              {memories.length === 0
                ? "The first page is waiting..."
                : "No memories found"}
            </h3>

            <p>
              {memories.length === 0
                ? "Save the first little moment from your story. It doesn't have to be a big occasion."
                : "Try another search or category."}
            </p>

            {memories.length === 0 && (
              <button
                className="memory-add-button"
                onClick={openNewMemory}
                type="button"
              >
                <Plus size={16} />
                Write our first memory
              </button>
            )}
          </div>
        ) : (
          <div className="memory-grid">
            {filteredMemories.map((memory) => (
              <article className="memory-card" key={memory.id}>
                {memory.photoUrl && (
                  <div className="memory-photo">
                    <img
                      src={memory.photoUrl}
                      alt={memory.title}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="memory-card-content">
                  <div className="memory-card-meta">
                    <span className="memory-category">
                      {memory.category}
                    </span>

                    <span className="memory-date">
                      <CalendarDays size={13} />
                      {new Date(`${memory.date}T12:00:00`).toLocaleDateString(
                        undefined,
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <h3>{memory.title}</h3>

                  <p className="memory-description">
                    {memory.description}
                  </p>

                  <div className="memory-card-actions">
                    <button
                      type="button"
                      onClick={() => editMemory(memory)}
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteMemory(memory.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="memory-journal-footer">
          <span>Every little moment belongs somewhere.</span>
          <span>Made of memories ♡</span>
        </div>
      </div>
    </section>
  );
}

export default MemoryJournal;
