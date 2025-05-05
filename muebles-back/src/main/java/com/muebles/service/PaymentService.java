package com.muebles.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.muebles.entity.Payment;
import com.muebles.repository.PaymentRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class PaymentService {
	
	@Autowired
	PaymentRepository pr;
	
	ValidatorFactory factory=Validation.buildDefaultValidatorFactory();
	Validator validator=factory.getValidator();
	
	public List<Payment> listar(){
		List<Payment> result=new ArrayList<Payment>();
		
		pr.findAll().forEach(result::add);

		return result;
	}
	
	public Payment buscarPorId(Integer id) {
		
		Optional<Payment> payment=pr.findById(id);
		
		if(payment.isPresent()) {
			return payment.get();
		}else {
			throw new RuntimeException("No se encontro el pago con ID: " + id);
		}
		
	}
	
	public Payment guardar(Payment payment) {
		Set<ConstraintViolation<Payment>> violations=validator.validate(payment);
		
		String errorValidation="";
		for(ConstraintViolation<Payment> cv:violations) {
			errorValidation+="Error "+cv.getPropertyPath()+" "+cv.getMessage();
		}
		
		if(!violations.isEmpty()) {
			throw new RuntimeException(errorValidation);
		}
		return pr.save(payment);
	}
	
	public void eliminar(Integer id) {
		pr.deleteById(id);
	}

}
