const MyReviewPage = ({ review }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Performance Review</h2>
      {!review.selfReviewComments && (
        <SelfReviewForm review={review} />
      )}
    </div>
  );
};
