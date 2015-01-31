// ==UserScript==

// @name          Stream4k Nachrichten Ton

// @description   Damit verpasst man keine PM.

// @include       http://forum.stream4k.net/*

// @grant GM_xmlhttpRequest

// ==/UserScript==


var $ = unsafeWindow.jQuery;
var jwplayer = unsafeWindow.jwplayer;
var url = "";

var ajaxQueue = [];
var processAjaxQueue = function(){
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      // http://diveintogreasemonkey.org/api/gm_xmlhttprequest.html
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

//var i = 0;

function getpost() {
	//i = i + 1;
	//if (i == 20) {
	//	i = 0;
	//	location.reload();
	//}
	var pfad = "http://forum.stream4k.net/index.php?app=members&module=messaging&section=view&do=showFolder&folderID=new";
	gmAjax({
 		method: "GET",
 		url: (pfad),
  		onload: function(response) {
    			var infos = response.responseText;
				
				//messages = $(infos).find(".unread");
				messages = $(infos).find("#inbox_link .ipsHasNotifications").html();
				newmsgcnt = $("#inbox_link .ipsHasNotifications").html();
				if (messages == null) messages = 0;
				if (messages > newmsgcnt){
					playalert(messages);
		
				}
  		}
	});
	
}

//document.onkeydown = function(event) {
//	i = 0;
//}
//$( "body" ).click(function() {
//	i = 0;
//});

//$( "body" ).scroll(function() {
//	i = 0;
//});

var sound = "<audio id=\"stsound\"><source src=\"http://eydu.hol.es/sms_synth2.mp3\" type=\"audio\/mpeg\"><\/audio>"
var title = document.title;
$("body").append(sound);

var newmsgcnt = $("#inbox_link .ipsHasNotifications").html();
if (newmsgcnt == null){
	newmsgcnt = 0;
}else{
	//$("#stsound").get(0).play();
}

setInterval(function() {getpost();}, 5000);








