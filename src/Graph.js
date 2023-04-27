import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MultiDirectedGraph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import "@react-sigma/core/lib/react-sigma.min.css";
import { Block } from "react-bulma-components";

export function LoadGraph() {
    const { id } = useParams();
    const endpoint = `${process.env.REACT_APP_API_URL}/graph/${id}`;
    const loadGraph = useLoadGraph();
    const { positions, assign } = useLayoutCircular();
    const node_color = "#000000";
    const node_size = 7;

    React.useEffect(() => {
        axios.get(endpoint).then((response) => {
            const graph = new MultiDirectedGraph();
            const nodes = response.data.nodes;
            const edges = response.data.edges;
            for (var edge of edges) {
                const src = nodes[edge[0]];
                const dst = nodes[edge[1]];
                if (!graph.hasNode(src.id)) {
                    graph.addNode(src.id, {x: 0, y: 0, size: node_size, label: `${src.title} by ${src.artist_name}`, color: node_color});
                }
                if (!graph.hasNode(dst.id)) {
                    graph.addNode(dst.id, {x: 0, y: 0, size: node_size, label: `${dst.title} by ${dst.artist_name}`, color: node_color});
                }
                graph.addDirectedEdge(src.id, dst.id, {label: edge[2]});
            }
            loadGraph(graph);
            assign();
        });
    }, [endpoint, loadGraph, positions, assign, node_color, node_size]);

    return null;
}

export function DisplayGraph() {
    return (
        <Block alignContent="center" alignItems="center">
            <Link to="/">&larr; Return Home</Link>
            <SigmaContainer style={{ height: "65vh", width: "100%", border: "1px solid black" }}>
                <LoadGraph />
            </SigmaContainer>
        </Block>
    );
}
