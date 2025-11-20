import React, { useState } from 'react';
import { useGridStore } from '../../store/gridStore';
import { generateCSS, generateHTML, generateFullHTML } from '../../utils/generateCode';
import { Code, Copy, Download, Check } from 'lucide-react';
import { clsx } from 'clsx';

export const CodeBlock: React.FC = () => {
    const { rows, columns, gap, items } = useGridStore();
    const [activeTab, setActiveTab] = useState<'css' | 'html'>('css');
    const [copied, setCopied] = useState(false);

    const cssCode = generateCSS(rows, columns, gap, items);
    const htmlCode = generateHTML(items);
    const displayCode = activeTab === 'css' ? cssCode : htmlCode;

    const handleCopy = () => {
        navigator.clipboard.writeText(displayCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        const fullHtml = generateFullHTML(rows, columns, gap, items);
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grid-layout.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white border-t border-gray-200 h-64 flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Code className="w-4 h-4" />
                        <span>Code Output</span>
                    </div>
                    <div className="flex bg-gray-200/50 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('css')}
                            className={clsx(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                activeTab === 'css' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            CSS
                        </button>
                        <button
                            onClick={() => setActiveTab('html')}
                            className={clsx(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                activeTab === 'html' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            HTML
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Export HTML
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-[#1e1e1e] font-mono text-sm">
                <pre className="text-gray-300">
                    <code>{displayCode}</code>
                </pre>
            </div>
        </div>
    );
};
