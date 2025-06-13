import { Header } from "@/components/Header";
import { EditorHeader } from "@/components/EditorHeader";
import { EditorWindow } from "@/components/EditorWindow";

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Header />

      {/* Editor Section */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <EditorHeader />
          <EditorWindow />
        </div>
      </section>
    </div>
  );
}
