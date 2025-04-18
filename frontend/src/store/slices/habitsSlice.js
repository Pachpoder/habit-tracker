import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/habits`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!response.ok) throw new Error(`Error al obtener los hábitos: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markHabitDone = createAsyncThunk(
  "habits/markHabitDone",
  async (habitId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/done/${habitId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (response.status === 400) {
        const data = await response.json();
        console.warn("⚠️ Ya fue marcado hoy:", data.message);
        return rejectWithValue(null);
      }

      if (!response.ok) throw new Error("Error al marcar el hábito como hecho");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addHabit = createAsyncThunk(
  "habits/addHabit",
  async (habitName, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ name: habitName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al agregar hábito");
      }

      return await res.json();
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
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);
      })
      .addCase(addHabit.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { setHabits, setLoading, setError } = habitsSlice.actions;
export default habitsSlice.reducer;
