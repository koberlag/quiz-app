
$(document).ready(function () {
	quiz.initialize();
});

var quiz = new function Quiz(){
	var questions= [new Question("Who was the first person to journey into outer space?", ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"], 1),
				    new Question("What is the name of the point that represents the center of a black hole?", ["Origin", "Centrality", "Core", "Singularity"], 3),
				    new Question("Which stars have the highest density?", ["Neutron Stars", "Dwarf Stars", "Blue Giant", "Double Stars"], 0),
				    new Question("Which of the following is the name for a massive steller explosion?", ["Pulsar", "Gamma-Ray Burst", "Supernova", "Aurora"], 2),
				    new Question("What object is believed to be at the center of the Milky Way galaxy?", ["A Black Hole", "The Sun", "Earth", "Kuiper Belt"], 0)],
		questionIndex = 0,
		questionCount = questions.length;
		scoreCount = 0;

	this.initialize = function(){
		scoreCount = 0;
		setupQuestion(getQuestion());
		$("#final-score-container").hide();
		$("#quiz-container").hide().fadeIn();
		$("#restart-button").click(this.initialize);
		$("#score").text(scoreCount + " of " + questionCount + " correct");

	};

	function getQuestion (index){
		questionIndex = index || 0;
		return questions[questionIndex];
	}

	function setupQuestion(oQuestion){
	    var choiceList = $("#choices").empty();
	    if (oQuestion != null) {
	        $("#question").text(oQuestion.question);
	        $(oQuestion.choices).each(function (index, choice) {
	            var listItem = $("<li>" + choice + "</li>").addClass("choice").click(selectAnswer);
	            choiceList.append(listItem);
	        });
	    }
	    else {
	       
	    }
	    setupAnimation();
	}

	function selectAnswer(){
		var oCurrentQuestion = getQuestion(questionIndex),
			oNextQuestion = getQuestion(++questionIndex);
		
		//check answer
		if($(this).index() === oCurrentQuestion.answer){
		    //increase score
		    $("#score").text(++scoreCount + " of " + questionCount + " correct");
			//Show indicator
			
		}
		else{
			//show indicator
		}
		if(questionIndex >= questionCount){
			//Quiz completed
			showFinalScore();
		}
		else{
			//setup next question
			setupQuestion(oNextQuestion);
		}
	}

	function Question(question, choices, answer){
		this.question = question;
		this.choices = choices;
		this.answer = answer;
	}
};


function showFinalScore(){
	var finalScoreDiv = $("#final-score");
        finalScoreDiv.text("You got " + $("#score").text() + "!");
        $("#quiz-container").hide();
        $("#final-score-container").show();
}

function setupAnimation(){
	$("#question").hide().fadeIn();
	$("#choices").find(".choice").each(function(index,item){
		$(item).hide().delay(100*index).fadeIn();
	});
}



