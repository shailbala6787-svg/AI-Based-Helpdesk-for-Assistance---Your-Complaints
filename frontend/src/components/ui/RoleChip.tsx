import { ROLES } from '../../constants/roles';

interface RoleChipProps {
  role: string;
}

export default function RoleChip({ role }: RoleChipProps) {
  const isAdmin = role === ROLES.ADMIN;

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
        isAdmin
          ? 'bg-(--color-primary) text-(--color-primary-fg)'
          : 'bg-(--color-bg-muted) text-(--color-text-muted) border border-(--color-border)'
      }`}
    >
      {role}
    </span>
  );
}
