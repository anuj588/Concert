package com.concert.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.concert.dtos.SearchDTO;
import com.concert.dtos.ShowDTO;
import com.concert.models.Shows;
import com.concert.repos.ShowsRepository;

@Service
public class ShowsService {

	@Autowired private ShowsRepository repo; 
	@Autowired private ConcertService mservice;
	@Autowired private HallService hservice;
	@Autowired private SearchSpecification ssp;
	
	public void save(ShowDTO dto) {
		Shows show=new Shows();
		BeanUtils.copyProperties(dto, show);
		show.setHall(hservice.findById(dto.getHallId()));
		show.setConcert(mservice.findById(dto.getConcertId()));
		repo.save(show);
	}
	
	public void deleteShow(int id) {
		repo.delete(repo.getById(id));
	}
	
	public List<Shows> listall(){
		return repo.findAll();
	}
	
	public List<Shows> todayShows(){
		return repo.todaysShow();
	}
	
	public List<Shows> searchShows(SearchDTO dto){
		return repo.findAll(ssp.getfilteredShows(dto));
	}
	
	public Shows findById(int id) {
		return repo.getById(id);
	}
	

}
