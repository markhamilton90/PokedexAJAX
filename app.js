$(document).ready( function(){

	// holds value to be passed to getPokemonById
	var current = $('#dex-number');

	// initial loaded data
	getPokemon("venusaur");
	
	// submit AJAX request and return Pokemon object
	$('.submit-poke').submit(function(event){
		event.preventDefault();
		var entry = $(this).find('input[name="poke"]').val();
		entry = entry.toLowerCase();
		getPokemon(entry);
		$(this).find('input[name="poke"]').val('');
	});

	// make another request by clicking the arrow symbols on the page, and 
	// using the current displayed object's property 'pkdx_id' as parameter for new query
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
				checkTypes(text, result);
			});

			var info = data.descriptions[0].resource_uri;
			// get description of Pokemon
			$.getJSON("http://pokeapi.co" + info, function(data){
				//console.log(data);
				$('#descrip').text(data.description);
			});

		});
	}

	// colors #types div based on the name of its type
	function checkTypes(text, result){
		if (text == "GRASS"){
			result.css({'color': '#78C850', 'border': '2px solid #78C850'});
		}
		else if (text == "POISON"){
			result.css({'color': '#A040A0', 'border': '2px solid #A040A0'});
		}
		else if (text == "WATER"){
			result.css({'color': '#6890F0', 'border': '2px solid #6890F0'});
		}
		else if (text == "FIRE"){
			result.css({'color': '#F08030', 'border': '2px solid #F08030'});
		}
		else if (text == "ICE"){
			result.css({'color': '#98D8D8', 'border': '2px solid #98D8D8'});
		}
		else if (text == "GHOST"){
			result.css({'color': '#705898', 'border': '2px solid #705898'});
		}
		else if (text == "PSYCHIC"){
			result.css({'color': '#F85888', 'border': '2px solid #F85888'});
		}
		else if (text == "FAIRY"){
			result.css({'color': '#EE99AC', 'border': '2px solid #EE99AC'});
		}
		else if (text == "STEEL"){
			result.css({'color': '#B8B8D0', 'border': '2px solid #B8B8D0'});
		}
		else if (text == "BUG"){
			result.css({'color': '#A8B820', 'border': '2px solid #A8B820'});
		}
		else if (text == "FLYING"){
			result.css({'color': '#A890F0', 'border': '2px solid #A890F0'});
		}
		else if (text == "NORMAL"){
			result.css({'color': '#A8A878', 'border': '2px solid #A8A878'});
		}
		else if (text == "DRAGON"){
			result.css({'color': '#7038F8', 'border': '2px solid #7038F8'});
		}
		else if (text == "ELECTRIC"){
			result.css({'color': '#F8D030', 'border': '2px solid #F8D030'});
		}
		else if (text == "FIGHTING"){
			result.css({'color': '#C03028', 'border': '2px solid #C03028'});
		}
		else if (text == "GROUND"){
			result.css({'color': '#E0C068', 'border': '2px solid #E0C068'});
		}
		else if (text == "ROCK"){
			result.css({'color': '#B8A038', 'border': '2px solid #B8A038'});
		}
		else if (text == "DARK"){
			result.css({'color': '#705848', 'border': '2px solid #705848'});
		}
	}

});



