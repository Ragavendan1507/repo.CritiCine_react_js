import React, { useEffect, useRef, useState } from 'react';

const getSmoothStepPath = (startX: number, startY: number, endX: number, endY: number): string => {
    const midX = startX + 30;
    return `M${startX} ${startY} H${midX} V${endY} H${endX}`;
};

type Node = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
};

type Connection = {
    from: string;
    to: string;
};

const data = {
    nodes: [
        { id: '1', x: 10, y: 10, width: 150, height: 50, color: 'lightblue' },
        { id: '2', x: 250, y: 100, width: 150, height: 50, color: 'lightgreen' },
        { id: '3', x: 500, y: 200, width: 150, height: 50, color: 'lightcoral' },
        { id: '4', x: 750, y: 200, width: 150, height: 50, color: 'yellow' }

    ],
    connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },

    ]
};

export default function Home() {
    const [paths, setPaths] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nodeMap = new Map<string, Node>();
        data.nodes.forEach(node => nodeMap.set(node.id, node));

        const newPaths: string[] = data.connections.map(({ from, to }) => {
            const start = nodeMap.get(from)!;
            const end = nodeMap.get(to)!;
            return getSmoothStepPath(
                start.x + start.width, 
                start.y + start.height / 2,
                end.x,
                end.y + end.height / 2
            );
        });

        setPaths(newPaths);
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {data.nodes.map(node => (
                <div
                    key={node.id}
                    style={{
                        position: 'absolute',
                        top: node.y,
                        left: node.x,
                        width: node.width,
                        height: node.height,
                        background: node.color,
                        zIndex: 1
                    }}
                ></div>
            ))}

            <svg
                width={containerRef.current?.offsetWidth || 0}
                height={containerRef.current?.offsetHeight || 0}
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
            >
                {paths.map((d, index) => (
                    <path key={index} d={d} fill="transparent" stroke="blue" strokeWidth={2} />
                ))}
            </svg>
        </div>
    );
}
