import { supabase } from '@/lib/supabase';
import CreateMeetingClient from './CreateMeetingClient';

export const unstable_instant = false;

export default async function CreateMeetingPage() {
  const { data: books } = await supabase
    .from('books')
    .select('id, title');

  return (
    <CreateMeetingClient books={books || []} />
  );
}
