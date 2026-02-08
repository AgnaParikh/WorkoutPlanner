/**
 * Exercise shape matches API/Swagger ExerciseDto.
 * Display these fields in the UI: exerciseName, sets, time (sec), restSec (sec).
 */
export interface Exercise {
  exerciseName: string;
  sets: number;
  time: number; // duration in seconds per set
  restSec: number;
}

export interface WorkoutPlan {
  title: string;
  totalDuration: number;
  exercises: Exercise[];
}

export type WorkoutStyle =
  | 'Strength'
  | 'HIIT'
  | 'Cardio'
  | 'Circuit/Cross-Training'
  | 'Bodyweight'
  | 'Stretch/Mobility';

export type BodyArea =
  | 'Full Body'
  | 'Abs/Core'
  | 'Upper Body'
  | 'Lower Body'
  | 'Arms'
  | 'Back'
  | 'Chest'
  | 'Glutes/Legs';

export const WORKOUT_STYLES: WorkoutStyle[] = [
  'Strength',
  'HIIT',
  'Cardio',
  'Circuit/Cross-Training',
  'Bodyweight',
  'Stretch/Mobility',
];

export const BODY_AREAS: BodyArea[] = [
  'Full Body',
  'Abs/Core',
  'Upper Body',
  'Lower Body',
  'Arms',
  'Back',
  'Chest',
  'Glutes/Legs',
];

export const DURATION_OPTIONS = [15, 20, 30, 45, 60] as const;
