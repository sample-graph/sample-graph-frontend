import axios from "axios";

export function getResource(resource, response_handler, error_handler) {
    const endpoint = `${process.env.REACT_APP_API_URL}/${resource}`;
    axios.get(endpoint).then(response_handler).catch(error_handler);
}
