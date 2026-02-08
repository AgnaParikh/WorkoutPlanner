package com.projects.workoutapplication.controller;

import com.projects.workoutapplication.dto.WorkoutPlanResponseDto;
import com.projects.workoutapplication.service.OpenAIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workout")
public class WorkoutController {

    private final OpenAIService openAIService;

    @Autowired
    public WorkoutController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    @Operation(
            summary = "Generate a workout plan",
            description = "Generates a customized workout plan based on workout type, target area, and duration using OpenAI"
    )
    @GetMapping("/generate")
    public ResponseEntity<WorkoutPlanResponseDto> generateWorkout(
            @Parameter(description = "Type of workout (e.g., Cardio, Strength, HIIT, Yoga)", example = "Strength")
            @RequestParam String workoutType,

            @Parameter(description = "Target muscle group or body area (e.g., Full Body, Upper Body, Core)", example = "Upper Body")
            @RequestParam String target,

            @Parameter(description = "Total workout duration in minutes", example = "30")
            @RequestParam String duration
    ) {
        WorkoutPlanResponseDto workoutPlan = openAIService.getWorkoutPlanJson(workoutType, target, duration);
        return ResponseEntity.ok(workoutPlan);
    }

    @Operation(
            summary = "Health check endpoint",
            description = "Simple endpoint to verify the API is running"
    )
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Workout API is running!");
    }
}
