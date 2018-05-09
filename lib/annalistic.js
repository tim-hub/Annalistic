"use strict";

var dappAddress = 'n1wK9pdeSbTM47S2xywrndU5pGoko2AW3hC';

var nebulas = require("nebulas"),
    Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));


//to check if the extension is installed
//if the extension is installed, var "webExtensionWallet" will be injected in to web page
if(typeof(webExtensionWallet) === "undefined"){
    alert ("https://github.com/ChengOrangeJu/WebExtensionWallet  is not installed, please install it first.")
}

function getAll(){


    var from = Account.NewAccount().getAddressString();

    var value = "0";
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var callFunction = "getAll";
    var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
    var contract = {
        "function": callFunction
        // "args": callArgs
    }

    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
        cbSearch(resp)
    }).catch(function (err) {
        //cbSearch(err)
        console.log("error:" + err.message)
    })

}

// $("#search").click(getAll())

//return of search,
function cbSearch(resp) {
    var result = resp.result    ////resp is an object, resp.result is a JSON string
    console.log("return of rpc call: " + JSON.stringify(result))

    if (result === 'null'){
        $(".add_banner").addClass("hide");
        $(".result_success").addClass("hide");

        $("#result_faile_add").text($("#search_value").val())

        $(".result_faile").removeClass("hide");
    } else{
        result = result.substring(1, result.length - 1);

        var results = new Array();
        results = result.split(",");
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            console.log($("#card-list"));
            $(".card-list").append('<div class="card">'+results[i]+'</div>');
        }
    }

}

var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();
var serialNumber

$("#add").click(function() {
    var newInput;
    newInput = ($("#history-input").val());

    append(newInput);
    console.log(newInput);
})


function append(input) {

    var to = dappAddress;
    var value = "0";
    var callFunction = "append"
    var callArgs = "[\"" + input +  "\"]"

    serialNumber = nebPay.call(to, value, callFunction, callArgs, {
        listener: cbPush
    });
}


function cbPush(resp) {
    console.log("response of push: " + JSON.stringify(resp))
}
