import React from 'react';
import { useGridStore } from '../../store/gridStore';
import { Settings, LayoutGrid, Maximize, Plus, Trash2, MousePointer2 } from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
    const {
        rows, columns, gap, items, selectedItemId,
        setRows, setColumns, setGap, addItem, removeItem, selectItem, updateItem
    } = useGridStore();

    const selectedItem = items.find(i => i.id === selectedItemId);

    const handleAddItem = () => {
        const newItem = {
            name: `Item ${items.length + 1}`,
            colStart: 1,
            colEnd: 2,
            rowStart: 1,
            rowEnd: 2,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        };
        addItem(newItem);
    };

    return (
        <div className="w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 h-full flex flex-col shadow-sm z-10">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <LayoutGrid className="w-6 h-6 text-blue-500" />
                    Grid Maker
                </h1>
                <p className="text-sm text-gray-500 mt-1">Design your CSS Grid layout</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Grid Settings */}
                <section className="space-y-4">
                    <h2 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Grid Settings
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Columns ({columns})</label>
                            <input
                                type="range"
                                min="1"
                                max="12"
                                value={columns}
                                onChange={(e) => setColumns(Number(e.target.value))}
                                className="w-full accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Rows ({rows})</label>
                            <input
                                type="range"
                                min="1"
                                max="12"
                                value={rows}
                                onChange={(e) => setRows(Number(e.target.value))}
                                className="w-full accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Gap ({gap}px)</label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={gap}
                                onChange={(e) => setGap(Number(e.target.value))}
                                className="w-full accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </section>

                {/* Selected Item Settings */}
                {selectedItem && (
                    <section className="space-y-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <h2 className="text-sm font-medium text-blue-900 flex items-center gap-2">
                            <MousePointer2 className="w-4 h-4" />
                            Selected Item
                        </h2>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-blue-700 mb-1 block">Name</label>
                                <input
                                    type="text"
                                    value={selectedItem.name}
                                    onChange={(e) => updateItem(selectedItem.id, { name: e.target.value })}
                                    className="w-full px-2 py-1 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-medium text-blue-700 mb-1 block">Col Start</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={columns + 1}
                                        value={selectedItem.colStart}
                                        onChange={(e) => updateItem(selectedItem.id, { colStart: Number(e.target.value) })}
                                        className="w-full px-2 py-1 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-blue-700 mb-1 block">Col End</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={columns + 1}
                                        value={selectedItem.colEnd}
                                        onChange={(e) => updateItem(selectedItem.id, { colEnd: Number(e.target.value) })}
                                        className="w-full px-2 py-1 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-blue-700 mb-1 block">Row Start</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={rows + 1}
                                        value={selectedItem.rowStart}
                                        onChange={(e) => updateItem(selectedItem.id, { rowStart: Number(e.target.value) })}
                                        className="w-full px-2 py-1 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-blue-700 mb-1 block">Row End</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={rows + 1}
                                        value={selectedItem.rowEnd}
                                        onChange={(e) => updateItem(selectedItem.id, { rowEnd: Number(e.target.value) })}
                                        className="w-full px-2 py-1 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-blue-700 mb-1 block">Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={selectedItem.color}
                                        onChange={(e) => updateItem(selectedItem.id, { color: e.target.value })}
                                        className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={selectedItem.color}
                                        onChange={(e) => updateItem(selectedItem.id, { color: e.target.value })}
                                        className="flex-1 px-2 py-1 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Items List */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            <Maximize className="w-4 h-4" />
                            Grid Items
                        </h2>
                        <button
                            onClick={handleAddItem}
                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                            title="Add Item"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => selectItem(item.id)}
                                className={clsx(
                                    "group flex items-center justify-between p-3 border rounded-xl shadow-sm transition-all cursor-pointer",
                                    selectedItemId === item.id
                                        ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200"
                                        : "bg-white border-gray-100 hover:shadow-md"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full shadow-sm"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeItem(item.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-center text-gray-400">
                    Drag items to move, drag corner to resize
                </p>
            </div>
        </div>
    );
};
