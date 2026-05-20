import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisPage from "@/components/AnalysisPage";

const SAMPLE = `You are a helpful assistant. Write me a blog post about AI. Make it good and interesting. Include some facts and make it engaging for readers. The post should be well-structured.`;

export default function PromptsPage() {
  return (
    <>
      <Navbar />
      <AnalysisPage
        type="prompts"
        title="PromptForge"
        description="Analyze your prompts for quality, get scored breakdowns across clarity, specificity, context, and structure — plus improved versions and reusable templates."
        placeholder="Paste your prompt here..."
        sampleInput={SAMPLE}
        accentColor="#8b5cf6"
      />
      <Footer />
    </>
  );
}
