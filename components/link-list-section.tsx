import { ChevronRight, Star } from "lucide-react";

export type LinkItem = {
  link: string;
  name: string;
  isFeature: boolean;
};

function LinkListItem({ item }: { item: LinkItem }) {
  return (
    <li>
      <a
        className="block max-w-full hover:underline"
        href={item.link}
        target="_blank"
        rel="noreferrer"
      >
        <span className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {item.isFeature ? (
            <Star className="size-4 shrink-0 text-yellow-500" />
          ) : (
            <ChevronRight className="size-4 shrink-0" />
          )}
          {item.name}
        </span>
      </a>
    </li>
  );
}

export function LinkListSection({
  title,
  items,
}: {
  title: string;
  items: LinkItem[];
}) {
  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      <ul className="mt-3 grid list-none grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {items.map((item) => (
          <LinkListItem key={item.link} item={item} />
        ))}
      </ul>
    </div>
  );
}
