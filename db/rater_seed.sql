create table Rating (
id serial primary key,
rating int,
raterid int, 
foreign key (raterid) references hardware(id)
)