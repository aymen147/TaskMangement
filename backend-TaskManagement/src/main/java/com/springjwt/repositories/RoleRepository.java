package com.springjwt.repositories;

import com.springjwt.entities.Role;
import com.springjwt.entities.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(RoleName roleName);
}
