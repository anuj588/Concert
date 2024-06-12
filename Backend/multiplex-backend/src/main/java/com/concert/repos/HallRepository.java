package com.concert.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.concert.models.Hall;

@Repository
public interface HallRepository extends JpaRepository<Hall, Integer> {

}
