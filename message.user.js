// ==UserScript==

// @name          Stream4k Nachrichten Ton

// @description   Damit verpasst man keine PM.

// @include       http://forum.stream4k.net/*

// @grant GM_xmlhttpRequest

// ==/UserScript==


var $ = unsafeWindow.jQuery;

var ajaxQueue = [];
var processAjaxQueue = function(){
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      GM_xmlhttpRequest(obj);
    }
    ajaxQueue = [];
  }
}

setInterval(function(){
  processAjaxQueue();
}, 100);
 
function gmAjax(obj){
  ajaxQueue.push(obj);
}



function playalert(messages){
	document.title = "["+ messages+"] Neue Nachrichten - " + title;
	$("#stsound").get(0).play();
	$("#inbox_link").append("<span class=\"ipsHasNotifications\">"+messages+"</span>");
}

$( "#inbox_link" ).click(function() {
	document.title = title;
});

function getpost() {
	var pfad = "http://forum.stream4k.net/index.php?app=members&module=messaging&section=view&do=showFolder&folderID=new";
	gmAjax({
 		method: "GET",
 		url: (pfad),
  		onload: function(response) {
    			var infos = response.responseText;
				messages = $(infos).find("#inbox_link .ipsHasNotifications").html();
				newmsgcnt = $("#inbox_link .ipsHasNotifications").html();
				if (messages == null) messages = 0;
				if (messages > newmsgcnt){
					playalert(messages);
				}
  		}
	});	
}

var sound = "<audio id=\"stsound\"><source src=\"http://eydu.hol.es/sms_synth2.mp3\" type=\"audio\/mpeg\"><\/audio>"
$("body").append(sound);

var title = document.title;

var newmsgcnt = $("#inbox_link .ipsHasNotifications").html();
if (newmsgcnt == null){
	newmsgcnt = 0;
}else{
}

setInterval(function(){
	getpost();
}, 5000);








