package com.concert.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.concert.models.Hall;


import com.concert.repos.HallRepository;

@Service
public class HallService {
	@Autowired private HallRepository repo;


	public void save(Hall hall) {
		repo.save(hall);
	}

	public List<Hall> listall(){
		return repo.findAll();
	}

	public Hall findById(int id) {
		return repo.getById(id);
	}

	public void deleteHall(int id) {
		repo.delete(repo.getById(id));
	}
}
