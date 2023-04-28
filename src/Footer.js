import React from "react";
import { Block, Footer, Form, Icon, Tag } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function AppFooter() {
    return (
        <Footer textAlign="center" backgroundColor="white" p={6}>
            <Block>
                <p>
                    Created by <a href="https://bobertoyin.com" target="_blank" rel="noreferrer">Robert Yin</a>.
                </p>
            </Block>
            <Block>
                <Form.Field kind="group" align="center" multiline={true}>
                        <Form.Control>
                            <Tag.Group hasAddons>
                                <Tag radiusless={true}><Icon><FontAwesomeIcon icon={faGithub}/></Icon></Tag>
                                <Tag radiusless={true} color="dark">
                                    <a href="https://github.com/bobertoyin/sample-graph" className="github-link">sample-graph</a>
                                </Tag>
                            </Tag.Group>
                        </Form.Control>
                    <Form.Control>
                        <Tag.Group hasAddons>
                            <Tag radiusless={true}><Icon><FontAwesomeIcon icon={faGithub}/></Icon></Tag>
                            <Tag radiusless={true} color="dark">
                                <a href="https://github.com/bobertoyin/sample-graph-api" className="github-link">sample-graph-api</a>
                            </Tag>
                        </Tag.Group>
                    </Form.Control>
                </Form.Field>
            </Block>
        </Footer>
    );
}