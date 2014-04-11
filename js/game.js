// Variable globale plateau de jeu
var gameboard = new GameBoard();

var game = false;
var size = 5;


function drawBoard() {
    //$.each(soldiers, function(index, soldier) {
      //console.log(soldier.color);
	$.each(gameboard.cells, function(index, cell) {
		if (cell.element != null)
		{
			//console.log(cell.element.getType());
			if (cell.element.getType() == "Soldier")
			{
				//console.log(gameboard.getLegionOfSoldier(cell.element));
				$('canvas').setLayer(cell.getTextCoordinate(), {
					fillStyle: gameboard.getLegionOfSoldier(cell.element).color
				}).drawLayers();
			}
		}
    });
}


function initialize() {
	console.log("INITIALISE");
    
	// Variable pour le clic deplacement clic depart - arrivee
	var departClic;
	var departArrivee;
	var oldLayer_value;
	var boolStartEnd = false;

    var size = 5;
    var cellSize = 20;

    var cellHeight = cellSize * 2;
    var cellWidth = cellHeight * Math.sqrt(3) / 2;
    $('canvas').attr('height', size * 2 * cellHeight);
    $('canvas').attr('width', size 	* 2 * cellWidth + 50);


    for(var i = 0 - size ; i <= size ; i ++) {
        for(var j = 0 - size ; j <= size ; j ++) {

            var x = cellSize * 3/2 * j;
            var y = cellSize * Math.sqrt(3) * (i + j/2);

            if(-size <= i+j && i+j <= size) {
				// Draw a polygon
				$('canvas').drawPolygon({
				  layer: true,
				  fillStyle: '#ffe0c2',
				  strokeStyle: '#000',
				  x: x + (cellSize) * size *2,
				  y: y + (cellSize) * size *2,
				  uw: [j,i],
				  name: j+','+i,
				  radius: cellSize,
				  sides: 6,
				  rotate: 0,
				  click: function(layer) {
					if(boolStartEnd)
					{
						if(gameboard.getCell(new XY(layer.uw[0], layer.uw[1])).element == null)
						{
							arriveeClic = new XY(layer.uw[0], layer.uw[1]);
						
							bougerSoldier(departClic, arriveeClic);
							oldLayer_value.opacity = 1;
							oldLayer_value.fillStyle = '#ffe0c2'; // couleur de base du plateau (case Vide)
							boolStartEnd = false;
						}
					}
					else
					{
						if(gameboard.getCell(new XY(layer.uw[0], layer.uw[1])).element != null)
						{
							//alert("Ce soldat appartient au joueur: " + gameboard.getPlayerOfSoldier(gameboard.getCell(new XY(layer.uw[0], layer.uw[1])).element).login);
							console.log(layer.name);
							departClic = new XY(layer.uw[0], layer.uw[1]);
							oldLayer_value = layer;
							layer.opacity = 0.5; // case selectionnee (attente case Arrivee)
							boolStartEnd = true;
						}
					}
					update();
                  }
				  
                });
            }
        }
    }
}

/*
function initializeSoldiers()
{
	//Variable test taille du terrain
	var boardSize = size;
	
	if(boardSize == 1)
	{
	
	}
	else if(boardSize == 2)
	{
		
	}
	else if(boardSize == 3)
	{
	
	}
	else if(boardSize == 4)
	{

	}
	else if(boardSize == 5)
	{
		//S
		placerSoldier(0, 5);
		placerSoldier(0, 4);
		placerSoldier(0, 3);
		placerSoldier(0, 2);
		placerSoldier(-1, 5);
		placerSoldier(1, 4);
		
		//N
		placerSoldier(0, -5);
		placerSoldier(0, -4);
		placerSoldier(0, -3);
		placerSoldier(0, -2);
		placerSoldier(1, -5);
		placerSoldier(-1, -4);
		
		//SE
		placerSoldier(5,0);
		placerSoldier(4,0);
		placerSoldier(3,0);
		placerSoldier(2,0);
		placerSoldier(5,-1);
		placerSoldier(4,1);
		
		//NO
		placerSoldier(-5,0);
		placerSoldier(-4,0);
		placerSoldier(-3,0);
		placerSoldier(-2,0);
		placerSoldier(-5,1);
		placerSoldier(-4,-1);
		
		//NE
		placerSoldier(5,-5);
		placerSoldier(4,-4);
		placerSoldier(3,-3);
		placerSoldier(2,-2);
		placerSoldier(5,-4);
		placerSoldier(4,-5);
		
		//SO
		placerSoldier(-5,5);
		placerSoldier(-4,4);
		placerSoldier(-3,3);
		placerSoldier(-2,2);
		placerSoldier(-5,4);
		placerSoldier(-4,5);
		
		
		//Test manuel bougerSoldier
		var testdepart = new XY(0, 5);
		var testarrivee = new XY(0, 0);
		bougerSoldier(testdepart, testarrivee);
		
		
	}
	else if(boardSize == 6)
	{
	
	}
	else
	{
		 console.log("Taille du Board non valide");
	}
}
*/

function bougerSoldier(caseDepart, caseArrivee)
{
	//Soldier sur caseDepart est deplace vers caseArrivee
	var tmpXY_depart = caseDepart;
	var tmpDep = gameboard.getCell(tmpXY_depart);
	var soldier = tmpDep.element;
	tmpDep.element = null;
	gameboard.actualizeCell(gameboard.getCell(tmpXY_depart), tmpDep);
	
	var tmpXY_arrivee = caseArrivee;
	var tmpArr = gameboard.getCell(tmpXY_arrivee);
	tmpArr.element = soldier;
	gameboard.actualizeCell(gameboard.getCell(tmpXY_arrivee), tmpArr);
	update();
}

function update() {
    drawBoard();
}

function render() {

}




/*
* main
*/
var gameboard = new GameBoard();
var team1 = new Team("Equipe1");
var team2 = new Team("Equipe2");
var player1 = new Player("Joueur_1", "Joueur2_MDP", "Joueur1_Mail");
var player2 = new Player("Joueur_2", "Joueur2_MDP", "Joueur2_Mail");
team1.players.push(player1);
team2.players.push(player2);
gameboard.addTeam(team1);
gameboard.addTeam(team2);
gameboard.initTeams();

initialize();
//initializeSoldiers();

update();
render();

