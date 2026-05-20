import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisPage from "@/components/AnalysisPage";

const SAMPLE = `def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

result = [fibonacci(i) for i in range(20)]
print(result)`;

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <AnalysisPage
        type="learn"
        title="Mentor"
        description="Paste any code to get a comprehensive educational breakdown — step-by-step walkthrough, key concepts, common mistakes, and practice challenges."
        placeholder="Paste any code in any language..."
        sampleInput={SAMPLE}
        accentColor="#3b82f6"
      />
      <Footer />
    </>
  );
}
