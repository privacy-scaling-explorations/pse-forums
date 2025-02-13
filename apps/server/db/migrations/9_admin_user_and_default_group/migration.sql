-- disable triggers to prevent circular foreign key constraint violation
-- can't insert default group first as it refer to a user (aid),
-- can't insert user first as the trigger will try to insert into membership that refers to the group table
alter table "group" disable trigger add_admin_to_group_trigger;

-- no need for a profile for the admin user
alter table "user" disable trigger create_profile_from_new_user_trigger;
-- TODO: make this configurable by env var secret? force reset on first login?
insert into "user" (
  "email",
  "encrypted_password",
  "salt",
  "username"
) values (
  'admin@placeholder.dev',
  -- admin@dm1n!
  'e02ac007c65de8525a956dfcd5a5c48512a1716d99fc355d48a97ecdfc5e58295da433384c9439d25c56e806f6ebbd87d691f63e7467b05bc25acb555566fa8d',
  '558add8565fadd0916328576df4c2c9e86e99b3b5b871bb725a023bfe14e71c4de400cabc48cb26f2ec2cdd9a933017ded1b4c32ec3706b8905504431f07a5cf',
  'admin'
);
alter table "user" enable trigger create_profile_from_new_user_trigger;

-- create default group and make admin user a member of the default group
with admin_user as (
  select id from "user" where username = 'admin'
),
default_group as (
  insert into "group" (aid, name, description)
  select id, 'Default', 'This is the default group all users are in and where posts are created by default.'
  from admin_user
  returning id
)
insert into membership (uid, gid)
select admin_user.id, default_group.id
from admin_user, default_group;

alter table "group" enable trigger add_admin_to_group_trigger;

create function add_new_user_to_default_group_fn()
returns trigger as $$
begin
  insert into membership (uid, gid)
  values (new.id, 1);
  return new;
end;
$$ language plpgsql;

create trigger add_new_user_to_default_group_trigger
after insert on "user"
for each row
execute procedure add_new_user_to_default_group_fn();
