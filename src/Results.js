import React from "react";
import { Link } from "react-router-dom";
import { Message } from "react-bulma-components";

function Result(result) {
    return (
        <li key={result.id}>
            <Link to={`graph?id=${result.id}`}>"{result.title}" by {result.artist_name}</Link>
        </li>
    );
}

export function Results(props) {
    const results = props.results;
    const has_results = (results && results.length > 0);
    const results_jsx = has_results ? <ol>{Array.from(results).map(Result)}</ol> : "Nothing ¯\\_(ツ)_/¯";
    const color = has_results ? "success" : "";
    return (
        <React.Fragment>
            <br></br>
            <Message color={color}>
                <Message.Header radiusless={true}>Results</Message.Header>
                <Message.Body radiusless={true}>{results_jsx}</Message.Body>
            </Message>
        </React.Fragment>
    );
}