import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API base
const API_URL = "http://localhost:5000/api/habits";

// Acción para obtener todos los hábitos
export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🕵️‍♂️ Fetching habits from:", API_URL);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error al obtener los hábitos: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Acción para marcar hábito como completado
export const markHabitDone = createAsyncThunk(
  "habits/markHabitDone",
  async (habitId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/done/${habitId}`, {
        method: "POST",
      });

      // Manejo especial del 400 (ya fue marcado hoy)
      if (response.status === 400) {
        const data = await response.json();
        console.warn("⚠️ Ya fue marcado hoy:", data.message); // Puedes quitarlo si no lo quieres en consola
        return rejectWithValue(null); // Evitamos mostrarlo como error visible
      }

      if (!response.ok) throw new Error("Error al marcar el hábito como hecho");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  habits: [],
  loading: false,
  error: null,
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener hábitos
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.habits = action.payload;
        state.loading = false;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // ✅ Marcar hábito como hecho
      .addCase(markHabitDone.fulfilled, (state, action) => {
        const updatedHabit = action.payload;
        const index = state.habits.findIndex((h) => h._id === updatedHabit._id);
        if (index !== -1) {
          state.habits[index] = updatedHabit;
        }
      })
      .addCase(markHabitDone.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { setHabits, setLoading, setError } = habitsSlice.actions;
export default habitsSlice.reducer;
