package com.concert.dtos;

import com.concert.models.Shows;

public class ShowDTO extends Shows {

	private int hallId;
	private int concertId;
	public int getHallId() {
		return hallId;
	}
	public void setHallId(int hallId) {
		this.hallId = hallId;
	}
	public int getConcertId() {
		return concertId;
	}
	public void setConcertId(int concertId) {
		this.concertId = concertId;
	}
	@Override
	public String toString() {
		return "ShowDTO [hallId=" + hallId + ", concertId=" + concertId + "]";
	}
	
	
}
