$(document).ready( function(){

	// I want this to hold a value from getPokemon's returned data
	// so it can be passed to getPokemonById
	var current;
	
	// submit AJAX request to Pokeapi and return a Pokemon
	// object
	$('.submit-poke').submit(function(event){
		event.preventDefault();
		var entry = $(this).find('input[name="poke"]').val();
		entry = entry.toLowerCase();
		getPokemon(entry);
		console.log(current);
		$(this).find('input[name="poke"]').val('');
	});

	// make another request by clicking the right arrow symbol
	// on the page, and using the current displayed object's property
	// 'pkdx_id' as parameter for new query
	$('#right').on('click', function(e){
		console.log(current);
		var searchTerm = getPokemonById(current);
		getPokemon(searchTerm);
	});

	// search for Pokemon object based on pkdx_id property
	function getPokemonById(current){
		$.getJSON("http://pokeapi.co/api/v1/pokemon/" + (current + 1) + "/", function(data){
			console.log(current, data.name);
			return data.name;
		});
	}

	// search for Pokemon object based on name and populate DOM with its 
	// sprite and property fields
	function getPokemon(entry) {
		$.getJSON("http://pokeapi.co/api/v1/pokemon/" + entry + "/", function(data){
			$('#entry-name').text(data.name);
			$('#dex-number').text(data.pkdx_id);
			console.log(data);
			// display Pokemon's fighting stats
			$('#hp').html("HP: &nbsp;" + data.hp);
			$('#atk').html("ATTACK: &nbsp;" + data.attack);
			$('#def').html("DEFENSE: &nbsp;" + data.defense);
			$('#spa').html("SP_ATK: &nbsp;" + data.sp_atk);
			$('#spd').html("SP_DEF: &nbsp;" + data.sp_def);
			$('#spe').html("SPEED: &nbsp;" + data.speed);

			// clone and display a div for each of the Pokemon's types
			$('#typing').html('');
			$.each(data.types, function(i, type){
				var result = $('#types').clone();
				var text = type.name.toUpperCase();
				result.text(text);
				$('#typing').append(result);

				// color types according to category
				if (text == "POISON"){
					result.css({'color': 'purple', 'border': '2px solid purple'});
				}
				if (text == "GRASS"){
					result.css({'color': 'green', 'border': '2px solid green'});
				}
				if (text == "WATER"){
					result.css({'color': 'blue', 'border': '2px solid blue'});
				}

			});

			var info = data.descriptions[0].resource_uri;

			// get description of Pokemon
			$.getJSON("http://pokeapi.co" + info, function(data){
				console.log(data);
				$('#descrip').text(data.description);
			})

			// get and display the sprite
			$.getJSON("http://pokeapi.co/api/v1/sprite/" + (data.national_id + 1) + "/", function(newData){
				$('#sprite').html('<img src="http://pokeapi.co' + newData.image + '">');
				console.log(newData.image);
			});

			saveCurrent($('entry-name').val());

		}).done(function(data){
			current = data.pkdx_id;
			console.log(current);
			saveCurrent(current);
			});
	}

	// I want to add this to the callback function in order to save the 
	// returned object's pkdx_id value for use as parameter for call to
	// getPokemonById
	function saveCurrent(id){
		console.log($('entry-name').val());
		current = id;
	}

});



