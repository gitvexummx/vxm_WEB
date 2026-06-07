'use client';

import { JSX, useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: (props: AccordionProps) => JSX.Element = ({
  items,
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full space-y-2">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div
            key={item.id}
            className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900/30 backdrop-blur-sm transition-all duration-300 hover:border-slate-600"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500/30"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-slate-200">{item.title}</span>
              <span
                className={`transform transition-transform duration-300 text-cyan-400 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-4 pt-2 text-slate-400 border-t border-slate-800/50">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
