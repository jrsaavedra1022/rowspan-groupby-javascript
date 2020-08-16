//Json Datos del calendario
const json_calendar = [
	{"id": 1, "date": "2020-08-16", "username": "Julian", "init_hour": "06:00", "end_hour": "08:00", "activity": "Cantar", "unq_key": "2020-08-16Julian"},
	{"id": 2, "date": "2020-08-16", "username": "Julian", "init_hour": "08:30", "end_hour": "09:00", "activity": "Bailar", "unq_key": "2020-08-16Julian"},
	{"id": 3, "date": "2020-08-16", "username": "Alexa", "init_hour": "06:00", "end_hour": "08:00", "activity": "Cocinar", "unq_key": "2020-08-16Alexa"},
	{"id": 4, "date": "2020-08-16", "username": "Alexa", "init_hour": "10:00", "end_hour": "11:00", "activity": "Fútbol", "unq_key": "2020-08-16Alexa"},
	{"id": 5, "date": "2020-08-16", "username": "Pablo", "init_hour": "06:00", "end_hour": "08:00", "activity": "Dormir", "unq_key": "2020-08-16Pablo"},
	{"id": 6, "date": "2020-08-16", "username": "Alexa", "init_hour": "11:00", "end_hour": "12:00", "activity": "Comprar", "unq_key": "2020-08-16Alexa"},
	{"id": 7, "date": "2020-08-16", "username": "Pablo", "init_hour": "10:30", "end_hour": "14:00", "activity": "Programar", "unq_key": "2020-08-16Pablo"}
];

(function(){
	// Función de agrupación
	const groupBy = function (json, prop) {
	    return json.reduce(function(groups, item) {
	        var val = item[prop];
	        groups[val] = groups[val] || {unq_key: item.unq_key, date: "", username: "", init_hour: [], end_hour: [], activity: [], rowspan: 0};
	        groups[val].date = item.date;
	        groups[val].username = item.username;
	        groups[val].init_hour.push({"init_hour": item.init_hour});
	        groups[val].end_hour.push({"end_hour": item.end_hour});
	        groups[val].activity.push({"activity": item.activity});
	        groups[val].rowspan++;
	        return groups;
	    }, {});
	}

	// Función que crea las Filas
	const create_row_with_rowspan = (row, position)=>{
		if(position==0){
			return (`
				<td rowspan="${row.rowspan}">${row.date}</td>
				<td rowspan="${row.rowspan}">${row.username}</td>
				<td>${row.init_hour[position].init_hour}</td>
				<td>${row.end_hour[position].end_hour}</td>
				<td>${row.activity[position].activity}</td>
			`)
		}
		return (`
			<td>${row.init_hour[position].init_hour}</td>
			<td>${row.end_hour[position].end_hour}</td>
			<td>${row.activity[position].activity}</td>
		`)
	}

	// Función que grafica el calendario
	function graph_calendar(){
		const data = groupBy(json_calendar,'unq_key')
		if(data){
			for(row in data){
				const tbody = document.getElementById("tbody")
				for(let i = 0; i < data[row].activity.length; i++){
					const tr = document.createElement("tr")
					tr.innerHTML = create_row_with_rowspan(data[row], i)
					tbody.appendChild(tr)
				}
			}
		}
	}

	//Ejecutamos la función
	graph_calendar()
})()