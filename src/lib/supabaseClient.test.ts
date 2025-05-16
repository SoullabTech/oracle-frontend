import { fetchUserProfile, getUser } from "@/lib/supabaseClient";

describe("Supabase Auth & Profile", () => {
  it("returns null if no user session", async () => {
    const user = await getUser();
    expect(user).toBeNull();
  });

  it("handles profile fetch gracefully", async () => {
    const profile = await fetchUserProfile("non-existent-id");
    expect(profile).toBeNull();
  });
});
