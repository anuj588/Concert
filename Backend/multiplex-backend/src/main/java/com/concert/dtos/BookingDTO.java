package com.concert.dtos;

import com.concert.models.Booking;

public class BookingDTO extends Booking {
	private int showId;
	private int userId;

	private int[] seatnums;
	
	public int[] getSeatnums() {
		return seatnums;
	}
	public void setSeatnums(int[] seatnums) {
		this.seatnums = seatnums;
	}

	public int getShowId() {
		return showId;
	}
	public void setShowId(int showId) {
		this.showId = showId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}

}
