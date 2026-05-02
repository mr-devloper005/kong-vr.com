'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'


export default function PressPage() {
  const { toast } = useToast()

  return (
    <PageShell
      title="Press"
      description="Media resources, brand assets, and press coverage."
    >
      <Card className="border-border bg-card">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Press Kit</h2>
          <p className="text-sm text-muted-foreground">
            Download logos, product screenshots, and brand guidelines for media use.
          </p>
          <p className="text-sm text-muted-foreground">Coming soon.</p>
        </CardContent>
      </Card>
    </PageShell>
  )
}
