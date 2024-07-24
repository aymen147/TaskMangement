package com.springjwt.dto;

import com.springjwt.entities.User;

public record AuthenticationResponse(String jwtToken, User user) {

}
