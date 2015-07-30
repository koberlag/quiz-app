
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
		displayQuestion(getQuestion());
		$("#final-score-container").hide();
		$("#quiz-container").hide().fadeIn();
		$("#restart-button").click(this.initialize);
		$("#score").text(scoreCount + " of " + questionCount + " correct");

	};

	function getQuestion (index){
		questionIndex = index || 0;
		return questions[questionIndex];
	}

	function displayQuestion(oQuestion){
	    var choiceList = $("#choices").empty();
	    if (oQuestion != null) {
	        $("#question").text(oQuestion.question);
	        $(oQuestion.choices).each(function (index, choice) {
	            var listItem = $("<li>" + choice + "</li>").addClass("choice").click(selectAnswer);
	            choiceList.append(listItem);
	        });
	    }
	    setupQuestionAnimation();
	}

	function setupQuestionAnimation(){
		$("#question").hide().fadeIn();
		$("#choices").find(".choice").each(function(index,item){
			$(item).hide().delay(100*index).fadeIn();
		});
	}

	function selectAnswer(){
		var oCurrentQuestion = getQuestion(questionIndex),
			oNextQuestion = getQuestion(++questionIndex),
			checkIcon = $('<i class="fa fa-check"></i>'),
			timesIcon = $('<i class="fa fa-times"></i>');
		
		//check answer
		if($(this).index() === oCurrentQuestion.answer){
		    //increase score
		    $("#score").text(++scoreCount + " of " + questionCount + " correct");
			//show indicator
			showIndicator(checkIcon);
		}
		else{
			//show indicator
			showIndicator(timesIcon);
		}
		if(questionIndex >= questionCount){
			//quiz completed
			showFinalScore();
		}
		else{
			//setup next question
			displayQuestion(oNextQuestion);
		}
	}

	function showIndicator(icon) {
	   icon.animate({
	            opacity : 0, 
	            fontSize: 1000
	        }, 
	        1000, 
	        function() { icon.remove() });
		$("#score").append(icon);
	}

	function showFinalScore(){
	    $("#final-score").text("You got " + scoreCount + " out of " + questionCount + "!");
	    $("#quiz-container").hide();
	    $("#final-score-container").show();
	}

	function Question(question, choices, answer){
		this.question = question;
		this.choices = choices;
		this.answer = answer;
	}
};