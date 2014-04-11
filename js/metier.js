function Cell( P_coordonnee, P_element ) 
{ 
	this.coordonnee = P_coordonnee;
	
	if( P_element )
	{
		this.element = P_element;
	}
	else
	{
		this.element = null;
	}
	
	this.hasArmor = false;
	this.hasCollision = false;
	
	this.getCoordonnee = function()
							{ return this.coordonnee; };

	this.setCoordonnee = function( P_coordonnee )
							{ this.coordonnee = P_coordonnee; };

	this.getElement = function()
							{ return this.element; };
							
	this.setElement = function( P_element )
							{ this.element = P_element; };
							
	this.getHasArmor = function()
							{ return this.hasArmor; };

	this.setHasArmor = function( P_hasArmor )
							{ this.hasArmor = P_hasArmor; };

	this.getHasCollision = function()
							{ return this.hasCollision; };

	this.setHasCollision = function( P_hasCollision )
							{ this.hasCollision = P_hasCollision; };
							
	this.getTextCoordinate = function()
							{ return this.coordonnee.x.toString() + "," + this.coordonnee.y.toString(); };
}

function Soldier()
{
	this.isMovable;
	this.hasArmor = false;
	
	this.move = function( caseDepart, caseArrivee )
	{
		caseDepart.element = null;
		caseArrivee.element = this;
		
		if(caseArrivee.getHasArmor())
		{
			caseArrivee.setHasArmor(false);
			this.setHasArmor(true);
		}
	}
	
	this.getType = function()
	{
		return "Soldier";
	}
}


function Laurel()
{
	this.isClickableForDeparture = false;
	this.isSemiTransparent = true;
	
	this.move = function( caseDepart, caseArrivee )
{
	caseDepart.setElement(null);
	caseArrivee.setElement(this);
}
	this.getType = function()
{
	return "Laurel";
}
}

var Team = (function () {
	// Constructor
	function Team(name) {
		this.name = name
		this.players = new Array();
	}
	return Team;
})();

function MovementSoldier( P_dep, P_arr, P_legion )
{
	this.dep = P_dep;
	this.arr = P_arr;
	this.legion = P_legion;
	
	this.getDepart = function()
	{ return this.dep; };

	this.setDepart = function( P_dep )
	{ this.dep = P_dep; };
	
	this.getArrivee = function()
	{ return this.arr; };

	this.setArrivee = function( P_arr )
	{ this.arr = P_arr; };
	
	this.getLegion = function()
	{ return this.legion; };

	this.setLegion = function( P_legion )
	{ this.legion = P_legion; };
}

function MovementLaurel( P_dep, P_arr, P_legion )
{
	this.dep = P_dep;
	this.arr = P_arr;
	this.legion = P_legion;
	
	this.getDepart = function()
	{ return this.dep; };

	this.setDepart = function( P_dep )
	{ this.dep = P_dep; };
	
	this.getArrivee = function()
	{ return this.arr; };

	this.setArrivee = function( P_arr )
	{ this.arr = P_arr; };
	
	this.getLegion = function()
	{ return this.legion; };

	this.setLegion = function( P_legion )
	{ this.legion = P_legion; };
}

function Movements()
{
	this.laurelMovements;
	this.soldierMovements;
	
	this.getLaurelMovements = function()
	{ return this.laurelMovements; };

	this.setLaurelMovements = function( P_laurelMovements )
	{ this.laurelMovements = P_laurelMovements; }

	this.addLaurelMovement = function( P_Movement )
	{ this.laurelMovements.push(P_Movement);}
	
	this.getSoldierMovements = function()
	{ return this.soldierMovements; };

	this.setSoldierMovements = function( P_soldierMovements )
	{ this.soldierMovements = P_soldierMovements; };
	
	this.addSoldierMovement = function( P_Movement )
	{ this.soldierMovements.push(P_Movement);};
}

