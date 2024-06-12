package com.concert.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.concert.models.Concert;

@Repository
public interface ConcertRepository extends JpaRepository<Concert, Integer>{

}
