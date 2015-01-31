/**
 * Created by tienl_000 on 29/01/15.
 */
services.factory('someFactory', function (x2js) {
    var xmlDoc = x2js.json2xml(
        {
            MyRoot : {
                MyChild : 'my_child_value',
                MyAnotherChild: 10,
                MyArray : [ 'test', 'test2' ],
                MyArrayRecords : [
                    {
                        ttt : 'vvvv'
                    },
                    {
                        ttt : 'vvvv2'
                    }
                ]
            }
        }
    );
    return xmlDoc;
});