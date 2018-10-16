// Trabajo de Presentación para NextU
// Humberto Rafael Ariza Villanueva
// Frameworks y Librerías JavaScript > Evaluación Final

// Función para Cambiar el color del titulo
function colorBlink(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				colorBlink('h1.main-titulo');
			},
			queue: true
		});
}

// Función para Obtener los números aleatorios
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

// Devuelve un DulceRows o todas las DulceColumns
function giveDulceArrays(arrayType, index) {

	var DulceCol1 = $('.col-1').children();
	var DulceCol2 = $('.col-2').children();
	var DulceCol3 = $('.col-3').children();
	var DulceCol4 = $('.col-4').children();
	var DulceCol5 = $('.col-5').children();
	var DulceCol6 = $('.col-6').children();
	var DulceCol7 = $('.col-7').children();

	var DulceColumns = $([DulceCol1, DulceCol2, DulceCol3, DulceCol4,
		DulceCol5, DulceCol6, DulceCol7
	]);

	if (typeof index === 'number') {
		var DulceRow = $([DulceCol1.eq(index), DulceCol2.eq(index), DulceCol3.eq(index),
			DulceCol4.eq(index), DulceCol5.eq(index), DulceCol6.eq(index),
			DulceCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return DulceColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return DulceRow;
	}
}

// Crea arrays DulceRow
function DulceRows(index) {
	var DulceRow = giveDulceArrays('rows', index);
	return DulceRow;
}

// Crea arrays DulceColumn
function DulceColumns(index) {
	var DulceColumn = giveDulceArrays('columns');
	return DulceColumn[index];
}

// Valida si hay dulces que se eliminarán en una columna
function columnValidation() {
	// Itera sobre cada DulceColumn
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		// Salvará la posición del caramelo
		var DulcePosition = [];
		// Salvará la posición de dulces extra
		var extraDulcePosition = [];
		// Crea una DulceColumn
		var DulceColumn = DulceColumns(j);
		// Toma el primer objeto de DulceColumn
		var comparisonValue = DulceColumn.eq(0);
		// Se establecerá a Verdadero si hay una brecha entre las "líneas de dulces"
		var gap = false;
		// Itera sobre el objeto DulceColumn
		for (var i = 1; i < DulceColumn.length; i++) {
			// El src attr de comparisonValue
			var srcComparison = comparisonValue.attr('src');
			// El src attr del objeto después de comparisonValue
			var srcDulce = DulceColumn.eq(i).attr('src');

			if (srcComparison != srcDulce) {
				if (DulcePosition.length >= 3) {
					gap = true;
				} else {
					DulcePosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						DulcePosition.push(i - 1);
					} else {
						extraDulcePosition.push(i - 1);
					}
				}
				if (!gap) {
					DulcePosition.push(i);
				} else {
					extraDulcePosition.push(i);
				}
				counter += 1;
			}
			// Comparación de actualizaciones Valor
			comparisonValue = DulceColumn.eq(i);
		}
		// Si la posición extra del Dulce tiene más de dos elementos, se fusionó con la posición de Dulce
		if (extraDulcePosition.length > 2) {
			DulcePosition = $.merge(DulcePosition, extraDulcePosition);
		}
		// Si DulcePosition tiene menos de / o dos elementos, se elimina
		if (DulcePosition.length <= 2) {
			DulcePosition = [];
		}
		// Dulce Count es igual al número de elementos en DulcePosition
		DulceCount = DulcePosition.length;
		// Si hubiera una "línea de dulces" de 3 o más
		if (DulceCount >= 3) {
			deleteColumnDulce(DulcePosition, DulceColumn);
			setScore(DulceCount);
		}
	}
}

// Añade la clase "eliminar" a "líneas de dulces" que se encuentran en las columnas de dulces
function deleteColumnDulce(DulcePosition, DulceColumn) {
	for (var i = 0; i < DulcePosition.length; i++) {
		DulceColumn.eq(DulcePosition[i]).addClass('delete');
	}
}

