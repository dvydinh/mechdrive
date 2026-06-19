import { useState } from "react";
import { Mail, Lock, User, ArrowRight, AlertCircle, KeyRound } from "lucide-react";
import { GearLogo } from "./GearLogo";
import { createClient } from "@/utils/supabase/client";

export function AuthScreen({ onAuth }: { onAuth: (user: { id: string; name: string; email: string }) => void }) {
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const supabase = createClient();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    try {
      if (mode === "register") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { userName: name || "Sinh viên" },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user && data.user.identities && data.user.identities.length === 0) {
          throw new Error("Email này đã được sử dụng.");
        }

        // Sync to USER_ACCOUNT table
        if (data.user) {
          await supabase.from("USER_ACCOUNT").insert({
            userName: name || "Sinh viên",
            email: email,
            password: "managed_by_supabase_auth",
          });
        }

        setInfo("Đăng ký thành công! Kiểm tra email để xác nhận tài khoản.");
        setMode("login");

      } else if (mode === "login") {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data.user) {
          // lookup integer userID from USER_ACCOUNT
          const { data: row } = await supabase
            .from("USER_ACCOUNT")
            .select("userID, userName")
            .eq("email", data.user.email)
            .single();

          onAuth({
            id: row?.userID?.toString() || data.user.id,
            name: row?.userName || data.user.user_metadata?.userName || email.split("@")[0],
            email: data.user.email || email,
          });
        }

      } else if (mode === "reset") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });

        if (resetError) throw resetError;

        setInfo("Link đặt lại mật khẩu đã gửi về email của bạn.");
        setMode("login");
      }
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full grid grid-cols-1 lg:grid-cols-2 bg-white">
      {}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden sticky top-0 h-screen">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://assets.mixkit.co/videos/preview/mixkit-engine-pistons-of-an-old-car-2459-large.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-pink-200/20 to-pink-300/30 mix-blend-screen" />
        <div className="absolute inset-0 bg-white/20" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-yellow-200/25 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur shadow-md">
            <GearLogo size={28} />
          </div>
          <div>
            <div className="text-stone-900 font-serif" style={{ fontSize: 20 }}>MechDrive Studio</div>
            <div className="text-stone-800/70" style={{ fontSize: 12, letterSpacing: '0.1em' }}>HCMUT</div>
          </div>
        </div>

        <div className="relative">
          <h1 className="font-serif text-stone-900" style={{ fontSize: 32, lineHeight: 1.2, letterSpacing: '0.04em' }}>
            <b> Thiết kế hệ dẫn động</b>
          </h1>
          <p className="text-stone-600 mt-4 max-w-sm" style={{ fontSize: 13, lineHeight: 1.7 }}>
            Nền tảng tính toán và thiết kế hệ dẫn động cơ khí, hỗ trợ tối ưu hóa thông số bằng thuật toán AI.
          </p>

        </div>

        <div className="relative text-stone-600" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
          MECHDRIVE STUDIO · HCMUT
        </div>
      </div>

      {}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-200/50 to-pink-200/50 shadow-sm border border-pink-100">
              <GearLogo size={24} />
            </div>
            <div className="text-stone-900 font-serif" style={{ fontSize: 18 }}>MechDrive Studio</div>
          </div>

          <div className="inline-flex rounded-xl bg-white/70 backdrop-blur border border-pink-100 p-1 mb-6">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); setInfo(""); }}
                className={`px-4 py-1.5 rounded-lg transition ${mode === m ? "bg-gradient-to-r from-yellow-200 to-pink-200 text-stone-800" : "text-stone-500 hover:text-stone-700"
                  }`}
              >
                {m === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          <h2 className="font-serif text-stone-900" style={{ fontSize: 24 }}>
            {mode === "login" ? "Chào mừng trở lại" : mode === "register" ? "Tạo tài khoản mới" : "Đặt lại mật khẩu"}
          </h2>
          <p className="text-stone-500 mt-2" style={{ fontSize: 13 }}>
            {mode === "login"
              ? "Đăng nhập để tiếp tục"
              : mode === "register"
              ? "Bạn sẽ nhận email xác nhận sau khi đăng ký"
              : "Nhập email để nhận link đặt lại mật khẩu"}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-stone-700 block mb-1.5">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-pink-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-stone-700 block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-pink-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 outline-none"
                />
              </div>
            </div>

            {mode !== "reset" && (
              <div>
                <label className="text-stone-700 block mb-1.5">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-pink-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 outline-none"
                  />
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-stone-600">
                  <input type="checkbox" className="accent-stone-600" defaultChecked /> Ghi nhớ
                </label>
                <button type="button" onClick={() => { setMode("reset"); setError(""); setInfo(""); }} className="text-stone-700 hover:underline">Quên mật khẩu?</button>
              </div>
            )}

            {mode === "reset" && (
              <button type="button" onClick={() => { setMode("login"); setError(""); setInfo(""); }} className="text-stone-600 hover:underline text-sm">
                ← Quay lại đăng nhập
              </button>
            )}

            {info && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 text-green-700 text-sm">
                <KeyRound size={16} />
                <span>{info}</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-pink-50 text-pink-700 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-200 to-pink-300 text-stone-800 shadow-md flex items-center justify-center gap-2 transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
                }`}
            >
              {loading ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : mode === "register" ? "Tạo tài khoản" : "Gửi link đặt lại"}
              {!loading && <ArrowRight size={16} />}
            </button>

          </form>

          <p className="text-stone-400 mt-8 text-center" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
            © 2026 MECHDRIVE
          </p>
        </div>
      </div>
    </div>
  );
}
