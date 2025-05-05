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

import com.muebles.entity.Role;
import com.muebles.service.RoleService;

@RestController
@RequestMapping(path="rol")
@CrossOrigin(origins="http://localhost:5173/", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class RoleController {

	@Autowired
	RoleService rs;
	
	@GetMapping(path="listar")
	public Map<String, Object> listar() {
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", rs.listar().size());
		result.put("list", rs.listar());
		
		return result;
	}
	
	@GetMapping(path="buscar/{id}")
	public Map<String, Object> buscarPorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("role", rs.buscarPorId(id));
		
		return map;
	}
	
	@PostMapping(path="guardar")
	public Map<String, Object> guardar(@RequestBody Role role) {
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		map.put("added", rs.guardar(role));
		
		return map;
	}
	
	@DeleteMapping(path="eliminar/{id}")
	public Map<String, Object> eliminar(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0;
		
		for(Role r:rs.listar()) {
			if(r.getId_role()==id) {
				sw=1;
				break;
			}
		}
		
		if(sw==1) {
			rs.eliminar(id);
			map.put("message", "Registro de ID "+id+" de rol eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@PutMapping(path="modificar/{id}")
	public Map<String, Object> modificar(@PathVariable Integer id, @RequestBody Role role) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		Role existingRole=rs.buscarPorId(id);
		
		if(existingRole!=null) {
			role.setId_role(id);
			map.put("modify", rs.guardar(role));
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
}
