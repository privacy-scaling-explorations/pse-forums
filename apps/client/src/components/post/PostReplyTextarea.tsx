import { Button } from "../ui/Button";
import { Textarea } from "../inputs/Textarea";
import { Select } from "../inputs/Select";
import { Switch } from "../inputs/Switch";
import { useForm } from "@tanstack/react-form";
import { MailIcon, FileBadge } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Tag } from "../ui/Tag";
import { useGetBadges } from "@/hooks/usePosts";
import { AuthorSchema } from "@/shared/schemas/post";


interface PostReplyProps {
  postId?: number | string;
  author?: AuthorSchema;
  onFocus?: () => void;
  isVisible?: boolean;
  showFields?: boolean;
  placeholder?: string;
  rows?: number;
  onClick?: () => void;
  onBlur?: () => void;
}

export const PostReplyTextarea = ({
  author,
  isVisible = false,
  showFields = false,
  placeholder = "Add comment",
  rows = 4,
  onClick,
  onFocus,
  onBlur,
}: PostReplyProps) => {
  if (!isVisible) return null;

  const [selectedBadges, setSelectedBadges] = useState<any>(null);
  const form = useForm<any>();

  const { data: badges } = useGetBadges();

  return (
    <div
      className={cn({
        "flex flex-col gap-4 border-l-[3px] border-base-border pl-5":
          showFields,
      })}
    >
      <Textarea
        placeholder={placeholder}
        rows={rows}
        onFocus={onFocus}
        onClick={onClick}
        onBlur={onBlur}
      />

      {showFields && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="lg:w-1/4">
              <form.Field
                name="tags"
                children={(field) => (
                  <Select
                    header={
                      <div className="flex items-center gap-[6px] text-base-muted-foreground">
                        <FileBadge className="size-[18px]" />
                        <span className="text-base font-medium">Badges</span>
                      </div>
                    }
                    label="Add badges"
                    items={badges?.map(({ id, name }: any) => ({
                      value: id,
                      label: (
                        <div className="flex items-center gap-1">
                          <MailIcon className="size-4" />
                          <span>{name}</span>
                        </div>
                      ),
                    }))}
                    onValueChange={(value) => {
                      const currentTags = field.state.value || [];
                      console.log("test", currentTags, value);
                      if (!currentTags.includes(value)) {
                        setSelectedBadges([...currentTags, value]);
                      }
                    }}
                    field={field}
                  />
                )}
              />
            </div>
            <div className="ml-auto flex flex-col gap-4 justify-end">
              <form.Field
                name="postAsAnonymous"
                children={(field) => (
                  <Switch
                    label="Post as anonymous?"
                    description={
                      field.state.value
                        ? "Your name will not be displayed"
                        : `You are posting as ${author?.username}`
                    }
                    checked={!!field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    field={field}
                  />
                )}
              />
              <form.Subscribe
                selector={({ canSubmit, isSubmitting }) => [
                  canSubmit,
                  isSubmitting,
                ]}
                children={([_canSubmit, isSubmitting]) => (
                  <Button
                    aria-busy={isSubmitting}
                    disabled={isSubmitting}
                    className="min-w-[160px]"
                  >
                    Post
                  </Button>
                )}
              />
            </div>
          </div>
          {selectedBadges && selectedBadges.length > 0 && (
            <div className="flex flex-col gap-2">
              {selectedBadges.map((badge: any) => {
                const badgeData = badges?.find((b: any) => b.id === badge);
                return (
                  <Tag key={badge} className="w-fit">
                    <MailIcon className="size-4" />
                    <span>{badgeData?.name}</span>
                  </Tag>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
