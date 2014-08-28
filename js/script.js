//var lettersRegex = /^[A-Za-z]+$/; 
var ValidationModel = Backbone.Model.extend({
	defaults: function(){
		return{
			userName: "",
			userLogin: "",
			categoriesCount: 0,
			resultOfValidation: ""
		}
	},
	clear: function(){
		this.set({userName: "",userLogin: "", categoriesCount: 0, resultOfValidation: ""});
	},
	checkUserName: function(){
		//console.log(this.get('userName'));
		if(this.get('userName').length >= 1){
			console.log(this.get('userName').charAt(0));
			if( !(this.get('userName').charAt(0).match("/^[A-Z]$/"))){
				return "Wrong user name";
			}
			if(this.get('userName').match("/\s+/")){
				return "Wrong user name";
			}
			return "";
		}
		else{ return "Wrong user name";}
	},
	checkUserLogin: function(){
		if(this.get('userLogin').length >= 1){
			if(this.get('userLogin').match("/\s+/")){
				return "Wrong user login";
			}
			return "";
		}
		else {return "Wrong user login";}
	},
	checkCategoriesCount: function(){
		//console.log(this.get('categoriesCount'));
		if(this.get('categoriesCount') > 5){
			return "Wrong count of categories";
		}
		else return "";
	}
});

var ValidationView = Backbone.View.extend({
	el: $('#messageFromScript'),
	template: _.template($('#resultField').html()),

	render: function(){
		this.model.clear();
		var categoriesCollection = $('.categories');
		for(var elementIndex = 0, countOfElements = categoriesCollection.length; elementIndex<countOfElements; elementIndex++){
			if(categoriesCollection[elementIndex].checked){
				this.model.set('categoriesCount', this.model.get('categoriesCount')+1);
			}
		}
		this.model.set('userName', $('#userName').val());
		this.model.set('userLogin', $('#userLogin').val());
		console.log(this.model.get('categoriesCount'));
		//console.log(this.model.get('userName'));
		//console.log(this.model.get('userLogin'));
		this.model.set('resultOfValidation', this.model.checkUserName() +" "+this.model.checkUserLogin()+" "+this.model.checkCategoriesCount());

		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var validation = new ValidationView({model: new ValidationModel});