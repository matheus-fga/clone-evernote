import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button, Field, Control, Input, Column, Label, Help } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from "../../../services/users";

function UserInfoForm(props) {
  const [name, setName] = useState(JSON.parse(props.user).name);
  const [email, setEmail] = useState(JSON.parse(props.user).email);
  const previousEmail = useRef();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [status, setStatus] = useState("");

  const updateUserInfo = async () => {
    try {
      await UserService.update({
        name: name,
        email: email,
      });
      if (previousEmail.current === email) {
        setStatus("sucess-name");
      } else {
        setStatus("sucess-email");
        setTimeout(() => setRedirectToLogin(true), 4000);
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    updateUserInfo();
  };

  useEffect(() => {
    previousEmail.current = email;
  }, [previousEmail]);

  if (redirectToLogin) return <Navigate to={"/login"} />;

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
                {status === "error" && (
                  <Help color="danger">Error updanting information</Help>
                )}
                {status === "sucess-name" && (
                  <Help color="success">Full name successfully updated</Help>
                )}
                {status === "sucess-email" && (
                  <Help color="success">
                    Email successfully updated. Please, login again
                  </Help>
                )}
              </Control>
            </Field>
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  );
}

export default UserInfoForm;
