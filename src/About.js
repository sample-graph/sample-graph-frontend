import React from "react";

export function AppAbout() {
    return (
        <React.Fragment>
            <h2>(In)Frequently Asked Questions</h2>
            <blockquote>What is SampleGraph?</blockquote>
            <p>SampleGraph&#x2122; (not actually trademarked) is a web application that visualizes the relationships between musical samples.</p>
            <blockquote>Why is it called "SampleGraph"?</blockquote>
            <p>
                <a href="https://en.wikipedia.org/wiki/Sampling_(music)">Sample</a> + <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">Graph</a> = SampleGraph!
            </p>
            <blockquote>How does it work?</blockquote>
            <p>There's a backend server that does the hard work of consulting <a href="https://genius.com">Genius</a> about musical samples and builds a graph for you to view.</p>
        </React.Fragment>
    );
}