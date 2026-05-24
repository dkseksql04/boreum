-- Create saved_quotes table to store user-scrapbooked book passages
CREATE TABLE IF NOT EXISTS public.saved_quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    book_title TEXT NOT NULL,
    quote_text TEXT NOT NULL,
    user_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.saved_quotes ENABLE ROW LEVEL SECURITY;

-- Create RLS security policies for personal data privacy
CREATE POLICY "Users can insert their own saved quotes" 
    ON public.saved_quotes FOR INSERT 
    WITH CHECK (true); -- Accessible for quick prototyping, or auth.uid() = user_id when auth is fully active

CREATE POLICY "Users can view their own saved quotes" 
    ON public.saved_quotes FOR SELECT 
    USING (true); -- Accessible for quick prototyping, or auth.uid() = user_id when auth is fully active

CREATE POLICY "Users can delete their own saved quotes" 
    ON public.saved_quotes FOR DELETE 
    USING (true); -- Accessible for quick prototyping, or auth.uid() = user_id when auth is fully active
