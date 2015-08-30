$(document).ready( function(){

	getPokemon("venusaur");
	// I want this to hold a value from getPokemon's returned data
	// so it can be passed to getPokemonById
	var current = $('#dex-number');
	
	// submit AJAX request to Pokeapi and return a Pokemon
	// object
	$('.submit-poke').submit(function(event){
		event.preventDefault();
		var entry = $(this).find('input[name="poke"]').val();
		entry = entry.toLowerCase();
		getPokemon(entry);
		$(this).find('input[name="poke"]').val('');
	});

	// make another request by clicking the right arrow symbol
	// on the page, and using the current displayed object's property
	// 'pkdx_id' as parameter for new query
	$('#right').on('click', function(e){
		console.log(current.text());
		getPokemonById(current.text(), true);
	});

	$('#left').on('click', function(e){
		console.log(current.text());
		getPokemonById(current.text(), false);
	})

	// search for Pokemon object based on pkdx_id property
	function getPokemonById(current, next){
		current = parseInt(current);

		if (next == true){
			current += 1;
		} else {
			current -= 1;
		}

		$.getJSON("http://pokeapi.co/api/v1/pokemon/" + current + "/", function(data){
			//console.log(data.name);
			getPokemon((data.name).toLowerCase());
		});
	}

	// search for Pokemon object based on name and populate DOM with its 
	// sprite and property fields
	function getPokemon(entry) {
		$.getJSON("http://pokeapi.co/api/v1/pokemon/" + entry + "/", function(data){
			$('#dex-number').text(data.pkdx_id);
			$('#entry-name').text(data.name);

			// get and display the sprite
			$.getJSON("http://pokeapi.co/api/v1/sprite/" + (data.national_id + 1) + "/", function(newData){
				$('#sprite').html('<img src="http://pokeapi.co' + newData.image + '">');
				//console.log(newData.image);
			});

			// display Pokemon's fighting stats
			$('#hp').html("HP <hr><p>" + data.hp + "</p>");
			$('#atk').html("ATTACK <hr><p>" + data.attack + "</p>");
			$('#def').html("DEFENSE <hr><p>" + data.defense + "</p>");
			$('#spa').html("SP.ATK <hr><p>" + data.sp_atk + "</p>");
			$('#spd').html("SP.DEF <hr><p>" + data.sp_def + "</p>");
			$('#spe').html("SPEED <hr><p>" + data.speed + "</p>");

			// clone and display a div for each of the Pokemon's types
			$('#typing').html('');
			$.each(data.types, function(i, type){
				var result = $('#types').clone();
				var text = type.name.toUpperCase();
				result.text(text);
				$('#typing').append(result);

				// color types according to category
				if (text == "POISON"){
					result.css({'color': '#BA55D3', 'border': '2px solid #BA55D3'});
				}
				if (text == "GRASS"){
					result.css({'color': 'green', 'border': '2px solid green'});
				}
				if (text == "WATER"){
					result.css({'color': 'blue', 'border': '2px solid blue'});
				}
				if (text == "FIRE"){
					result.css({'color': '#FF4500', 'border': '2px solid #FF4500'});
				}
				if (text == "ICE"){
					result.css({'color': '#00FFFF', 'border': '2px solid #00FFFF'});
				}
				if (text == "GHOST"){
					result.css({'color': '#4B0082', 'border': '2px solid #4B0082'});
				}
				if (text == "PSYCHIC"){
					result.css({'color': '#FF4500', 'border': '2px solid #FF4500'});
				}
				if (text == "FAIRY"){
					result.css({'color': '#00FFFF', 'border': '2px solid #00FFFF'});
				}
				if (text == "STEEL"){
					result.css({'color': '#4B0082', 'border': '2px solid #4B0082'});
				}
				if (text == "BUG"){
					result.css({'color': '#9ACD32', 'border': '2px solid #9ACD32'});
				}
				if (text == "FLYING"){
					result.css({'color': '#7fb8ff', 'border': '2px solid #7fb8ff'});
				}
				if (text == "NORMAL"){
					result.css({'color': 'tan', 'border': '2px solid tan'});
				}

			});

			var info = data.descriptions[0].resource_uri;

			// get description of Pokemon
			$.getJSON("http://pokeapi.co" + info, function(data){
				//console.log(data);
				$('#descrip').text(data.description);
			});

		});
	}

//

});



