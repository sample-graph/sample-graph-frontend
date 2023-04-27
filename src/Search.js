import axios from "axios";
import React from "react";
import { Form } from "react-bulma-components";
import { debounce } from "lodash";

import { Results } from "./Results";

const random_titles = ["In My Feelings by Drake", "Truth Hurts by Lizzo", "3005 by Childish Gambino"];

function random(titles) {
    var index = Math.floor(Math.random() * titles.length);
    return titles[index];
}

export function Search() {
    const endpoint = `${process.env.REACT_APP_API_URL}/search`;
    const [placeholder, setPlaceholder] = React.useState(null);
    const [results, setResults] = React.useState(null);

    React.useEffect(() => setPlaceholder(random(random_titles)), []);

    return (
        <React.Fragment>
             <form onSubmit={(e) => e.preventDefault()}>
                <Form.Field>
                    <Form.Label>Search for a song...</Form.Label>
                    <Form.Input
                        placeholder={placeholder + "?"}
                        onChange={debounce(
                            (e) => {
                                axios.get(`${endpoint}?q=${e.target.value}`)
                                .then((response) => {
                                    setResults(response.data);
                                })
                            }, 300
                        )}
                    />
                </Form.Field>
            </form>
            <Results results={results}></Results>
        </React.Fragment>
    );
}