import React from "react";
import { Form } from "react-bulma-components";
import { debounce } from "lodash";

import { Results } from "./Results";
import { toast } from "react-toastify";
import { getResource } from "./utils";

const random_titles = ["In My Feelings by Drake", "Truth Hurts by Lizzo", "V. 3005 by Childish Gambino"];

function random(titles) {
    var index = Math.floor(Math.random() * titles.length);
    return titles[index];
}

export function Search() {
    const [placeholder, setPlaceholder] = React.useState(null);
    const [results, setResults] = React.useState(null);
    const response_handler = (response) => setResults(response.data);
    const error_handler = (err) => {
        toast.error(`Failed to get search results: ${err.message}`, {toastId: "search-err"});
    };

    React.useEffect(() => setPlaceholder(random(random_titles)), []);

    return (
        <React.Fragment>
            <h2>Try it out!</h2>
             <form onSubmit={(e) => e.preventDefault()}>
                <Form.Field>
                    <Form.Label>Search for a song...</Form.Label>
                    <Form.Input
                        radiusless={true}
                        placeholder={placeholder + "?"}
                        onChange={debounce((e) => getResource(`search?q=${e.target.value}`, response_handler, error_handler), 300)}
                    />
                </Form.Field>
            </form>
            <Results results={results}></Results>
        </React.Fragment>
    );
}