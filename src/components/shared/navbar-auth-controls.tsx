'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const hiddenTaskKeys = new Set<TaskKey>(['listing', 'classified', 'article', 'profile', 'sbm', 'pdf'])

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="hidden h-11 gap-1 rounded-full border border-[#ffffff30] bg-[linear-gradient(135deg,#1b4f78_0%,#2a82c7_52%,#6db4e7_100%)] px-5 text-white shadow-[0_18px_34px_rgba(22,73,116,0.35)] hover:brightness-105 sm:flex"
          >
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]">
          {SITE_CONFIG.tasks.filter((task) => task.enabled && !hiddenTaskKeys.has(task.key as TaskKey)).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="max-w-[170px] truncate text-sm font-medium text-slate-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">{user?.name}</span>
        <Button
          onClick={logout}
          size="sm"
          className="h-10 rounded-full bg-[#10263b] px-4 text-white hover:bg-[#0b1b2a]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  )
}
