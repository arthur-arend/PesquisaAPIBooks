QUnit.test("Bibliotecas", function(assert){
    var hasJQuery = window.JQuery ? true : false;

    assert.ok(hasJQuery, "Biblioteca Carregada");
    assert.notOk(hasJQuery, "Falha ao carregar");
})