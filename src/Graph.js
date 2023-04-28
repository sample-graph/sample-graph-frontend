import React from "react";
import { useParams } from "react-router-dom";
import MultiDirectedGraph from "graphology";
import { SigmaContainer, useLoadGraph, ControlsContainer, ZoomControl, SearchControl, FullScreenControl } from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { Message } from "react-bulma-components";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import "@react-sigma/core/lib/react-sigma.min.css";

import { getResource } from "./utils";

export function LoadGraph(props) {
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
            props.setLoading(false);
        };
        const error_handler = (err) => {
            toast.error(`Failed to get graph: ${err.message}`, {toastId: "graph-err"});
            props.setLoading(false);
        };
        getResource(`graph/${id}`, response_handler, error_handler);
    }, [id, loadGraph, positions, assign, node_color, node_size, props]);

    return null;
}

export function DisplayGraph() {
    const [loading, setLoading] = React.useState(true);
    return (
        <Message>
            <Message.Header radiusless={true}>
                <a href="/">&larr; Return Home</a>
            </Message.Header>
            <Message.Body style={{height: "70vh"}} paddingless={true} radiusless={true} backgroundColor="white">
                <div style={{ height: "100%", width: "100%", display: loading ? "flex" : "none", alignContent: "center", alignItems: "center"}}>
                    <ScaleLoader radius={0} loading={loading} speedMultiplier={0.75} style={{margin: "auto"}}/>
                </div>
                <SigmaContainer style={{display: loading ? "none" : "flex"}}>
                    <LoadGraph setLoading={setLoading}/>
                    <ControlsContainer>
                        <SearchControl/>
                        <ZoomControl/>
                        <FullScreenControl/>
                    </ControlsContainer>
                </SigmaContainer>
            </Message.Body>
        </Message>
    );
}
