"use client";
import { useState, useEffect } from "react";
import { Sidebar, ModuleKey } from "./Sidebar";
import { ModuleMotor } from "./ModuleMotor";
import { ModuleChain } from "./ModuleChain";
import { ModuleGearbox } from "./ModuleGearbox";
import { ModuleOptimizer } from "./ModuleOptimizer";

import { ReportPanel } from "./ReportPanel";
import { HistoryPage } from "./HistoryPage";
import { AuthScreen } from "./AuthScreen";
import { ModuleProjects } from "./ModuleProjects";
import { WorkflowProvider } from "./workflow";
import { createClient } from "@/utils/supabase/client";

export default function App() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [active, setActive] = useState<ModuleKey>("projects");
  const [currentScheme, setCurrentScheme] = useState<{ projectID: number; schemeNo: number } | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const supabase = createClient();

  const [isRecovering, setIsRecovering] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsRecovering(true);
        }
      }
    );

    const checkSession = async () => {
      // Check hash for recovery token (some browsers handle it before onAuthStateChange)
      if (window.location.hash.includes('type=recovery')) {
        setIsRecovering(true);
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        let { data: row } = await supabase
          .from("USER_ACCOUNT")
          .select("userID, userName")
          .eq("email", session.user.email)
          .single();

        if (!row) {
          const { data: newRow } = await supabase.from("USER_ACCOUNT").insert({
            userName: session.user.user_metadata?.userName || session.user.email?.split("@")[0] || "User",
            email: session.user.email || "",
            password: "managed_by_supabase_auth",
          }).select("userID, userName").single();
          row = newRow;
        }

        setUser({
          id: row?.userID?.toString() || session.user.id,
          name: row?.userName || session.user.user_metadata?.userName || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
        });
      }
    };
    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (isRecovering) return <AuthScreen onAuth={() => setIsRecovering(false)} initialMode="update_password" />;
  if (!user) return <AuthScreen onAuth={setUser} />;

  return (
    <WorkflowProvider>
      <div className="size-full flex bg-white">
        <Sidebar active={active} onChange={setActive} user={user} onLogout={handleLogout} />
        <main className="flex-1 flex flex-col overflow-hidden">
          {active === "projects" && <ModuleProjects onGoto={setActive} user={user} onSetScheme={setCurrentScheme} />}
          {active === "optimizer" && <ModuleOptimizer onGoto={setActive} onSuccess={setAiResult} currentScheme={currentScheme} />}
          {active === "motor" && <ModuleMotor onGoto={setActive} aiResult={aiResult} currentScheme={currentScheme} />}
          {active === "chain" && <ModuleChain onGoto={setActive} aiResult={aiResult} />}
          {active === "gearbox" && <ModuleGearbox onGoto={setActive} aiResult={aiResult} currentScheme={currentScheme} />}
          {active === "report" && <ReportPanel user={user} currentScheme={currentScheme} onGoto={setActive} />}

          {active === "history" && <HistoryPage user={user} />}
        </main>
      </div>
    </WorkflowProvider>
  );
}
