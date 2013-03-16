function move(command, state){
	$.ajax({
		url: "/command/" + command,
		data: {
			control: state
		},
		success: function( data ){
			console.log('Moved ', command);
		}
	});
}

$(function(){
	$("#speed").on('change', function(){
		console.log('speed changed to', $('#speed').val() );
		$.ajax({
			url: "/command/speed",
			data: {speed:$('#speed').val()},
			success: function(data){
				console.log('Adjusted speed');
			}
		});
	});
});

var socket = io.connect('');	//use current host/port
socket.on('connected', function (data) {
    console.log(data);
});

$(document).ready(function() {
	//defining keyboard shortcuts
	var controls = {
			demo: 'ctrl+d',
			takeoff: 'ctrl+t',
			stop: 'space',
			forward: 'w',
			back: 's',
			left: 'a',
			right: 'd',
			up: 'k',
			down: 'm'
	};
	for(var control in controls){
		addKeyBinding(control, controls[control]);
	}
});

//we fine an action key with to events
function addKeyBinding(action, key){
	console.log("Adding key binding for action: " + action + " to key: " + key);
	$(document).bind('keydown', key,
		function(){
			move(action, true);
		}
	);
	$(document).bind('keyup', key,
		function(){
			move(action, false);
		}
	);	
}
