-- Remove author_badges column from posts table
ALTER TABLE posts DROP COLUMN author_badges;

-- Remove author_badges column from replies table
ALTER TABLE replies DROP COLUMN author_badges; 