package com.projects.workoutapplication.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkoutPlanResponseDto {

    public String title;

    public Integer totalDuration;

    public List<ExerciseDto> exercises;
}
