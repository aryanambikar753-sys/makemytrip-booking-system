import  { useState } from "react";
import "./styles/Review.css";

function Review() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !comment) {
      alert("Please enter your name and review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    setName("");
    setRating(5);
    setComment("");

    alert("Review submitted successfully!");
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <h1>Customer Reviews</h1>
        <p className="review-subtitle">
          Share your travel experience with us
        </p>

        <form className="review-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="5">★★★★★ - Excellent</option>
            <option value="4">★★★★☆ - Very Good</option>
            <option value="3">★★★☆☆ - Good</option>
            <option value="2">★★☆☆☆ - Average</option>
            <option value="1">★☆☆☆☆ - Poor</option>
          </select>

          <label>Review</label>
          <textarea
            placeholder="Write your travel experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="5"
          />

          <button type="submit">Submit Review</button>
        </form>
      </div>

      <div className="reviews-list">
        <h2>What Our Customers Say</h2>

        {reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <h3>{review.name}</h3>
                <span>{review.date}</span>
              </div>

              <div className="stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Review;