import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/habits";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async (_, { rejectWithValue }) => {
  try {
    console.log("🕵️‍♂️ Fetching habits from:", API_URL); 
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error al obtener los hábitos: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
      });
  },
});

export const { setHabits, setLoading, setError } = habitsSlice.actions;
export default habitsSlice.reducer;
