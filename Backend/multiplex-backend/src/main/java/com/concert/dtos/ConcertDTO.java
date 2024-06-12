package com.concert.dtos;

import org.springframework.web.multipart.MultipartFile;

import com.concert.models.Concert;

public class ConcertDTO extends Concert {

	private MultipartFile photo;

	public MultipartFile getPhoto() {
		return photo;
	}

	public void setPhoto(MultipartFile photo) {
		this.photo = photo;
	}
	
	
}
