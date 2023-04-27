import React from "react";
import { Link, useParams } from "react-router-dom";
import MultiDirectedGraph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { Block } from "react-bulma-components";
import { toast } from "react-toastify";
import "@react-sigma/core/lib/react-sigma.min.css";

import { getResource } from "./utils";

export function LoadGraph() {
    const { id } = useParams();
    const loadGraph = useLoadGraph();
    const { positions, assign } = useLayoutCircular();
    const node_color = "#000000";
    const node_size = 7;

    React.useEffect(() => {
        const response_handler = (response) => {
            const graph = new MultiDirectedGraph();
            const nodes = response.data.nodes;
            const edges = response.data.edges;
            if (edges.length > 0) {
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
            } else {
                for (var node of nodes) {
                    graph.addNode(node.id, {x: 0, y: 0, size: node_size, label: `${node.title} by ${node.artist_name}`, color: node_color});
                }
            }
            loadGraph(graph);
            assign();
        };
        const error_handler = (err) => {
            toast.error(`Failed to get graph: ${err.message}`, {toastId: "graph-err"});
        };
        getResource(`graph/${id}`, response_handler, error_handler);
    }, [id, loadGraph, positions, assign, node_color, node_size]);

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
