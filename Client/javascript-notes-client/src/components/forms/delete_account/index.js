import React, { Fragment, useState } from "react";
import { Button, Column, Title, Help } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from "../../../services/users";

function DeleteAccountForm() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [status, setStatus] = useState("");

  const deleteAccount = async () => {
    if (window.confirm("Do you really want to delete account?")) {
      try {
        await UserService.delete();
        setStatus("success");
        localStorage.clear();
        setTimeout(() => setRedirectToHome(true), 4000);
      } catch (error) {
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      }
    }
  };

  if (redirectToHome) return <Navigate to={"/"} />;

  return (
    <Fragment>
      <Column.Group centered>
        <Column size={10}>
          <Title size={6} className="has-text-grey" subtitle>
            Attention! This action is irreversible
          </Title>
          <Column.Group breakpoint="mobile">
            <Column align="right">
              <Button color="danger" outlined onClick={deleteAccount}>
                Delete
              </Button>
            </Column>
          </Column.Group>
          {status === "error" && (
            <Help color="danger">Error deleting account</Help>
          )}
          {status === "success" && (
            <Help color="success">Account successfully deleted</Help>
          )}
        </Column>
      </Column.Group>
    </Fragment>
  );
}

export default DeleteAccountForm;
