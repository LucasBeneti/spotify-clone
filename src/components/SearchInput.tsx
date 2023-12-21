import { useRef, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

import { debounce } from "../utils";

export const SearchInput = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value === "") {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }

    setSearchParams({ q: e.target.value });
  };
  function clearSearchInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    searchParams.delete("q");
    setSearchParams(searchParams);
  }

  return (
    <span
      className={`grid grid-flow-col items-center rounded-full border-2 border-transparent bg-highlight h-12 w-80 px-2 ${
        inputFocus && "border-white"
      }`}
    >
      <MagnifyingGlass size={20} />
      <Form method="get" action="/search" ref={formRef}>
        <input
          type="text"
          name="q"
          onChange={debounce(handleSearchInput, 400)}
          className="h-10 w-56 py-2 pl-1 bg-transparent outline-none"
          placeholder="O que você quer ouvir?"
          ref={inputRef}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      </Form>
      <button onClick={clearSearchInput} className="justify-self-end">
        <X size={20} className="hover:cursor-pointer" />
      </button>
    </span>
  );
};
