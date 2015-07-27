$(document).ready(function(){
	setupQuiz(createQuiz());
	$(".choice").click(selectAnswer);
});

function selectAnswer(){
	var selectedItem = $(this);
		//check answer
		if(selectedItem.index() === questions.question.answer){

		}
		else
		{

		}
		//move to next question
		setupQuiz(questions.next());
}

function setupQuiz(quiz){
	var choiceList = $("#choices");
	$("#question").text(quiz.question);
	$(quiz.choices).each(function(index, choice){
		var listItem = $("<li>" + choice + "</li>").click(selectAnswer);
		choiceList.append(listItem);
	});
}

function createQuiz(){
	var currentIndex = 0,
		question = function(){
			var questionArr = [new Question("Who was the first person to journey into outer space?", 1, ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"]),
						new Question("What is the point thought to represent the center of a black hole?",3, ["Origin", "Centrality", "Core", "Singularity"]),
						new Question("What are the densest types of stars known as?",0, ["Neutron Stars", "Dwarf Stars", "Blue Giant", "Double Stars"]),
						new Question("Which of the following is the name for a massive steller explosion?", 2, "Pulsar", "Gamma-Ray Burst", "Supernova", "Aurora"),
						new Question("What object is believed to be at the center of the Milky Way galaxy?", 0, ["A Black Hole", "The Sun", "Earth", "Kuiper Belt"])];
			currentIndex++
			return questionArr[currentIndex - 1];
		}

	return question();
}

function slideBehavior(){
	$("#question").hide().show('slide', {direction: 'right'}, 1000);
	$("#choices").find(".choice").each(function(index,item){
		$(item).hide().delay(100*index).show('slide', {direction: 'right'}, 1000)
	});
}

function Question(question, answer, choices){
	this.question = question;
	this.choices = choices
	this.answer = answer;
};