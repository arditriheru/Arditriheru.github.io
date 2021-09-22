function searchMovie()
{
	$('#movie-list').html('');

	$.ajax({
		url : 'http://omdbapi.com',
		type : 'get',
		dataType : 'json',
		data : {
			'apikey' : '98bcc076',
			's' : $('#search-input').val()
		},
		success : function(result){
			if(result.Response == "True"){

				let movies = result.Search;

				$.each(movies, function(i, data){
					$('#movie-list').append(`
						<div class="col-md-4">
						<div class="card mb-3" style="width: 18rem;">
						<img src="`+ data.Poster +`" class="card-img-top">
						<div class="card-body">
						<h5 class="card-title">`+ data.Title +`</h5>
						<h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
						<a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`">See detail</a>
						</div>
						</div>
						</div>
						`);
				});

				$('#search-input').val('');

			}else{

				$('#movie-list').html(`
					<div class="col">
					<h1 class="text-center">Movie not found!</h1>
					</div>
					`);

			}
		}
	});

}

$('#search-button').on('click', function(){

	searchMovie();

});

$('#search-input').on('keyup', function(e){

	if(e.which === 13){
		searchMovie();
	}
	
});

$('#movie-list').on('click', '.see-detail', function()
{
	$.ajax({
		url : 'http://omdbapi.com',
		type : 'get',
		dataType : 'json',
		data : {
			'apikey' : '98bcc076',
			'i' : $(this).data('id')
		},
		success : function(movie)
		{
			if(movie.Response === "True"){

				$('.modal-body').html(`
					<div class="container-fluid">
					<div class="row">

					<div class="col-md-4">
					<img src="`+ movie.Poster +`" class="img-fluid">
					</div>

					<div class="col-md-8">
					<ul class="list-group">
					<li class="list-group-item"><h4>`+ movie.Title +`</h4></li>
					<li class="list-group-item"><strong>Released : </strong>`+ movie.Released +`</li>
					<li class="list-group-item"><strong>Genre : </strong>`+ movie.Genre +`</li>
					<li class="list-group-item"><strong>Writer : </strong>`+ movie.Writer +`</li>
					<li class="list-group-item"><strong>Director : </strong>`+ movie.Director +`</li>
					<li class="list-group-item"><strong>Actors : </strong>`+ movie.Actors +`</li>
					<li class="list-group-item"><strong>Plot : </strong>`+ movie.Plot +`</li>
					<li class="list-group-item"><strong>Awards : </strong>`+ movie.Awards +`</li>
					</ul>
					</div>

					</div>
					</div>
					`);


			}
		}

	});
});