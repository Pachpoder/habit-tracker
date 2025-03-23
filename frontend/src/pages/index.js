import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../store/slices/habitsSlice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const dispatch = useDispatch();
  const { habits, loading, error } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-[#0e0e0e] px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          📘 Tus Hábitos
        </h1>

        {loading && (
          <p className="text-center text-blue-500 animate-pulse mb-6">
            Cargando hábitos...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 font-semibold mb-6">
            Error: {error}
          </p>
        )}

        <section className="space-y-6">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition-all"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">{habit.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Días completados:{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {habit.completedDays}
                  </span>
                </p>
              </div>
              <button className="relative group overflow-hidden px-6 py-2 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300">
  <span className="relative z-10 font-medium">Done</span>
  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300 rounded-full blur-sm z-0" />
</button>
            </div>
          ))}
        </section>

        {/* Barra de progreso estática */}
        <section className="mt-12">
          <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
            Progreso general
          </h3>
          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-1/3 transition-all duration-700"></div>
          </div>
        </section>
      </div>
    </main>
  );
}
