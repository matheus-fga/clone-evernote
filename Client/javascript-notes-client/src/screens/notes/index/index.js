import React, { Fragment, useState } from "react";
import HeaderLogged from "../../../components/headers/header_logged";
import Notes from "../../../components/notes";
import "../../../styles/notes.scss";

const NotesScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <HeaderLogged setIsOpen={setIsOpen} />
      <Notes setIsOpen={setIsOpen} isOpen={isOpen} />
    </Fragment>
  );
};

export default NotesScreen;
