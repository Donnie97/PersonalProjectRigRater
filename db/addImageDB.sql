insert into Hardware (
    image, 
    authid,
    gpu,
    ram,
    motherboard,
    processor,
    compcase,
    powersupply,
    titlename
)
values($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *