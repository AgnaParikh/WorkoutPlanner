import { useCallback, useState } from 'react';
import type { BodyArea, WorkoutPlan, WorkoutStyle } from '@/types/workout';
import { API_BASE_URL, WORKOUT_GENERATE_PATH } from '@/constants/api';

type GenerateParams = {
  workoutType: WorkoutStyle;
  target: BodyArea;
  duration: string;
};

export function useWorkoutGenerate() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (params: GenerateParams) => {
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const url = new URL(WORKOUT_GENERATE_PATH, API_BASE_URL);
      url.searchParams.set('workoutType', params.workoutType);
      url.searchParams.set('target', params.target);
      url.searchParams.set('duration', params.duration);

      const res = await fetch(url.toString());
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as WorkoutPlan;
      setPlan(data);
      return data;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to generate workout';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPlan(null);
    setError(null);
  }, []);

  return { plan, loading, error, generate, reset };
}
