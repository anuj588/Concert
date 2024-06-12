package com.concert.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.concert.dtos.SearchDTO;
import com.concert.dtos.ShowDTO;
import com.concert.services.ShowsService;

@CrossOrigin
@RestController
@RequestMapping("/api/shows")
public class ShowsController {
	@Autowired private ShowsService mService;
	

    @PostMapping
    public ResponseEntity<?> saveShow(@RequestBody ShowDTO dto){
    	System.out.println(dto);
        mService.save(dto);
        return ResponseEntity.ok().body("Show saved successfully");
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteConcert(@PathVariable("id") int id){
        mService.deleteShow(id);
        return ResponseEntity.ok("Show deleted successfully");
    }

    @GetMapping
    public ResponseEntity<?> listall(){
        return ResponseEntity.ok(mService.listall());
    }
    
    @GetMapping("todays")
    public ResponseEntity<?> todayShows(){
        return ResponseEntity.ok(mService.todayShows());
    }
    
    @GetMapping("search")
    public ResponseEntity<?> searchShows(SearchDTO dto){
        return ResponseEntity.ok(mService.searchShows(dto));
    }


    @GetMapping("{id}")
    public ResponseEntity<?> findDetails(@PathVariable("id") int id){
        return ResponseEntity.ok().body(mService.findById(id));
    }
}
