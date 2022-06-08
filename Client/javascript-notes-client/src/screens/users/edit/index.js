import React, { Fragment, useState } from "react";
import { Column, Section, Title, Container, Card } from "rbx";
import HeaderLogged from "../../../components/headers/header_logged";
import UserInfoForm from "../../../components/forms/user_edit";
import ChangePasswordForm from "../../../components/forms/change_password";
import DeleteAccountForm from "../../../components/forms/delete_account";
import "../../../styles/user_edit.scss";

const UsersEditScreen = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [key, setKey] = useState("1");

  return (
    <Fragment>
      <HeaderLogged key={key} isHidden={true} />
      <Section size="small" className="user-edit">
        <Container>
          <Column.Group centered>
            <Column size={5}>
              <Section>
                <Title size={6} className="has-text-grey">
                  Personal Information
                </Title>
                <Card>
                  <Card.Content>
                    <UserInfoForm user={user} setKey={setKey} />
                  </Card.Content>
                </Card>
              </Section>
              <Section>
                <Title size={6} className="has-text-grey">
                  Change Password
                </Title>
                <Card>
                  <Card.Content>
                    <ChangePasswordForm />
                  </Card.Content>
                </Card>
              </Section>
              <Section>
                <Title size={6} className="has-text-danger" spaced>
                  Delete Account
                </Title>
                <Card>
                  <Card.Content>
                    <DeleteAccountForm />
                  </Card.Content>
                </Card>
              </Section>
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </Fragment>
  );
};

export default UsersEditScreen;
