import type { Domain } from '../data/types';
import { HudCard, HudTags, pad2, type HudVariant } from './HudCard';

export type DomainCardVariant = HudVariant;

interface Props {
  domain: Domain;
  count: number;
  index: number;
  total: number;
  variant?: HudVariant;
}

export function DomainCard({ domain, count, index, total, variant = 'tile' }: Props) {
  const tags = domain.focus.slice(0, variant === 'feature' ? 4 : 3);
  return (
    <HudCard
      rgb={domain.rgb}
      to={`/d/${domain.id}`}
      label={`${domain.label}: ${count} entries`}
      index={index}
      total={total}
      path={domain.id}
      title={domain.name}
      subtitle={domain.short}
      variant={variant}
      icon={domain.icon}
      count={{ value: pad2(count), label: 'entries' }}
    >
      {variant === 'feature' && <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300/90">{domain.intro}</p>}
      {variant !== 'tile' && <HudTags items={tags} />}
    </HudCard>
  );
}
