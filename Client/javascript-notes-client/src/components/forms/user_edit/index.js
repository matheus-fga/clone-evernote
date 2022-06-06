import React, { Fragment, useState } from "react";
import { Button, Field, Control, Input, Column, Help, Label } from "rbx";

function UserInfoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Column.Group centered>
        <form onSubmit={HandleSubmit}>
          <Column size={12}>
            <Field>
              <Label size="small">Full name:</Label>
              <Control>
                <Input
                  type="text"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Email:</Label>
              <Control>
                <Input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column align="right">
                    <Button color="custom-purple" outlined>
                      Update
                    </Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            {error && <Help color="danger">Error updanting information</Help>}
            {sucess && (
              <Help color="success">information successfully updated</Help>
            )}
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  );
}

export default UserInfoForm;
