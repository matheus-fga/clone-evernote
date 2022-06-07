import React, { Fragment, useState } from "react";
import { Button, Column, Title } from "rbx";

function DeleteAccountForm() {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const deleteAccount = async () => {
    console.log("Account deleted");
  };

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
        </Column>
      </Column.Group>
    </Fragment>
  );
}

export default DeleteAccountForm;