var XY = (function () {
	// Constructor
	function XY(x, y) {
		this.x = x;
		this.y = y;
		this.z = 0;
	}
	return XY;
})();

var Line = (function () {
	function Line() {
		this.cells = new Array();
	}
	return Line;
})();

var Legion = (function () {
	// Constructor
	function Legion(color) {
		this.color = color;
		this.soldiers = new Array();
	}
	return Legion;
})();

var GameBoard = (function () {
	// Constructor
	function GameBoard() {
		this.CURRENT_TURN = 0;
		this.RBoard = 5;
		this.turns = new Movements();
		this.cells = new Array();
		this.teams = new Array();

		// Construction of the catalogue of lines
		var cell;
		var tmpLine;
		this.lines = new Array();
		
		// Create top diagonal lines from top-left to bottom-right and cells
		var l = 0;
		for (var y = -this.RBoard; y <= 0; y++)
		{
			tmpLine = new Line();
			
			for (var x = l; x <= this.RBoard; x++)
			{
				var xy = new XY(x, y);
				cell = new Cell(xy, null);
				//console.log("Cell("+x+";"+y+")");
				this.cells.push(cell);
				tmpLine.cells.push(cell);
			}
			l--;
			this.lines.push(tmpLine);
		}
		
		// Create bottom diagonal lines from top-left to bottom-right and cells
		l = 1;
		for (y = 1; y <= this.RBoard; y++)
		{
			for (x = -this.RBoard; x <= this.RBoard - l; x++)
			{
				var xy = new XY(x, y);
				cell = new Cell(xy, null);
				//console.log("Cell("+x+";"+y+")");
				this.cells.push(cell);
				tmpLine.cells.push(cell);
			}
			l++;
			this.lines.push(tmpLine);
		}
		
		// Create left straight lines from top to bottom
		l = 0;
		var nomberCell;
		for (x = -this.RBoard; x <= 0; x++)
		{
			tmpLine = new Line();
			
			for (y = l; y <= this.RBoard; y++)
			{
				cell = this.getCell(new XY(x, y));
				tmpLine.cells.push(cell);
			}
			this.lines.push(tmpLine);
			l--;
		}
		
		// Create right straight lines from top to bottom
		l = 1;
		for (x = 1; x <= this.RBoard; x++)
		{
			tmpLine = new Line();
			
			for (y = -this.RBoard; y <= this.RBoard - l; y++)
			{
				cell = this.getCell(new XY(x, y));
				tmpLine.cells.push(cell);
			}
			this.lines.push(tmpLine);
			l++;
		}
		
		// Create top diagonal lines from bottom-left to top-right
		for (var i = 0; i <= this.RBoard; i++)
		{
			tmpLine = new Line();
			x = -this.RBoard;
			y = i;
			
			for (var j = 0; j <= this.RBoard + i; j++)
			{
				cell = this.getCell(new XY(x, y));
				tmpLine.cells.push(cell);
				x++;
				y--;
			}
			this.lines.push(tmpLine);
		}
		
		// Create bottom diagonal lines from bottom-left to bottom-right
		for (i = this.RBoard; i > 0; i--)
		{
			tmpLine = new Line();
			x = -i + 1
			y = this.RBoard;
			
			for (j = 0; j < this.RBoard + i; j++)
			{
				cell = this.getCell(new XY(x, y));
				tmpLine.cells.push(cell);
				x++;
				y--;
			}
			this.lines.push(tmpLine);
		}
		
	}
	
	// Go to next turn
	GameBoard.prototype.nextTurn = function () {
		this.CURRENT_TURN++;
	};

	GameBoard.prototype.getLines = function (cell) {
		var associatedLines = new Array();
		var k = 0;
		for (var i = 0; i < this.lines.length; i++) {
			for (var j = 0; j < this.lines[i].cells.length; j++) {
				if (this.lines[i].cells[j] == cell) {
					associatedLines[k] = this.lines[i];
					k++;
				}
			}
		}
		return associatedLines;
	};
	
	GameBoard.prototype.getCell = function(xy) {
	//console.log(this.cells.length);
		for (var i = 0; i < this.cells.length; i++) {
			//console.log("Turn " + i);
			//console.log("(" + this.cells[i].coordonnee.x.toString() + ";" + this.cells[i].coordonnee.y.toString() + ") AND (" + xy.x.toString() + ";" + xy.y.toString() + ")");
			if (this.cells[i].coordonnee.x == xy.x && this.cells[i].coordonnee.y == xy.y)
			{
				return this.cells[i];
			}
		}
	}
	
	GameBoard.prototype.getTeamOfSoldier = function (soldier) {
		for (var i = 0; i < this.teams.length; i++)
		{
			for (var j = 0; j < this.teams[i].players.length; j++)
			{
				for (var k = 0; k < this.teams[i].players[j].legions.length; k++)
				{
					for (var l = 0; l < this.teams[i].players[j].legions[k].soldiers.length; l++)
					{
						if (this.teams[i].players[j].legions[k].soldiers[l] == soldier)
						{
							return this.teams[i];
						}
					}
				}
			}
		}
	}
	
	GameBoard.prototype.getPlayerOfSoldier = function (soldier) {
		for (var i = 0; i < this.teams.length; i++)
		{
			for (var j = 0; j < this.teams[i].players.length; j++)
			{
				for (var k = 0; k < this.teams[i].players[j].legions.length; k++)
				{
					for (var l = 0; l < this.teams[i].players[j].legions[k].soldiers.length; l++)
					{
						if (this.teams[i].players[j].legions[k].soldiers[l] == soldier)
						{
							return this.teams[i].players[j];
						}
					}
				}
			}
		}
	}
	
	GameBoard.prototype.getLegionOfSoldier = function (soldier) {
		for (var i = 0; i < this.teams.length; i++)
		{
			for (var j = 0; j < this.teams[i].players.length; j++)
			{
				for (var k = 0; k < this.teams[i].players[j].legions.length; k++)
				{
					for (var l = 0; l < this.teams[i].players[j].legions[k].soldiers.length; l++)
					{
						if (this.teams[i].players[j].legions[k].soldiers[l] == soldier)
						{
							return this.teams[i].players[j].legions[k];
						}
					}
				}
			}
		}
	}
	
	GameBoard.prototype.actualizeCell = function (exCell, newCell) {
		for (var i = 0; i < this.lines.length; i++) {
			for (var j = 0; j < this.lines[i].cells.length; j++) {
				if (this.lines[i].cells[j] == exCell) {
					this.lines[i].cells[j] = newCell;
				}
			}
		}
		for (var i = 0; i < this.cells.length; i++) {
			if (this.cells[i] == exCell)
			{
				this.cells[i] = newCell;
			}
		}
	}
	
	GameBoard.prototype.addTeams = function(listTeam) {
		for (var i = 0; i < teams.length; i++)
		{
			this.teams.push(listTeam[i]);
		}
		
		this.addLegions();
	}
	
	GameBoard.prototype.addTeam = function(team) {
		this.teams.push(team);
	}
	
	GameBoard.prototype.addSoldier = function(xy, legion)
	{
		var soldier = new Soldier();
		var tmpCell = gameboard.getCell(xy);
		
		// Add Soldier in Cell
		tmpCell.setElement(soldier);
		
		// Update Cell
		gameboard.actualizeCell(gameboard.getCell(xy), tmpCell);
		
		// Add Soldier in Legion
		legion.soldiers.push(soldier);
	}
	
	GameBoard.prototype.initTeams = function() {
		// Get Legions array
		legions = this.initLegions();
		
		if (this.teams[0].players.length == 1)
		{
			switch(this.teams.length)
			{
				case 2 :
					// 3 legions per player
					// Legions for Player 1 :
					this.teams[0].players[0].legions.push(legions[0]);
					this.teams[0].players[0].legions.push(legions[2]);
					this.teams[0].players[0].legions.push(legions[4]);
					// Legions for Player 2
					this.teams[1].players[0].legions.push(legions[1]);
					this.teams[1].players[0].legions.push(legions[3]);
					this.teams[1].players[0].legions.push(legions[5]);
					break;
				case 3 :
					// 2 legions per player
					// Legions for Player 1 :
					this.teams[0].players[0].legions.push(legions[0]);
					this.teams[0].players[0].legions.push(legions[3]);
					// Legions for Player 2
					this.teams[1].players[0].legions.push(legions[1]);
					this.teams[1].players[0].legions.push(legions[4]);
					// Legions for Player 3
					this.teams[2].players[0].legions.push(legions[2]);
					this.teams[2].players[0].legions.push(legions[5]);
					break;
				case 6 :
					// Legion for Player 1 :
					this.teams[0].players[0].legions.push(legions[0]);
					// Legion for Player 2
					this.teams[1].players[0].legions.push(legions[1]);
					// Legion for Player 3
					this.teams[2].players[0].legions.push(legions[2]);
					// Legion for Player 4
					this.teams[3].players[0].legions.push(legions[3]);
					// Legion for Player 5
					this.teams[4].players[0].legions.push(legions[4]);
					// Legion for Player 6
					this.teams[5].players[0].legions.push(legions[5]);
					break;
				default :
					// DO NOTHING
			}
		}
		else if (this.teams[0].players.length == 2)
		{
			// Team 1
			// Legions for Player 1 :
			this.teams[0].players[0].legions.push(legions[0]);
			// Legions for Player 2 :
			this.teams[0].players[1].legions.push(legions[3]);
			// Team 2
			// Legions for Player 3 :
			this.teams[1].players[2].legions.push(legions[1]);
			// Legions for Player 4 :
			this.teams[1].players[3].legions.push(legions[4]);
			// Team 3
			// Legions for Player 5 :
			this.teams[0].players[4].legions.push(legions[2]);
			// Legions for Player 6 :
			this.teams[0].players[5].legions.push(legions[5]);
		}
		else if (this.teams[0].players.length == 3)
		{
			// Team 1
			// Legions for Player 1 :
			this.teams[0].players[0].legions.push(legions[0]);
			this.teams[0].players[2].legions.push(legions[2]);
			this.teams[0].players[4].legions.push(legions[4]);
			// Team 2
			this.teams[1].players[1].legions.push(legions[1]);
			this.teams[1].players[3].legions.push(legions[3]);
			this.teams[1].players[5].legions.push(legions[5]);
		}
		else
		{
			// DO NOTHING
		}
	}
	
	GameBoard.prototype.initLegions = function() {
		var toLeft, toRight, faceUp, x, y, legion, legions;
		legions = new Array();
		colors = ["#bbbbff", "#ff7777", "#bbbbff", "#ff7777", "#bbbbff", "#ff7777"];
		
		for (var i = 0; i < 6; i++)
		{
			legions.push(new Legion(colors[i]));
		}
		
		if(this.RBoard <= 3)
		{
		
		}
		else if(this.RBoard == 4)
		{

		}
		else if(this.RBoard == 5)
		{
			// Legion top
			gameboard.addSoldier(new XY(0, -5), legions[0]);
			gameboard.addSoldier(new XY(0, -4), legions[0]);
			gameboard.addSoldier(new XY(0, -3), legions[0]);
			gameboard.addSoldier(new XY(0, -2), legions[0]);
			gameboard.addSoldier(new XY(1, -5), legions[0]);
			gameboard.addSoldier(new XY(-1, -4), legions[0]);
			
			// Legion top-right
			gameboard.addSoldier(new XY(5, -5), legions[1]);
			gameboard.addSoldier(new XY(4, -4), legions[1]);
			gameboard.addSoldier(new XY(3, -3), legions[1]);
			gameboard.addSoldier(new XY(2, -2), legions[1]);
			gameboard.addSoldier(new XY(5, -4), legions[1]);
			gameboard.addSoldier(new XY(4, -5), legions[1]);
			
			// Legion bottom-right
			gameboard.addSoldier(new XY(5, 0), legions[2]);
			gameboard.addSoldier(new XY(4, 0), legions[2]);
			gameboard.addSoldier(new XY(3, 0), legions[2]);
			gameboard.addSoldier(new XY(2, 0), legions[2]);
			gameboard.addSoldier(new XY(5, -1), legions[2]);
			gameboard.addSoldier(new XY(4, 1), legions[2]);
			
			// Legion bottom
			gameboard.addSoldier(new XY(0, 5), legions[3]);
			gameboard.addSoldier(new XY(0, 4), legions[3]);
			gameboard.addSoldier(new XY(0, 3), legions[3]);
			gameboard.addSoldier(new XY(0, 2), legions[3]);
			gameboard.addSoldier(new XY(-1, 5), legions[3]);
			gameboard.addSoldier(new XY(1, 4), legions[3]);
			
			// Legion bottom-left
			gameboard.addSoldier(new XY(-5, 5), legions[4]);
			gameboard.addSoldier(new XY(-4, 4), legions[4]);
			gameboard.addSoldier(new XY(-3, 3), legions[4]);
			gameboard.addSoldier(new XY(-2, 2), legions[4]);
			gameboard.addSoldier(new XY(-5, 4), legions[4]);
			gameboard.addSoldier(new XY(-4, 5), legions[4]);
			
			// Legion top-left
			gameboard.addSoldier(new XY(-5, 0), legions[5]);
			gameboard.addSoldier(new XY(-4, 0), legions[5]);
			gameboard.addSoldier(new XY(-3, 0), legions[5]);
			gameboard.addSoldier(new XY(-2, 0), legions[5]);
			gameboard.addSoldier(new XY(-5, 1), legions[5]);
			gameboard.addSoldier(new XY(-4, -1), legions[5]);
		}
		else if(this.RBoard == 6)
		{
			
		}
		// Not finished
		else
		{
			for (i = 0; i < 6; i++)
			{
				switch (i)
				{
					case 0 :
						// Legion top
						x = 0;
						y = -this.RBoard;
						toLeft = new XY(0, 1);
						toRight = new XY(-1, 1);
						faceUp = new XY(0, 1);
						break;
					case 1 :
						// Legion top-right
						x = this.RBoard;
						y = -this.RBoard;
						toLeft = new XY(1, 0);
						toRight = new XY(-1, 0);
						faceUp = new XY(-1, 1);
						break;
					case 2 :
						// Legion bottom-right
						x = this.RBoard;
						y = 0;
						toLeft = new XY(-1, 1);
						toRight = new XY(0, -1);
						faceUp = new XY(-1, 0);
						break;
					case 3 :
						// Legion bottom
						x = 0;
						y = this.RBoard;
						toLeft = new XY(-1, 0);
						toRight = new XY(1, -1);
						faceUp = new XY(0, -1);
						break;
					case 4 :
						// Legion bottom-right
						x = -this.RBoard;
						y = this.RBoard;
						toLeft = new XY(0, -1);
						toRight = new XY(1, 0);
						faceUp = new XY(1, -1);
						break;
					case 5 :
						// Legion top-right
						x = -this.RBoard;
						y = 0;
						toLeft = new XY(1, -1);
						toRight = new XY(0, 1);
						faceUp = new XY(1, 0);
						break;
					default :
						// Do nothing
						legion = new Legion("#ffffff");
				}
				legions.push(legion);
			}
		}
		
		return legions;
	}
	
	return GameBoard;
})();

var Player = (function () {
	// Constructor
	function Player(login, password, email) {
		this.login = login;
		this.password = password;
		this.email = email;
		this.legions = new Array();
	}
	return Player;
})();