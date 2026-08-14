/* simple-icons は path、lucide はコンポーネントで来るため、ここで吸収する */
export default function StackIcon({ item, size = 19 }) {
  if (item.Icon) {
    const { Icon } = item
    return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={item.icon.path} />
    </svg>
  )
}
