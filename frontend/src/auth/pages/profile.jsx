import { useEffect, useState } from "react";
import { getMeApi, updateMeApi } from "../auth.api";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMeApi();
      setProfile(res.data);
      setForm({
        name: res.data?.name || "",
        email: res.data?.email || ""
      });
    } catch {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess("");
    try {
      const res = await updateMeApi(form);
      setProfile(res.data);
      setSuccess("Profile updated successfully.");
    } catch (e1) {
      setError(e1?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-600">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">View and update your account details.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 max-w-2xl">
        {error ? <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</div> : null}
        {success ? <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3">{success}</div> : null}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Name</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>

        {profile ? (
          <div className="pt-4 border-t text-sm text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-medium">Role:</span> {profile.role}</p>
            <p><span className="font-medium">Department:</span> {profile.departmentDisplayName || profile.departmentType}</p>
            <p><span className="font-medium">Manager ID:</span> {profile.managerId ?? "-"}</p>
            <p><span className="font-medium">Status:</span> {profile.active ? "Active" : "Inactive"}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
