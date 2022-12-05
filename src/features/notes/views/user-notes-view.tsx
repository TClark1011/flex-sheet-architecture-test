import type { WithSession } from "@/types/utility-types";
import type { FC } from "react";

export const UserNotesView: FC<WithSession> = ({ authSession }) => {
  return (
    <p>
      This will eventually show the notes for the user {authSession.user?.name}
    </p>
  );
};
