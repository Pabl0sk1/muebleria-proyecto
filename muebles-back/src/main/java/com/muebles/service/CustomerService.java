package com.muebles.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.muebles.entity.Customer;
import com.muebles.repository.CustomerRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class CustomerService {

	@Autowired
	CustomerRepository cr;
	
	ValidatorFactory factory=Validation.buildDefaultValidatorFactory();
	Validator validator=factory.getValidator();
	
	public List<Customer> listar(){
		List<Customer> result=new ArrayList<Customer>();
		
		cr.findAll().forEach(result::add);

		return result;
	}
	
	public Customer buscarPorId(Integer id) {
		
		Optional<Customer> customer=cr.findById(id);
		
		if(customer.isPresent()) {
			return customer.get();
		}else {
			throw new RuntimeException("No se encontro el cliente con ID: " + id);
		}
		
	}
	
	public Customer guardar(Customer customer) {
		Set<ConstraintViolation<Customer>> violations=validator.validate(customer);
		
		String errorValidation="";
		for(ConstraintViolation<Customer> cv:violations) {
			errorValidation+="Error "+cv.getPropertyPath()+" "+cv.getMessage();
		}
		
		if(!violations.isEmpty()) {
			throw new RuntimeException(errorValidation);
		}
		return cr.save(customer);
	}
	
	public void eliminar(Integer id) {
		cr.deleteById(id);
	}
	
	public List<Customer> buscarPorClientePaginado(String name, String lastname, Pageable pageable){
		
		return cr.findByNameLikeIgnoreCaseOrLastnameLikeIgnoreCase(name, lastname, pageable);
	}
	
	public List<Customer> buscarPorEmail(String email){
		
		return cr.findByEmailLikeIgnoreCase(email);
	}
	
	public List<Customer> buscarPorTelefono(String phone){
		
		return cr.findByPhoneLike(phone);
	}
} 
