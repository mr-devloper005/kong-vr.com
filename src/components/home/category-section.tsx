'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Monitor,
  Palette,
  Briefcase,
  Heart,
  UtensilsCrossed,
  Wrench,
  Smartphone,
  Home,
  Bike,
  Building
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Palette,
  Briefcase,
  Heart,
  UtensilsCrossed,
  Wrench,
  Smartphone,
  Home,
  Bike,
  Building
}

const categories = [
  { id: '1', name: 'Technology', slug: 'technology', icon: 'Monitor', count: 0 },
  { id: '2', name: 'Design', slug: 'design', icon: 'Palette', count: 0 },
  { id: '3', name: 'Business', slug: 'business', icon: 'Briefcase', count: 0 },
  { id: '4', name: 'Health & Wellness', slug: 'health-wellness', icon: 'Heart', count: 0 },
  { id: '5', name: 'Food & Drink', slug: 'food-drink', icon: 'UtensilsCrossed', count: 0 },
  { id: '6', name: 'Services', slug: 'services', icon: 'Wrench', count: 0 },
  { id: '7', name: 'Electronics', slug: 'electronics', icon: 'Smartphone', count: 0 },
  { id: '8', name: 'Home & Garden', slug: 'home-garden', icon: 'Home', count: 0 },
  { id: '9', name: 'Sports & Outdoors', slug: 'sports-outdoors', icon: 'Bike', count: 0 },
  { id: '10', name: 'Real Estate', slug: 'real-estate', icon: 'Building', count: 0 },
]

export function CategorySection() {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Explore Categories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse through our diverse range of content and listings
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Monitor
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/search?category=${category.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:bg-secondary"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-accent/10">
                    <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {category.count} items
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
