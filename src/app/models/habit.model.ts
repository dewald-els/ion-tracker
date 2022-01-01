export interface Habit {
  id: number;
  title: string;
  completed: number;
  deleted: number;
  created_at: string;
  updated_at: string;
}

export interface HabitHistory {
  id: number;
  habit_id: number;
  created_at: string;
  updated_at: string;
}
