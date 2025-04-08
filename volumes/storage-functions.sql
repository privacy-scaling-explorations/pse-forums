-- Storage search function
CREATE OR REPLACE FUNCTION storage.search(prefix text, bucketname text, limits int DEFAULT 100, levels int DEFAULT 1, offsets int DEFAULT 0)
RETURNS TABLE (
    name text,
    id uuid,
    updated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ,
    metadata jsonb
)
LANGUAGE plpgsql
AS $function$
BEGIN
    return query 
        with files_folders as (
            select path_tokens[levels] as folder
            from storage.objects
            where objects.name ilike prefix || '%'
            and bucket_id = bucketname
            GROUP by folder
            limit limits
            offset offsets
        ) 
        select files_folders.folder as name, objects.id, objects.updated_at, objects.created_at, objects.last_accessed_at, objects.metadata from files_folders 
        left join storage.objects
        on prefix || files_folders.folder = objects.name
        where objects.id is null or objects.bucket_id=bucketname;
END
$function$;

-- Extension function to update last accessed time
CREATE OR REPLACE FUNCTION storage.extension(name text, bucketid text)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    select string_to_array(_filename, '.') into _parts;
    
    -- Check if there's any file extension
    if array_length(_parts,1) > 1 then
        return _parts[array_length(_parts,1)];
    else
        return '';
    end if;
END
$$;

-- Function to update last accessed time
CREATE OR REPLACE FUNCTION storage.foldername(name text, bucketid text)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return array_to_string(_parts[1:array_length(_parts,1)-1], '/');
END
$$;

-- Function to get filename from path
CREATE OR REPLACE FUNCTION storage.filename(name text, bucketid text)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$$;

-- Function to update last accessed time
CREATE OR REPLACE FUNCTION storage.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    return NEW;
END
$$;

-- Create the trigger for objects table
CREATE TRIGGER update_storage_objects_updated_at
BEFORE UPDATE ON storage.objects
FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column(); 