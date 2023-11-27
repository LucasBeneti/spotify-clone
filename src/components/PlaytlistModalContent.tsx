import { useState, useRef } from "react";
type PlaylistModalContentProps = {
  handleSaveEdit: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export const PlaylistModalContent = ({
  handleSaveEdit,
  handleChange,
}: PlaylistModalContentProps) => {
  const [hasError, setHasError] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const isAbleToSave = () => {
    if (!nameInputRef.current?.value) {
      setHasError(true);
    } else {
      handleSaveEdit();
    }
  };

  return (
    <section className="flex flex-col w-full gap-6 pb-3">
      <span className="row-span-1">
        <input
          id="playlist_name"
          name="playlist_name"
          type="text"
          className="w-full rounded-md bg-inputfocus py-1 pl-2 outline-none text-sm placeholder-subdued"
          placeholder="Título (Ex: Melhor playlist)"
          spellCheck="false"
          onBlur={handleChange}
          onFocus={() => setHasError(false)}
          ref={nameInputRef}
        />
        {hasError ? (
          <p className="text-xs text-red-700 font-bold mt-2">
            Campo "Título" é obrigatório para salvar alteração.
          </p>
        ) : null}
      </span>
      <textarea
        name="playlist_description"
        id="playlist_description"
        className="w-full row-span-3 rounded-md bg-inputfocus pl-2 pt-3 pb-6 outline-none resize-none text-sm placeholder-subdued"
        placeholder="Adicione uma descrição opcional"
        spellCheck="false"
        onBlur={handleChange}
      ></textarea>
      <button
        onClick={isAbleToSave}
        className="py-3 px-8 bg-white text-black rounded-full font-bold transition-transform delay-150 hover:scale-105 self-end"
      >
        Salvar
      </button>
      <span className="font-bold text-xs text-white">
        Ao continuar, você autoriza o Spotify a acessar a imagem enviada.
        Certifique-se de que você tem o direito de fazer o upload dessa imagem.
      </span>
    </section>
  );
};
