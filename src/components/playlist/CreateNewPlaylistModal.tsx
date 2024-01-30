import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Modal } from "@components/reusable/Modal";

import { PlaylistModalContent } from "./PlaylistModalContent";

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

  // TODO implementar com useMutations do react-query, pois ele faz que faz o request pra efetivamente adicionar
  // o dado no banco, e atualizar o cache do request pra já mostrar automaticamente no sidebar
  // dessa forma o cache estará atualizado e o dado estará também no DB, mas tudo isso sem um request a mais
  const handleSaveEdit = async () => {
    if (playlistInfo?.name) {
      console.log("sending new playlist data", {
        ...playlistInfo,
      });

      await fetch(`${SERVER_URL}/playlist/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${cookies.user_jwt}` },
        body: JSON.stringify({
          name: playlistInfo?.name,
          description: playlistInfo?.description,
        }),
      })
        .then(async (response) => {
          const { createdResponse } = await response.json();
          // navigation is working now, just need to add the playlist to the sidebar
          // something like an updatePlaylist method to fetch newly created playlists
          // or just set manually the playlist on the sidebar and wait for the refetch for this function to happen
          navigate(`/playlist/${createdResponse.playlist_id}`);
          handleClose();
        })
        .catch((error) => {
          console.error("Erro while trying to submit the edit.", error);
        });
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
