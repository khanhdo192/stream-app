"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  isBlocked: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, isBlocked, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You are now unfollowing ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    return isFollowing ? handleUnfollow() : handleFollow();
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`Blocked user ${data?.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => toast.success(`Unblock user ${data?.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClickBlocked = () => {
    return isBlocked ? handleUnblock() : handleBlock();
  };

  return (
    <>
      <Button onClick={onClick} variant="primary" disabled={isPending}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={onClickBlocked} disabled={isPending}>
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
