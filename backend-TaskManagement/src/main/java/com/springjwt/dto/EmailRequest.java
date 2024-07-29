package com.springjwt.dto;

import lombok.Getter;

public class EmailRequest {
    @Getter
    private String to;
    @Getter
    private String subject;
    @Getter
    private String body;


}