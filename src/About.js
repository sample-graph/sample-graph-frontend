import React from "react";
import { Block } from "react-bulma-components";

export function AppAbout() {
    return (
        <React.Fragment>
            <Block>
                <h2>(In)Frequently Asked Questions</h2>
            </Block>
            <Block>
                <blockquote>What is SampleGraph?</blockquote>
                <p>SampleGraph&#x2122; (not actually trademarked) is a web application that visualizes the relationships between musical samples.</p>
            </Block>
            <Block>
                <blockquote>Why is it called "SampleGraph"?</blockquote>
                <p>
                    <a href="https://en.wikipedia.org/wiki/Sampling_(music)">Sample</a> + <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">Graph</a> = SampleGraph!
                </p>
            </Block>
            <Block>
                <blockquote>How does it work?</blockquote>
                <ol>
                    <li>A backend server does the hard work of consulting <a href="https://genius.com">Genius</a> about musical samples and interpolations.</li>
                    <li>The server spits out a <a href="https://www.json.org/json-en.html">JSON</a> representation that travels over the Internet.</li>
                    <li>This site parses the server's response and creates a visualization for you to <s>grimace at</s> enjoy.</li>
                </ol>
            </Block>
            <Block>
                <blockquote>Why Genius and not <a href="https://www.whosampled.com">WhoSampled</a>?</blockquote>
                <p>"[Our] technology and metadata are only available for commercial uses and academic research (PhD level and up)." - <a href="https://www.whosampled.com/metadata">WhoSampled</a></p>
            </Block>
            <Block>
                <blockquote>What could possess someone to make this pointless app?</blockquote>
                <p>
                    Boredom/curiosity. This app is mostly inspired by discussions with my college roommates about the "sphere of influence" that highly sampled songs have on the rap and R&B music that we enjoy.
                    However, unlike something like WhoSampled's <a href="https://www.whosampled.com/six-degrees">Six Degrees of Music Separation</a>, this app is mostly exploratory and focuses on individual songs rather than artists.
                </p>
            </Block>
        </React.Fragment>
    );
}