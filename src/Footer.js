import React from "react";
import { Block, Footer } from "react-bulma-components";

export function AppFooter() {
    return (
        <Footer textAlign="center" backgroundColor="white" p={6}>
            <Block>
                <p>
                    Created by <a href="https://bobertoyin.com" target="_blank" rel="noreferrer">Robert Yin</a>.
                </p>
            </Block>
        </Footer>
    );
}