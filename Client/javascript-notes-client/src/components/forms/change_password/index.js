import React, { Fragment, useState } from "react";
import { Button, Field, Control, Input, Column, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Column.Group centered>
        <form onSubmit={HandleSubmit}>
          <Column size={12}>
            <Field>
              <Label size="small">Current Password:</Label>
              <Control>
                <Input
                  type="password"
                  required
                  name="old-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">New Password:</Label>
              <Control>
                <Input
                  type="password"
                  required
                  name="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Confirm Password:</Label>
              <Control>
                <Input
                  type="password"
                  required
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column align="right">
                    <Button color="custom-purple" outlined>
                      Change
                    </Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            {error && <Help color="danger">Current Password incorrect</Help>}
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  );
}

export default ChangePasswordForm;
