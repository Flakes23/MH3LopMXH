package com.example.MH3LopMxh.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {
    private Cloudinary cloudinary;

    public CloudinaryService() {
        Map<String, String> valuesMap = new HashMap<>();
        valuesMap.put("cloud_name", "dcpgsw3cc");
        valuesMap.put("api_key", "228294847414865");
        valuesMap.put("api_secret", "zSkBjH2j-ZY1MAFsF2RIyu0N4pI");
        cloudinary = new Cloudinary(valuesMap);
    }

    public String uploadImage(MultipartFile file) throws IOException {
        File tempFile = File.createTempFile("upload-", file.getOriginalFilename());
        file.transferTo(tempFile);

        Map<?, ?> uploadResult = cloudinary.uploader().upload(tempFile, ObjectUtils.emptyMap());
        return uploadResult.get("secure_url").toString();
    }
}