// Valida si hay dulces que deben eliminarse en una fila
function rowValidation() {
	// Itera sobre cada fila de dulces
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		// Salvará la posición del Dulce
		var DulcePosition = [];
		// Salvará la posición de dulces extra
		var extraDulcePosition = [];
		// Crea una fila de dulces
		var DulceRow = DulceRows(j);
		// Toma el primer objeto de Dulce Row
		var comparisonValue = DulceRow[0];
		// Se establecerá a verdadero si hay una brecha entre las "líneas de dulces"
		var gap = false;
		// Itera sobre la matriz de DulceRow
		for (var i = 1; i < DulceRow.length; i++) {
			// El src attr de comparación Valor
			var srcComparison = comparisonValue.attr('src');
			// the src attr of the object after comparisonValue
			var srcDulce = DulceRow[i].attr('src');

			if (srcComparison != srcDulce) {
				if (DulcePosition.length >= 3) {
					gap = true;
				} else {
					DulcePosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						DulcePosition.push(i - 1);
					} else {
						extraDulcePosition.push(i - 1);
					}
				}
				if (!gap) {
					DulcePosition.push(i);
				} else {
					extraDulcePosition.push(i);
				}
				counter += 1;
			}
			// Updates comparisonValue
			comparisonValue = DulceRow[i];
		}
		// si extraDulcePosition tiene mas de 2 elementos se unificara
		if (extraDulcePosition.length > 2) {
			DulcePosition = $.merge(DulcePosition, extraDulcePosition);
		}
		// si DulcePosition tiene menos o 2 elementos, este se eliminara
		if (DulcePosition.length <= 2) {
			DulcePosition = [];
		}
		// DulceCount es igual a el nro de elementos en DulcePosition
		DulceCount = DulcePosition.length;
		// Si hay 'Dulce linea'  de 3 o mas
		if (DulceCount >= 3) {
			deleteHorizontal(DulcePosition, DulceRow);
			setScore(DulceCount);
		}
	}
}

// Agrega la clase 'eliminar' a 'líneas de dulces' en las filas de dulces
function deleteHorizontal(DulcePosition, DulceRow) {
	for (var i = 0; i < DulcePosition.length; i++) {
		DulceRow[DulcePosition[i]].addClass('delete');
	}
}

// Establece la puntuación de acuerdo al número de dulces que tienes
function setScore(DulceCount) {
	var score = Number($('#score-text').text());
	switch (DulceCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

// Se llama cuando el juego comienza, o los cambios ocurren en el tablero del juego
function checkBoard() {
	// if (result) {
	fillBoard();
	// }
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var Dulces = $(this).children().length;
		var agrega = top - Dulces;
		for (var i = 0; i < agrega; i++) {
			// Obtiene un tipo de Dulces al azar
			var DulceType = getRandomInt(1, 5);
			// Si la columna está vacía, usa append
			if (i === 0 && Dulces < 1) {
				$(this).append('<img src="image/' + DulceType + '.png" class="element"></img>');
			} else {
				// O bien, empuja los dulces superiores, más viejos hacia abajo, insertando los más nuevos antes de ellos
				$(this).find('img:eq(0)').before('<img src="image/' + DulceType + '.png" class="element"></img>');
			}
		}
	});
	addDulceEvents();
	setValidations();
}

// Establece las validaciones de columnas y fila
function setValidations() {
	columnValidation();
	rowValidation();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		deletesDulceAnimation();
	}
}

// Añade los eventos de dulces. Llamadas cada vez que se crean
function addDulceEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainDulceMovement
	});
	$('img').droppable({
		drop: swapDulce
	});
	enableDulceEvents();
}

function disableDulceEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableDulceEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

// Limita el movimiento del Dulce (éste es defectuoso)
function constrainDulceMovement(event, DulceDrag) {
	DulceDrag.position.top = Math.min(100, DulceDrag.position.top);
	DulceDrag.position.bottom = Math.min(100, DulceDrag.position.bottom);
	DulceDrag.position.left = Math.min(100, DulceDrag.position.left);
	DulceDrag.position.right = Math.min(100, DulceDrag.position.right);
}

// Cambia un Dulce por otro (a través de arrastrar y soltar)
function swapDulce(event, DulceDrag) {
	// el Dulce fue dragged
	var DulceDrag = $(DulceDrag.draggable);
	// el src attr de DulceDrag
	var dragSrc = DulceDrag.attr('src');
	// el 'droppable' Dulce
	var DulceDrop = $(this);
	// el src attr of DulceDrop
	var dropSrc = DulceDrop.attr('src');
	// cambiamos DulceDrag y DulceDrop src attributes
	DulceDrag.attr('src', dropSrc);
	DulceDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		// De esta manera, impedimos movimientos equivocados
		if ($('img.delete').length === 0) {
			// Dulce Arrastrar y Dulce Drop se les da su src inicial
			DulceDrag.attr('src', dragSrc);
			DulceDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

// Actualiza el valor de los movimientos
function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

// Animación que precede a la eliminación de dulces
function deletesDulceAnimation() {
	disableDulceEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesDulce()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

function showPromiseError(error) {
	console.log(error);
}

// Elimina el Dulce (devuelve un msj)
function deletesDulce() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar el Dulce...');
		}
	})
}

// Termina el juego
function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
}

// Comienza el juego
function initGame() {

	colorBlink('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		// Recarga la página cuando se hace clic por segunda vez
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		// Inicia el temporizador
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

// Prepara el juego 
$(function() {
	initGame();
});
