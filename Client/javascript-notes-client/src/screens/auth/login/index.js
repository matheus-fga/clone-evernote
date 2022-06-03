import React, { Fragment } from "react";
import Header from "../../../components/headers/header";
import { Column, Section, Title, Container, Card } from "rbx";
import logoImage from "../../../assets/images/logo.png";
import LoginForm from "../../../components/forms/login";
import "../../../styles/auth.scss";

const LoginScreen = () => (
  <Fragment>
    <Header />
    <Section size="small" className="auth">
      <Container>
        <Column.Group centered>
          <Column size={4}>
            <Card>
              <Card.Content>
                <Section>
                  <Column.Group centered>
                    <Column size={12}>
                      <img src={logoImage} />
                    </Column>
                  </Column.Group>

                  <Column.Group>
                    <Column size={12}>
                      <Title
                        size={6}
                        className="has-text-grey has-text-centered"
                      >
                        Your notes on the cloud
                      </Title>
                    </Column>
                  </Column.Group>
                  <LoginForm />
                </Section>
              </Card.Content>
            </Card>
          </Column>
        </Column.Group>
      </Container>
    </Section>
  </Fragment>
);

export default LoginScreen;
