"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

type RecommenedDataType = User & { stream: { isLive: boolean } | null };

interface RecommendedProps {
  data: RecommenedDataType[];
}

const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-muted-foreground text-sm">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user: RecommenedDataType) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};

export { Recommended, RecommendedSkeleton };
