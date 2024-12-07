import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VisitorFeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("/api/feedback");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbackList(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Visitor Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {feedbackList.length > 0 ? (
          <ul className="space-y-4">
            {feedbackList.map((feedback) => (
              <li key={feedback._id} className="p-4 border rounded-md">
                <p>
                  <strong>Name:</strong> {feedback.name}
                </p>
                <p>
                  <strong>Email:</strong> {feedback.email}
                </p>
                <p>
                  <strong>Feedback:</strong> {feedback.message}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitorFeedbackList;
