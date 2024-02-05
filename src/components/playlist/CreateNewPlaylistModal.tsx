import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Modal } from "@components/reusable/Modal";

import { PlaylistModalContent } from "./PlaylistModalContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const CreateNewPlaylistModal = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const [cookies] = useCookies(["user_jwt"]);
  const navigate = useNavigate();

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
  const queryClient = useQueryClient();

  const { mutateAsync: handleSaveEditFn } = useMutation({
    mutationFn: handleSaveEdit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user_playlists"] });

      if (data?.playlist_id) {
        navigate(`/playlist/${data?.playlist_id}`);
        handleClose();
      }
    },
    onError: () => {
      console.error(
        "Something went wrong while trying to create a new playlist",
      );
    },
  });

  async function handleSaveEdit(playlistData: typeof playlistInfo) {
    if (playlistData?.name) {
      console.log("sending new playlist data", {
        ...playlistData,
      });

      try {
        const res = await fetch(`${SERVER_URL}/playlist/create`, {
          method: "POST",
          headers: { Authorization: `Bearer ${cookies.user_jwt}` },
          body: JSON.stringify({
            name: playlistData?.name,
            description: playlistData?.description,
          }),
        });

        const createdPlaylistData = await res?.json();
        return createdPlaylistData || [];
      } catch (error) {
        console.error("Erro while trying to submit the edit.", error);
      }
    }
  }
  return (
    <Modal handleClose={handleClose} title="Criar Playlist">
      <PlaylistModalContent
        handleChange={handleChange}
        handleSaveEdit={() => handleSaveEditFn(playlistInfo)}
      />
    </Modal>
  );
};
