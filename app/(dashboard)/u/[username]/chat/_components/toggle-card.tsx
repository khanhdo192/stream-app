"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnable" | "isChatDelay" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

const ToggleCard = ({ label, value = false, field }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Chat settings updated"))
        .catch(() => toast("Something went wrong"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch checked={value} onCheckedChange={onChange} disabled={isPending}>
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl w-full p-10" />;
};

export { ToggleCard, ToggleCardSkeleton };
