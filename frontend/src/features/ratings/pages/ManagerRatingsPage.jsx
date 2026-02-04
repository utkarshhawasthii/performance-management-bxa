import CreateRatingForm from "../components/CreateRatingForm";

const ManagerRatingsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">My Team Ratings</h2>
      <CreateRatingForm />
    </div>
  );
};

export default ManagerRatingsPage;
