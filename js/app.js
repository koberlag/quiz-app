$(document).ready(function(){
	setupQuiz(getQuestion());
	$(".choice").click(selectAnswer);
});

var selectAnswer = (function(){
	var currentIndex = 0;
	return function(){
			var oCurrentQuestion = getQuestion(currentIndex),
				oNextQuestion = getQuestion(++currentIndex);
			
			//check answer
			if($(this).index() === oCurrentQuestion.getAnswer()){
				//increase score
				//Show indicator
			}
			else{
				//show indicator
			}
			setupQuiz(oNextQuestion);
		};
}());

var getQuestion = (function (index){
	var questions = [new Question("Who was the first person to journey into outer space?", ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"], 1),
					 new Question("What is the point thought to represent the center of a black hole?", ["Origin", "Centrality", "Core", "Singularity"], 3),
					 new Question("What are the densest types of stars known as?", ["Neutron Stars", "Dwarf Stars", "Blue Giant", "Double Stars"], 0),
					 new Question("Which of the following is the name for a massive steller explosion?", ["Pulsar", "Gamma-Ray Burst", "Supernova", "Aurora"], 2),
					 new Question("What object is believed to be at the center of the Milky Way galaxy?", ["A Black Hole", "The Sun", "Earth", "Kuiper Belt"], 0)];
		return function(index){
			index = index || 0;
			return questions[index];
		};
}());

function setupQuiz(oQuestion){
	var choiceList = $("#choices").empty();
	$("#question").text(oQuestion.question);
	$(oQuestion.choices).each(function(index, choice){
		var listItem = $("<li>" + choice + "</li>").click(selectAnswer);
		choiceList.append(listItem);
	});
}

function slideBehavior(){
	$("#question").hide().show('slide', {direction: 'right'}, 1000);
	$("#choices").find(".choice").each(function(index,item){
		$(item).hide().delay(100*index).show('slide', {direction: 'right'}, 1000)
	});
}

function Question(question, choices, answer){
	this.question = question;
	this.choices = choices;
	this.getAnswer = function(){
		return answer;
	};
};