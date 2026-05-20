import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisPage from "@/components/AnalysisPage";

const SAMPLE = `diff --git a/src/auth.ts b/src/auth.ts
index 1234567..abcdefg 100644
--- a/src/auth.ts
+++ b/src/auth.ts
@@ -10,7 +10,7 @@ export class AuthService {
   async login(email: string, password: string) {
     const user = await this.db.findUser(email);
-    if (user.password === password) {
+    if (await bcrypt.compare(password, user.hashedPassword)) {
       return this.generateToken(user);
     }
     throw new UnauthorizedError();
@@ -25,6 +25,12 @@ export class AuthService {
   }
 
+  async refreshToken(token: string) {
+    const decoded = this.verify(token);
+    if (decoded.exp < Date.now() / 1000) throw new ExpiredTokenError();
+    return this.generateToken(decoded.user);
+  }
+
   private generateToken(user: User) {
-    return jwt.sign({ id: user.id }, SECRET);
+    return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
   }
 }`;

export default function DiffPage() {
  return (
    <>
      <Navbar />
      <AnalysisPage
        type="diff"
        title="DiffSense"
        description="Paste a git diff to get change analysis, risk scoring, breaking change detection, security impact assessment, and generated changelogs."
        placeholder="Paste your git diff here..."
        sampleInput={SAMPLE}
        accentColor="#f59e0b"
      />
      <Footer />
    </>
  );
}
