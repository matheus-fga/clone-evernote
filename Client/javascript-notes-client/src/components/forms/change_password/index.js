import React, { Fragment, useState } from "react";
import { Button, Field, Control, Input, Column, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from "../../../services/users";

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [status, setStatus] = useState("");

  const updatePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await UserService.updatePassword({
          currentPassword: oldPassword,
          newPassword: newPassword,
        });
        console.log(response);
        if (response.error) {
          setStatus("current-password");
          setTimeout(() => setStatus(""), 5000);
        } else {
          setStatus("success");
          localStorage.clear();
          setTimeout(() => setRedirectToLogin(true), 4000);
        }
      } catch (error) {
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      }
    } else {
      setStatus("confirm-password");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    updatePassword();
  };

  if (redirectToLogin) return <Navigate to={"/login"} />;

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
            {status === "error" && (
              <Help color="danger">Error updanting password</Help>
            )}
            {status === "current-password" && (
              <Help color="danger">Current Password incorrect</Help>
            )}
            {status === "confirm-password" && (
              <Help color="danger">Different passwords</Help>
            )}
            {status === "success" && (
              <Help color="success">
                Password successfully updated. Please, login again
              </Help>
            )}
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  );
}

export default ChangePasswordForm;
