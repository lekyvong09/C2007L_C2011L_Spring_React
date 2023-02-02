package com.ray.api.entity;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class Buggy {
    @NotEmpty
    @Size(min=2, message = "user name should have at least 2 characters")
    private String name;

    @NotEmpty
    @Email
    private String email;
}
