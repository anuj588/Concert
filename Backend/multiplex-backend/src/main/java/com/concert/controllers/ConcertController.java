package com.concert.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.concert.models.Concert;
import com.concert.services.ConcertService;

@CrossOrigin
@RestController
@RequestMapping("/api/concert")
public class ConcertController {
	@Autowired private ConcertService mService;

    @PostMapping
    public ResponseEntity<?> saveConcert(Concert concert,@RequestPart(required = false) MultipartFile photo){
        mService.save(concert,photo);
        return ResponseEntity.ok().body("Concert saved successfully");
    }

    @GetMapping
    public ResponseEntity<?> listall(){
        return ResponseEntity.ok(mService.listall());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteConcert(@PathVariable("id") int id){
        mService.deleteConcert(id);
        return ResponseEntity.ok("Concert deleted successfully");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findDetails(@PathVariable("id") int id){
        return ResponseEntity.ok().body(mService.findById(id));
    }
}
