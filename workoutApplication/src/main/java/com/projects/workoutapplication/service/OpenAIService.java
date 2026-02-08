package com.projects.workoutapplication.service;

import com.projects.workoutapplication.config.LLMAPIConfig;
import com.projects.workoutapplication.dto.WorkoutPlanResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final LLMAPIConfig openAiConfig;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public OpenAIService(LLMAPIConfig openAiConfig) {
        this.openAiConfig = openAiConfig;
    }

    public WorkoutPlanResponseDto getWorkoutPlanJson(String workoutType, String target, String duration) {

        String apiUrl = "https://api.openai.com/v1/chat/completions";

        String prompt = buildPrompt(workoutType, duration, target);

        Map<String, Object> message = Map.of(
                "role", "user",
                "content", prompt
        );

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4o-mini");
        requestBody.put("messages", List.of(message));
        requestBody.put("temperature", 0.3);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(openAiConfig.getOpenAIApiKey());
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            Map choice = ((List<Map>) response.getBody().get("choices")).get(0);
            Map messageOut = (Map) choice.get("message");
            String rawJson = (String) messageOut.get("content");

            // Clean markdown formatting if any
            String cleanedJson = rawJson
                    .replaceAll("(?s)^```json\\s*", "")
                    .replaceAll("(?s)```$", "")
                    .trim();

            // Deserialize directly into WorkoutPlanResponseDto
            WorkoutPlanResponseDto plan =
                    objectMapper.readValue(cleanedJson, WorkoutPlanResponseDto.class);

            return plan;

        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch or parse OpenAI workout response", e);
        }
    }


    private String buildPrompt(String workoutType, String duration, String target) {

            return """
                    You are a fitness workout generator.
                    
                    Generate a custom workout plan based on:
                    - Workout Type: %s
                    - Target Area: %s
                    - Total Duration (minutes): %s
                    
                    Return ONLY valid JSON in the following exact format. 
                    Do not include any explanation, markdown, or text outside the JSON.
                    
                    The response must match this schema exactly:
                    
                    {
                      "title": "string",
                      "totalDuration": number,
                      "exercises": [
                        {
                          "exerciseName": "string",
                          "sets": number,
                          "time": number,
                          "restSec": number
                        }
                      ]
                    }
                    
                    Rules:
                    - totalDuration must equal the given duration in minutes.
                    - time must be the duration of ONE set in SECONDS.
                    - All exercises must fit approximately within the total workout duration.
                    - Use 6 to 10 exercises depending on duration.
                    - Include a short warm-up at the beginning and cooldown at the end.
                    - Prefer bodyweight exercises unless specified otherwise.
                    - Do NOT include reps, ranges, or text — only numeric time in seconds.
                    - Do NOT add any extra fields.
                    - Make rest realistic (30–90 seconds).
                    
                    Now generate the workout plan.
                    """.formatted(workoutType, target, duration);
    }

}
