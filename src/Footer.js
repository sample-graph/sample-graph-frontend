import React from "react";
import { Footer } from "react-bulma-components";
import { toast } from "react-toastify";

import { getResource } from "./utils";

export function AppFooter() {
    const [version, setVersion] = React.useState(null);

    React.useEffect(() => {
        const response_handler = (response) => setVersion(response.data);
        const error_handler = (err) => {
            toast.error(`Failed to get API version: ${err.message}`, {toastId: "version-err"});
            setVersion("?");
        };
        getResource("version", response_handler, error_handler);
    }, []);

    return (
        <Footer textAlign="center" backgroundColor="white">
            <p>
                Created by <a href="https://bobertoyin.com" target="_blank" rel="noreferrer">Robert Yin</a>.
                Currently using <a href="https://github.com/bobertoyin/sample-graph-api" target="_blank" rel="noreferrer">SampleGraph API</a> v{version}.
            </p>
        </Footer>
    );
}