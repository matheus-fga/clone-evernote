import React, { Fragment, useState } from "react";
import { Button, Title, Column } from "rbx";

function DeleteAccountForm() {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const deleteAccount = async () => {
    console.log("Account deleted");
  };

  return (
    <Fragment>
      <Column align="right">
        <Button color="danger" outlined onClick={deleteAccount()}>
          Delete
        </Button>
      </Column>
    </Fragment>
  );
}

export default DeleteAccountForm;
