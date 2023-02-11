package com.ray.api.controller;

import org.apache.commons.io.FileUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/api/file")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class FileController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String message;
        try {
            Files.copy(file.getInputStream(), Paths.get("upload/image").resolve(file.getOriginalFilename()));
            message = "Upload file successfully: " + file.getOriginalFilename();
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            message = "Could not upload the file " + file.getOriginalFilename();
            return new ResponseEntity<>(message, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping(value="/image/{filename}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) throws IOException {
        Path file = Paths.get("upload/image").resolve(filename);
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() && resource.isReadable()) {
            return new ResponseEntity<>(FileUtils.readFileToByteArray(resource.getFile()), HttpStatus.OK );
        } else {
            throw new RuntimeException("Could not find the image");
        }
    }
}
