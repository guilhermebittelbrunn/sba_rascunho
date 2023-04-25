export default function useCreateLink(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}