"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LEAD_STATUSES, updateLeadStatus, type LeadStatus } from "@/lib/leads";
import { ADMIN_COOKIE } from "@/lib/adminAuth";

export async function setLeadStatus(id: number, status: string) {
  if (!LEAD_STATUSES.includes(status as LeadStatus)) return;
  await updateLeadStatus(id, status as LeadStatus);
  revalidatePath("/admin");
}

export async function logout() {
  cookies().set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  redirect("/admin/login");
}
