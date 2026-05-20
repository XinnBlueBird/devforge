import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisPage from "@/components/AnalysisPage";

const SAMPLE = `Add a real-time notification system to our SaaS platform.

Requirements:
- Users should receive instant notifications when events happen in their workspace
- Support in-app notifications and email delivery
- Must handle 10k+ concurrent users
- Need notification preferences (per-user, per-event type)
- Should integrate with existing Slack and Discord webhooks`;

export default function RfcPage() {
  return (
    <>
      <Navbar />
      <AnalysisPage
        type="rfc"
        title="ThreadWeaver"
        description="Describe a feature or system to generate a full RFC — architecture decisions, API design, data model, migration plan, trade-offs, and timeline."
        placeholder="Describe the feature or system you want to design..."
        sampleInput={SAMPLE}
        accentColor="#10b981"
      />
      <Footer />
    </>
  );
}
