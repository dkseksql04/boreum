'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

type ActionResult = { success: boolean; error?: string }

export async function createBook(_: unknown, formData: FormData): Promise<ActionResult> {
  const title = formData.get('title') as string
  if (!title?.trim()) return { success: false, error: '제목을 입력해주세요' }

  const tags = ((formData.get('tags') as string) || '')
    .split(',').map(t => t.trim()).filter(Boolean)

  const { data: book, error } = await supabase
    .from('books')
    .insert({
      title: title.trim(),
      author: formData.get('author') as string,
      publisher: formData.get('publisher') as string,
      year: Number(formData.get('year')) || null,
      description: formData.get('description') as string,
      tags,
      cover_emoji: (formData.get('cover_emoji') as string) || '📚',
      month_label: formData.get('month_label') as string,
      reading_progress: Number(formData.get('reading_progress')) || 0,
    })
    .select()
    .single()

  if (error || !book) return { success: false, error: '저장에 실패했어요' }

  const points = [1, 2, 3]
    .map(i => (formData.get(`point_${i}`) as string)?.trim())
    .filter(Boolean)
    .map((content, i) => ({ book_id: book.id, content, order_num: i + 1 }))

  if (points.length > 0) {
    await supabase.from('discussion_points').insert(points)
  }

  revalidatePath('/')
  return { success: true }
}

export async function createMember(_: unknown, formData: FormData): Promise<ActionResult> {
  const name = formData.get('name') as string
  if (!name?.trim()) return { success: false, error: '이름을 입력해주세요' }

  const interests = ((formData.get('interests') as string) || '')
    .split(',').map(t => t.trim()).filter(Boolean)

  const { error } = await supabase.from('members').insert({
    name: name.trim(),
    role: (formData.get('role') as string) || '멤버',
    books_count: 0,
    interests,
    avatar_char: name.trim().charAt(0),
    avatar_bg: formData.get('avatar_bg') as string || '#CCFBF1',
    avatar_text: formData.get('avatar_text') as string || '#0F766E',
  })

  if (error) return { success: false, error: '저장에 실패했어요' }

  revalidatePath('/')
  return { success: true }
}

export async function createReview(_: unknown, formData: FormData): Promise<ActionResult> {
  const excerpt = formData.get('excerpt') as string
  const rating = Number(formData.get('rating'))
  if (!excerpt?.trim()) return { success: false, error: '감상을 입력해주세요' }
  if (!rating || rating < 1 || rating > 5) return { success: false, error: '별점을 선택해주세요' }

  const member_id = (formData.get('member_id') as string) || null
  const book_id = (formData.get('book_id') as string) || null

  const { error } = await supabase.from('reviews').insert({
    member_id,
    book_id,
    rating,
    excerpt: excerpt.trim(),
    likes: 0,
    comments_count: 0,
  })

  if (error) return { success: false, error: '저장에 실패했어요' }

  revalidatePath('/')
  return { success: true }
}

export async function createMeeting(_: unknown, formData: FormData): Promise<ActionResult> {
  const title = formData.get('title') as string
  const meeting_date = formData.get('meeting_date') as string
  if (!title?.trim()) return { success: false, error: '모임 제목을 입력해주세요' }
  if (!meeting_date) return { success: false, error: '날짜를 선택해주세요' }

  const book_id = (formData.get('book_id') as string) || null
  const leader_id = (formData.get('leader_id') as string) || 'guest'
  const notice = (formData.get('notice') as string) || ''

  const insertPayload: any = {
    title: title.trim(),
    book_id,
    meeting_date,
    time_range: formData.get('time_range') as string,
    location: formData.get('location') as string,
    attendees: 0,
    max_attendees: Number(formData.get('max_attendees')) || 15,
    status: 'upcoming',
    is_highlight: formData.get('is_highlight') === 'on',
    leader_id,
    notice
  }

  let { error } = await supabase.from('meetings').insert(insertPayload)

  if (error) {
    console.warn("Inserting with leader_id/notice failed, retrying with basic columns:", error.message)
    // Retry with only default columns
    const retryPayload = { ...insertPayload }
    delete retryPayload.leader_id
    delete retryPayload.notice

    const { error: retryError } = await supabase.from('meetings').insert(retryPayload)
    if (retryError) {
      console.error("Retry insert failed:", retryError.message)
      return { success: false, error: '저장에 실패했어요' }
    }
  }

  revalidatePath('/')
  return { success: true }
}
