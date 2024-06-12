package com.concert.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.concert.exceptions.ResourceNotFoundException;
import com.concert.models.Concert;
import com.concert.repos.ConcertRepository;
import com.concert.utils.StorageService;

@Service
public class ConcertService {

	@Autowired private ConcertRepository repo;
	@Autowired private StorageService storage;
	
	public void save(Concert concert,MultipartFile photo) {
		
		try {
//		System.out.println("concert id"+concert.getConcertId());
		if(concert.getConcertId()==0) {
			String poster=storage.store(photo);
			concert.setPoster(poster);
		}else {
			if(photo!=null) {
				String poster=storage.store(photo);
				concert.setPoster(poster);				
			}else {
				Concert mm=repo.findById(concert.getConcertId()).get();
				concert.setPoster(mm.getPoster());
			}
		}
		repo.save(concert);
	}catch(ResourceNotFoundException e) {
		 throw new ResourceNotFoundException("Concert not saved");
	}
	}
	
	public List<Concert> listall(){
		return repo.findAll();
	}
	
	public Concert findById(int id) {
		return repo.getById(id);
	}
	
	public void deleteConcert(int id) {
		repo.delete(repo.getById(id));
	}
}
