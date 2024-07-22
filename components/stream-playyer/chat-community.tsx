"use client";

import { useParticipants } from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useMemo, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({ hostName, isHidden, viewerName }: ChatCommunityProps) => {
  const participants = useParticipants();
  const [value, setValue] = useState("");

  const debounced = useDebounceCallback(setValue, 500);

  const onChange = (newValue: string) => {
    debounced(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const dedupe = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return dedupe.filter((participant) => {
      return participant.name?.toLowerCase().includes(value.toLowerCase());
    });
  }, [participants, value]);

  if (isHidden) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-sm text-muted-foreground hidden last:block p-2">
          {filteredParticipants.map((participant) => (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          ))}
        </p>
      </ScrollArea>
    </div>
  );
};
