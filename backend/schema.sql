-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Courses Table
create table courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subject text not null,
  description text,
  created_by uuid references auth.users(id),
  is_published boolean default true,
  created_at timestamp with time zone default now()
);

-- Course Pages Table
create table course_pages (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  page_index int not null,
  title text not null,
  content_md text not null,
  created_at timestamp with time zone default now()
);

-- Questions Table
create table questions (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  question_text text not null,
  type text default 'mcq',
  created_at timestamp with time zone default now()
);

-- Question Options Table
create table question_options (
  id uuid primary key default uuid_generate_v4(),
  question_id uuid references questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean default false
);

-- RLS Policies
alter table courses enable row level security;
alter table course_pages enable row level security;
alter table questions enable row level security;
alter table question_options enable row level security;

-- Policy: Everyone can view published courses
create policy "Public courses are viewable by everyone" on courses
  for select using (is_published = true);

-- Policy: Creators can view their own courses (published or not)
create policy "Creators can view own courses" on courses
  for select using (auth.uid() = created_by);

-- Policy: Service role (backend) needs full access - Supabase service role bypasses RLS by default if using service_role key, 
-- but for explicit user-level access we might need more. 
-- However, we will use Service Role Key in NestJS, which bypasses RLS.

-- For frontend read access to related tables (pages, questions, options)
create policy "Public course pages are viewable" on course_pages
  for select using (exists (select 1 from courses where id = course_pages.course_id and is_published = true));

create policy "Public course questions are viewable" on questions
  for select using (exists (select 1 from courses where id = questions.course_id and is_published = true));

create policy "Public course options are viewable" on question_options
  for select using (exists (select 1 from questions join courses on questions.course_id = courses.id where questions.id = question_options.question_id and courses.is_published = true));
