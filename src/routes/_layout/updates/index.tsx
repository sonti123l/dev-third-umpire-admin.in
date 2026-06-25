import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/updates/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/updates/"!</div>
}
