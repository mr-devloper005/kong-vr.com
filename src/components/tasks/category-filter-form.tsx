"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
import { CATEGORY_OPTIONS } from "@/lib/categories";

interface CategoryFilterFormProps {
  currentCategory: string;
}

export function CategoryFilterForm({ currentCategory }: CategoryFilterFormProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = selectedCategory === "all" 
      ? "/images" 
      : `/images?category=${encodeURIComponent(selectedCategory)}`;
    router.push(url);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="rounded-[1.8rem] border border-[#cfdeea] bg-white p-6 shadow-[0_22px_55px_rgba(14,35,54,0.06)]"
    >
      <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#5f7384]">
        <Filter className="h-4 w-4" />
        Filter by category
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          suppressHydrationWarning
          className="h-11 min-w-[220px] rounded-xl border border-[#cfdeea] bg-[#f7fbff] px-3 text-sm outline-none focus:border-[#86adcf]"
        >
          <option value="all">All categories</option>
          {CATEGORY_OPTIONS.map((item) => (
            <option key={item.slug} value={item.slug}>{item.name}</option>
          ))}
        </select>
        <button 
          type="submit" 
          className="h-11 rounded-xl bg-[#143d5f] px-5 text-sm font-semibold text-white hover:bg-[#0f324e]"
        >
          Apply
        </button>
      </div>
      <p className="mt-3 text-sm text-[#59707e]">
        Tip: Use categories to focus on specific visual styles faster.
      </p>
    </form>
  );
}
