select * from hardware as h
join peripherals as p on h.id = p.hardwareid 
join users as u on u.auth_id = h.authid