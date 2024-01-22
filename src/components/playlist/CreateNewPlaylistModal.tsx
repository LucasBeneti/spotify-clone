import { useState } from "react";
import { useCookies } from "react-cookie";
import { Modal } from "@components/reusable/Modal";

import { PlaylistModalContent } from "./PlaytlistModalContent";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const CreateNewPlaylistModal = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const [cookies] = useCookies(["user_jwt"]);
  const [playlistInfo, setPlaylistData] = useState<{
    name?: string;
    description?: string;
  }>();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = e.target.name;
    const fieldData = e.target.value;

    setPlaylistData((prev) => ({ ...prev, [fieldName]: fieldData }));
  };

  const handleSaveEdit = async () => {
    try {
      if (playlistInfo?.name) {
        console.log("sending new playlist data", {
          ...playlistInfo,
        });

        const createPlaylistRes = await fetch(`${SERVER_URL}/playlist/create`, {
          method: "POST",
          headers: { Authorization: `Bearer ${cookies.user_jwt}` },
          body: JSON.stringify({
            name: playlistInfo?.name,
            description: playlistInfo?.description,
          }),
        });

        return createPlaylistRes;
      }
    } catch (error) {
      console.error("Erro while trying to submit the edit.", error);
    }
  };
  return (
    <Modal handleClose={handleClose} title="Criar Playlist">
      <PlaylistModalContent
        handleChange={handleChange}
        handleSaveEdit={handleSaveEdit}
      />
    </Modal>
  );
};
