package com.muebles.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.muebles.entity.Payment;
import com.muebles.service.PaymentService;

@RestController
@RequestMapping(path="pago")
@CrossOrigin(origins="http://localhost:5173/", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PaymentController {

	@Autowired
	PaymentService ps;
	
	@GetMapping(path="listar")
	public Map<String, Object> listar() {
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", ps.listar().size());
		result.put("list", ps.listar());
		
		return result;
	}
	
	@GetMapping(path="buscar/{id}")
	public Map<String, Object> buscarPorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("payment", ps.buscarPorId(id));
		
		return map;
	}
	
	@PostMapping(path="guardar")
	public Map<String, Object> guardar(@RequestBody Payment payment) {
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		map.put("added", ps.guardar(payment));
		
		return map;
	}
	
	@DeleteMapping(path="eliminar/{id}")
	public Map<String, Object> eliminar(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0;
		
		for(Payment c:ps.listar()) {
			if(c.getId_payment()==id) {
				sw=1;
				break;
			}
		}
		
		if(sw==1) {
			ps.eliminar(id);
			map.put("message", "Registro de ID "+id+" de pago eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@PutMapping(path="modificar/{id}")
	public Map<String, Object> modificar(@PathVariable Integer id, @RequestBody Payment payment) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		Payment existingPayment=ps.buscarPorId(id);
		
		if(existingPayment!=null) {
			payment.setId_payment(id);
			map.put("modify", ps.guardar(payment));
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
}
