"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { openAuthModal } = useAdminAuth();

  useEffect(() => {
    router.replace("/admin");
    openAuthModal("login");
  }, [router, openAuthModal]);

  return (
    <div className="py-20 text-center text-gray-600 text-sm">
      Redirecting to Editorial Admin Portal...
    </div>
  );
}
