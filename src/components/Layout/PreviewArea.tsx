import React, { useRef, useState, useEffect } from 'react';
import { useGridStore, type GridItem } from '../../store/gridStore';
import { clsx } from 'clsx';

export const PreviewArea: React.FC = () => {
    const { rows, columns, gap, items, updateItem, selectedItemId, selectItem } = useGridStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
    const [initialItemState, setInitialItemState] = useState<GridItem | null>(null);

    // Helper to get grid coordinates from mouse position
    const getGridCoordinates = (clientX: number, clientY: number) => {
        if (!containerRef.current) return null;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const totalGapW = (columns - 1) * gap;
        const cellW = (rect.width - totalGapW) / columns;

        const totalGapH = (rows - 1) * gap;
        const cellH = (rect.height - totalGapH) / rows;

        let col = 1;
        let currentX = 0;
        for (let i = 1; i <= columns; i++) {
            if (x >= currentX && x <= currentX + cellW + gap / 2) {
                col = i;
                break;
            }
            currentX += cellW + gap;
            if (i === columns) col = columns;
        }

        let row = 1;
        let currentY = 0;
        for (let i = 1; i <= rows; i++) {
            if (y >= currentY && y <= currentY + cellH + gap / 2) {
                row = i;
                break;
            }
            currentY += cellH + gap;
            if (i === rows) row = rows;
        }

        return { col, row };
    };

    const handleMouseDown = (e: React.MouseEvent, item: GridItem) => {
        e.stopPropagation();
        selectItem(item.id);
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialItemState({ ...item });
    };

    const handleResizeStart = (e: React.MouseEvent, item: GridItem) => {
        e.stopPropagation();
        selectItem(item.id);
        setIsResizing(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialItemState({ ...item });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if ((!isDragging && !isResizing) || !selectedItemId || !initialItemState || !dragStart) return;

            const coords = getGridCoordinates(e.clientX, e.clientY);
            if (!coords) return;

            const startCoords = getGridCoordinates(dragStart.x, dragStart.y);
            if (!startCoords) return;

            const colDelta = coords.col - startCoords.col;
            const rowDelta = coords.row - startCoords.row;

            if (isDragging) {
                const newColStart = Math.max(1, Math.min(columns, initialItemState.colStart + colDelta));
                const newRowStart = Math.max(1, Math.min(rows, initialItemState.rowStart + rowDelta));

                const colSpan = initialItemState.colEnd - initialItemState.colStart;
                const rowSpan = initialItemState.rowEnd - initialItemState.rowStart;

                const newColEnd = Math.min(columns + 1, newColStart + colSpan);
                const finalColStart = newColEnd - colSpan;

                const newRowEnd = Math.min(rows + 1, newRowStart + rowSpan);
                const finalRowStart = newRowEnd - rowSpan;

                updateItem(selectedItemId, {
                    colStart: finalColStart,
                    colEnd: newColEnd,
                    rowStart: finalRowStart,
                    rowEnd: newRowEnd
                });
            } else if (isResizing) {
                // Resize logic: change end coordinates
                const newColEnd = Math.max(initialItemState.colStart + 1, Math.min(columns + 1, initialItemState.colEnd + colDelta));
                const newRowEnd = Math.max(initialItemState.rowStart + 1, Math.min(rows + 1, initialItemState.rowEnd + rowDelta));

                updateItem(selectedItemId, {
                    colEnd: newColEnd,
                    rowEnd: newRowEnd
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
            setDragStart(null);
            setInitialItemState(null);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, selectedItemId, initialItemState, dragStart, columns, rows, gap, updateItem]);

    return (
        <div
            className="flex-1 bg-gray-50 p-8 overflow-hidden flex flex-col"
            onClick={() => selectItem(null)}
        >
            <div className="flex-1 flex items-center justify-center min-h-0">
                <div
                    ref={containerRef}
                    className="bg-white shadow-sm border border-gray-200 rounded-lg transition-all duration-200 relative"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gap: `${gap}px`,
                        width: '100%',
                        maxWidth: '800px',
                        aspectRatio: '4/3',
                        padding: '20px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Render Grid Cells Background */}
                    {Array.from({ length: rows * columns }).map((_, i) => (
                        <div
                            key={`cell-${i}`}
                            className="border border-dashed border-gray-200 rounded-md"
                        />
                    ))}

                    {/* Render Items */}
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onMouseDown={(e) => handleMouseDown(e, item)}
                            className={clsx(
                                "rounded-lg shadow-sm flex items-center justify-center text-white font-medium cursor-move transition-all duration-75 select-none relative group",
                                selectedItemId === item.id ? "z-50 ring-2 ring-blue-500 shadow-lg scale-[1.01]" : "hover:brightness-110"
                            )}
                            style={{
                                gridColumn: `${item.colStart} / ${item.colEnd}`,
                                gridRow: `${item.rowStart} / ${item.rowEnd}`,
                                backgroundColor: item.color,
                            }}
                        >
                            {item.name}

                            {/* Resize Handle */}
                            <div
                                className={clsx(
                                    "absolute bottom-1 right-1 w-5 h-5 bg-white/30 rounded-sm cursor-se-resize hover:bg-white/50 flex items-center justify-center",
                                    selectedItemId === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                )}
                                onMouseDown={(e) => handleResizeStart(e, item)}
                            >
                                <div className="w-2 h-2 border-r-2 border-b-2 border-white/80" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
