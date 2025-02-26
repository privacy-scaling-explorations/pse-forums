import { createFileRoute } from '@tanstack/react-router'
import { Labels } from 'c/ui/Labels';

export const Route = createFileRoute('/_left-sidebar/profile')({
  component: ProfilePageView,
})

function ProfilePageView() {
  return (
    <div>
      <Labels.PageTitle>Profile</Labels.PageTitle>
    </div>
  );
}
