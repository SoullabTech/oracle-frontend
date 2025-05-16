import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import InsightTags from '@/components/InsightTags';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getVoiceProfile } from '@/lib/getVoiceProfile';
import { supabase } from '@/lib/supabaseClient';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  phase: string;
  element?: string;
}

const elementColors: Record<string, string> = {
  Fire: 'bg-red-200 text-red-800',
  Water: 'bg-blue-200 text-blue-800',
  Earth: 'bg-green-200 text-green-800',
  Air: 'bg-sky-200 text-sky-800',
  Aether: 'bg-yellow-200 text-yellow-800',
};

export default function JournalTimelinePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const queryPhase = params.get('phase');
  const queryTag = params.get('tag');

  const profile = getVoiceProfile(null);

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editElement, setEditElement] = useState('');
  const [editPhase, setEditPhase] = useState('');
  const [phase, setPhase] = useState<string | null>(localStorage.getItem('spiral_phase') || null);
  const [elementFilter, setElementFilter] = useState<string>(localStorage.getItem('spiral_element') || '');
  const [filterTag, setFilterTag] = useState<string | null>(localStorage.getItem('spiral_tag') || null);

  useEffect(() => {
    if (queryPhase) setPhase(queryPhase);
    if (queryTag) {
      setFilterTag(queryTag);
      localStorage.setItem('spiral_tag', queryTag);
    }
  }, [queryPhase, queryTag]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase.from('spiral_journal').select('*').order('date', { ascending: false });
      if (!error && data) {
        const filtered = queryPhase ? data.filter((e) => e.phase === queryPhase) : data;
        setEntries(filtered);
      }
    };
    fetchEntries();
  }, [queryPhase]);

  const filteredEntries = entries.filter((entry) => {
    const tagMatch = filterTag ? entry.content.includes(filterTag) : true;
    const elementMatch = elementFilter ? entry.element === elementFilter : true;
    return tagMatch && elementMatch;
  });

  const startEditing = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
    setEditElement(entry.element || '');
    setEditPhase(entry.phase);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditContent('');
    setEditElement('');
  };

  const saveEdit = async (entryId: string) => {
    const { error } = await supabase
      .from('spiral_journal')
      .update({ content: editContent, element: editElement, phase: editPhase })
      .eq('id', entryId);

    if (!error) {
      setEntries((prev) =>
        prev.map((e) => (e.id === entryId ? { ...e, content: editContent, element: editElement, phase: editPhase } : e))
      );
      cancelEditing();
      toast.success('✅ Entry updated.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 p-8">
      <div className="text-center font-medium text-indigo-600 mb-6">
        {profile.uiLabels.journalPrompt}
      </div>

      <div className="flex gap-4 flex-wrap mb-6">
        <Select
          value={phase || ''}
          onValueChange={(value) => {
            setPhase(value);
            localStorage.setItem('spiral_phase', value);
            navigate(`/journal-timeline?phase=${encodeURIComponent(value)}`);
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by phase..." />
          </SelectTrigger>
          <SelectContent>
            {['', 'Fire', 'Water', 'Earth', 'Air', 'Aether'].map((p) => (
              <SelectItem key={p} value={p}>{p || 'All Phases'}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={elementFilter}
          onValueChange={(value) => {
            setElementFilter(value);
            localStorage.setItem('spiral_element', value);
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by element..." />
          </SelectTrigger>
          <SelectContent>
            {['', 'Fire', 'Water', 'Earth', 'Air', 'Aether'].map((e) => (
              <SelectItem key={e} value={e}>{e || 'All Elements'}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          onClick={() => {
            setPhase(null);
            setElementFilter('');
            setFilterTag(null);
            localStorage.removeItem('spiral_phase');
            localStorage.removeItem('spiral_element');
            localStorage.removeItem('spiral_tag');
            navigate('/journal-timeline');
            toast.success('🔄 Filters reset! Showing all entries.');
          }}
        >
          🔄 Reset All Filters
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>⬅ Back to Dashboard</Button>
      </div>

      {filterTag && (
        <div className="max-w-3xl mx-auto mb-4 text-sm text-indigo-600">
          Filtering by tag: <strong>{filterTag}</strong>
          <Button
            size="sm"
            variant="ghost"
            className="ml-2"
            onClick={() => {
              setFilterTag(null);
              localStorage.removeItem('spiral_tag');
              params.delete('tag');
              navigate(`/journal-timeline?${params.toString()}`);
            }}
          >
            Clear Tag Filter
          </Button>
        </div>
      )}

      <div className="grid gap-6 max-w-3xl mx-auto">
        {filteredEntries.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
              {editingId === entry.id ? (
                <>
                  <Textarea
                    className="w-full mt-2 text-gray-800"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={5}
                  />
                  <div className="mt-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Element</label>
                    <Select value={editElement} onValueChange={setEditElement}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select element..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(elementColors).map((element) => (
                          <SelectItem key={element} value={element}>{element}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Phase</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      value={editPhase}
                      onChange={(e) => setEditPhase(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="default" onClick={() => saveEdit(entry.id)}>Save</Button>
                    <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-md text-gray-800 whitespace-pre-wrap mt-2">{entry.content}</p>
                  <InsightTags
                    entryId={entry.id}
                    onTagClick={(tag) => {
                      setFilterTag(tag);
                      localStorage.setItem('spiral_tag', tag);
                      navigate(`/journal-timeline?tag=${encodeURIComponent(tag)}`);
                    }}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-indigo-500">Phase: {entry.phase}</p>
                      {entry.element && (
                        <Badge className={`text-xs ${elementColors[entry.element] || 'bg-gray-200 text-gray-800'}`}>
                          {entry.element}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => startEditing(entry)}>Edit</Button>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    🔮 Symbol: {
                      entry.element === 'Fire' ? 'Phoenix 🔥 (Courage, Creation)' :
                      entry.element === 'Water' ? 'Moon 🌙 (Emotion, Dreaming)' :
                      entry.element === 'Earth' ? 'Tree 🌳 (Stability, Growth)' :
                      entry.element === 'Air' ? 'Feather 🪶 (Clarity, Thought)' :
                      entry.element === 'Aether' ? 'Star ✨ (Transcendence, Synchronicity)' :
                      'Oracle 💫 (Insight, Guidance)'
                    }
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredEntries.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No journal entries match your filters.</p>
        )}
      </div>
    </div>
  );
}
