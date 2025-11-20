
import { Sidebar } from './components/Layout/Sidebar';
import { PreviewArea } from './components/Layout/PreviewArea';
import { CodeBlock } from './components/CodeOutput/CodeBlock';

function App() {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header (Optional, maybe just part of PreviewArea or Sidebar) */}

        {/* Preview Area */}
        <PreviewArea />

        {/* Code Output */}
        <CodeBlock />
      </div>
    </div>
  );
}

export default App;
