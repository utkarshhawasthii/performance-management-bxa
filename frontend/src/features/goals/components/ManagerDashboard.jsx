import { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";

const ManagerDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    httpClient.get("/api/goals/manager/summary")
      .then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card title="Active Cycle" value={data.cycleName} />
      <Card title="Pending Approvals" value={data.pendingApprovals} />
      <Card title="Total Team Goals" value={data.totalGoals} />
      <Card title="Completed Goals" value={data.completedGoals} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <p className="text-xs text-slate-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ManagerDashboard;
