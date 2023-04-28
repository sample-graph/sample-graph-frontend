import React from "react";
import { useSearchParams } from "react-router-dom";
import MultiDirectedGraph from "graphology";
import { SigmaContainer, useLoadGraph, ControlsContainer, ZoomControl, SearchControl, FullScreenControl } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { random } from "graphology-layout";
import { Message } from "react-bulma-components";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import "@react-sigma/core/lib/react-sigma.min.css";

import { getResource } from "./utils";

function addNode(graph, center, node, node_size) {
    const label = `${node.song.title} by ${node.song.artist_name}`;
    var settings = {x: 0, y: 0, size: node_size, degree: node.degree, label: label};
    if (Number(center) === node.song.id) {
        settings["color"] = "red";
    }
    graph.addNode(node.song.id, settings);
}

function deSnakeCase(str) {
    return str.replace("_", " ");
}

export function LoadGraph(props) {
    const loadGraph = useLoadGraph();
    const { positions, assign } = useLayoutForceAtlas2();
    const node_size = 6;
    const edge_size = 3;

    React.useEffect(() => {
        const response_handler = (response) => {
            const graph = new MultiDirectedGraph();
            const nodes = response.data.nodes;
            const edges = response.data.edges;
            if (edges.length > 0) {
                for (var edge of edges) {
                    const src = nodes[edge[0]];
                    const dst = nodes[edge[1]];
                    if (!graph.hasNode(src.song.id)) {
                        addNode(graph, props.id, src, node_size);
                    }
                    if (!graph.hasNode(dst.song.id)) {
                        addNode(graph, props.id, dst, node_size);
                    }
                    graph.addDirectedEdge(src.song.id, dst.song.id, {label: deSnakeCase(edge[2]), size: edge_size});
                }
            } else {
                for (var node of nodes) {
                    addNode(graph, props.id, node, node_size);
                }
            }
            loadGraph(graph);
            random.assign(graph);
            assign();
            props.setLoading(false);

        };
        const error_handler = (err) => {
            toast.error(`Failed to get graph: ${err.message}`, {toastId: "graph-err"});
            props.setLoading(false);
        };
        getResource(`graph/${props.id}`, response_handler, error_handler);
    }, [loadGraph, positions, assign, node_size, edge_size, props]);

    return null;
}

export function DisplayGraph() {
    const [loading, setLoading] = React.useState(true);
    const searchParams = useSearchParams()[0];
    return (
        <Message>
            <Message.Header radiusless={true}>
                <a href="/">&larr; Home</a>
            </Message.Header>
            <Message.Body style={{height: "65vh"}} paddingless={true} radiusless={true} backgroundColor="white">
                <div style={{ height: "100%", width: "100%", display: loading ? "flex" : "none", alignContent: "center", alignItems: "center"}}>
                    <ScaleLoader radius={0} loading={loading} speedMultiplier={0.75} style={{margin: "auto"}}/>
                </div>
                <SigmaContainer 
                    style={{display: loading ? "none" : "flex"}} 
                    settings={{
                        defaultNodeColor: "black",
                        defaultEdgeType: "arrow", 
                        labelFont: "IBM Plex Mono, monospace", 
                        renderEdgeLabels: true, 
                        edgeLabelFont: "IBM Plex Mono, monospace", 
                        edgeLabelColor: "black",
                    }}
                >
                    <LoadGraph setLoading={setLoading} id={searchParams.get("id")}/>
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
