import axios from "axios";
import React from "react";
import { Footer } from "react-bulma-components";

export function AppFooter() {
    const endpoint = `${process.env.REACT_APP_API_URL}/version`;
    const [version, setVersion] = React.useState(null);

    React.useEffect(() => {
        axios.get(endpoint).then((response) => {
            setVersion(response.data);
        }).catch((_) => {
            setVersion("???");
        });
    }, [endpoint]);

    return (
        <Footer textAlign="center" backgroundColor="white">
            <p>
                Created by <a href="https://bobertoyin.com" target="_blank" rel="noreferrer">Robert Yin</a>.
                Currently using <a href="https://github.com/bobertoyin/sample-graph-api" target="_blank" rel="noreferrer">SampleGraph API</a> v{version}.
            </p>
        </Footer>
    );
}