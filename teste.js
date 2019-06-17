QUnit.test("Bibliotecas OK", function(assert){
    var hasJQuery = window.JQuery ? true : false;

    assert.ok(hasJQuery, "Jquery OK");
});
module("functional testing");

test("Inputs OK",function(){
 expect(2);

 ok(document.getElementById("book-name").innerHTML!=undefined, "Campo de inserção OK");
 ok(document.getElementById("book-srch").innerHTML!=undefined,"Botão de pesquisa OK");

});

QUnit.test( "Constructor", function( assert ) {
	var v1 = $( "form-control" ).validate(),
		v2 = $( "form-control" ).validate();

	assert.equal( v1, v2, "Calling validate() multiple times must return the same validator instance" );
	assert.equal( v1.elements().length, 3, "validator elements" );
} );