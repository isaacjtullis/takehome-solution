import { useEffect, useState, useCallback, useRef } from 'react';

interface SlashMenuProps {
  items: Array<{
    title: string;
    description: string;
    command: (props: { editor: any; range: { from: number; to: number } }) => void;
  }>;
  editor: any;
  range: { from: number; to: number };
  selectedIndex?: number;
  onSelect: (item: { title: string; description: string; command: (props: { editor: any; range: { from: number; to: number } }) => void }) => void;
}

export default function SlashMenu({ items, editor, range, selectedIndex = 0, onSelect }: SlashMenuProps) {
  const [selectedIndexState, setSelectedIndex] = useState(selectedIndex);
  const selectedIndexRef = useRef(selectedIndexState);

  // Keep the ref in sync with state
  useEffect(() => {
    selectedIndexRef.current = selectedIndexState;
  }, [selectedIndexState]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!items.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((current) => {
          const next = (current + 1) % items.length;
          return next;
        });
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((current) => {
          const prev = (current - 1 + items.length) % items.length;
          return prev;
        });
        break;

      case 'Enter':
        e.preventDefault();
        const currentItem = items[selectedIndexRef.current];
        if (currentItem) {
          currentItem.command({ editor, range });
        }
        break;
    }
  }, [items, editor, range]);

  useEffect(() => {
    // Reset selected index when items change
    setSelectedIndex(0);
    
    // Add event listener with capture
    document.addEventListener('keydown', handleKeyDown, true);
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [handleKeyDown]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-56 p-2 rounded-xl bg-white shadow-xl flex flex-col gap-1">
      {items.map((item, idx) => (
        <div
          key={item.title}
          onClick={() => onSelect(item)}
          className={`px-2 py-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 text-base text-sm font-mono break-words whitespace-normal ${
            selectedIndexState === idx ? 'bg-gray-100' : ''
          }`}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
