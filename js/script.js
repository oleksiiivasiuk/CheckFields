
var ValidationModel = Backbone.Model.extend({
	defaults: function(){
		return{
			userName: "",
			userLogin: "",
			categoriesCount: 0,
			resultOfValidation: ""
		}
	},

	validate:function(attr){
		var PATTERN_USERNAME = /^[A-Z][a-zA-Z]*$/;
		var PATTERN_USERLOGIN = /^[A-Za-z0-9_]*$/;
		if ((attr.userName.search(PATTERN_USERNAME) == -1) || (attr.userName.length <= 1)) {
			this.set('resultOfValidation', "Wrong user name. ");
		}
		if ((attr.userLogin.search(PATTERN_USERLOGIN) == -1) || (attr.userLogin.length <= 1)) {
			this.set('resultOfValidation', this.get('resultOfValidation')+"Wrong user login. ");
		}

	}

});

var ValidationView = Backbone.View.extend({
	el: $('#messageFromScript'),
	template: _.template($('#resultField').html()),
	initialize:function(){
		$("#check").on('click',$.proxy(this.setData,this))
	},
	setData:function(){
		this.model.set('resultOfValidation',"");
		this.model.set({'userName': $('#userName').val()});
		this.model.set({'userLogin': $('#userLogin').val()},{validate:true});

		var categoriesCollection = $('.categories');
		for(var elementIndex = 0, countOfElements = categoriesCollection.length; elementIndex<countOfElements; elementIndex++){
			if(categoriesCollection[elementIndex].checked){
				this.model.set('categoriesCount', this.model.get('categoriesCount')+1);
			}
		}
		if(this.model.get('categoriesCount') > 5){
			this.model.set('resultOfValidation', this.model.get('resultOfValidation')+"Wrong categories count.");
		}
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});

var validation = new ValidationView({model: new ValidationModel});