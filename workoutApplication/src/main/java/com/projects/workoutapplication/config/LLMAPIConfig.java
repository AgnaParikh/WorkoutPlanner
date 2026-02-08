package com.projects.workoutapplication.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LLMAPIConfig {

    @Value("${openai.api.key}")
    private String apiKey;

    public String getOpenAIApiKey() {
        return apiKey;
    }
}
