export interface Habit
{
  id: number;
  title: string;
  created_at: number;
  last_modified: number;
  deleted: number;
  completed: boolean;
}

export interface HabitHistory {
  id: number;
  habit_id: number;
  completed: number;
  created_at: number;
  last_modified: number;
}
