import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchHabits, markHabitDone } from "../store/slices/habitsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { habits, loading, error } = useSelector((state) => state.habits);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    } else {
      dispatch(fetchHabits());
    }
  }, [dispatch, router]);

  const handleMarkDone = (id) => {
    dispatch(markHabitDone(id));
  };

  return (
    <main style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>
          📘 Tus Hábitos
        </h1>

        {loading && <p style={{ color: "#3b82f6" }}>Cargando hábitos...</p>}

        {error && !error.includes("marcar el hábito") && (
          <p style={{ color: "red" }}>Error: {error}</p>
        )}

        {habits.map((habit) => {
          const progress = Math.min((habit.completedDays / 66) * 100, 100);

          return (
            <div
              key={habit._id}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{habit.name}</h2>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    Días completados:{" "}
                    <strong style={{ color: "#10b981" }}>{habit.completedDays}</strong>
                  </p>
                </div>
                <button
                  onClick={() => handleMarkDone(habit._id)}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>

              <div
                style={{
                  backgroundColor: "#ddd",
                  height: "8px",
                  width: "100%",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "8px",
                    width: `${progress}%`,
                    backgroundColor:
                      progress < 33
                        ? "#ef4444"
                        : progress < 66
                        ? "#facc15"
                        : "#22c55e",
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
