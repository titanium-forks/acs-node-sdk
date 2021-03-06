var colors = require('colors');
if (!process.env.ACS_APPKEY) {
	console.error('Please create an ACS app and set environment vars for ACS_APPKEY'.red);
	process.exit(1);
}

var ACSNode = require('../lib/acs');

console.log('Creating ACS app instance...'.cyan);
var acsApp = new ACSNode(process.env.ACS_APPKEY);
console.log('Created: '.cyan + '%j', acsApp);

var acsObjectList = acsApp.getACSObjects().objectList;
console.log('Get all supported objects: acsApp.getACSObjects().objectList'.cyan);
console.log(acsObjectList);
for (var acsObjectIndex in acsObjectList) {
	var acsObjectName = acsObjectList[acsObjectIndex];
	console.log('Get all methods in objects %s: acsApp.getACSObjects().%s.methodList'.cyan, acsObjectName, acsObjectName);
	console.log(acsApp.getACSObjects()[acsObjectName].methodList);
}

console.log('User logging in...'.cyan);
acsApp.usersLogin({
	login: 'test@cocoa.com',
	password: 'food'
}, function(err, result) {
	if (err) {
		console.error(err);
		return;
	}
	console.log('User login request finished: '.cyan + '%j', result.body);
	console.log('Counting users via generic way acsApp.get() instead of acsApp.usersCount()...'.cyan);
	var user1_id = '544f958ddda0951c57000007';
	createChat(user1_id, function(err, result) {
		if (err) {
			console.error(err);
			return;
		}
		console.log('Chat create request finished: '.cyan + '%j', result.body);
		//            var chat_id = result.body['response']['chats'][0].id

		acsApp.chatsGetChatGroups({
			participate_ids: '544f958ddda0951c57000227'
		}, function(err, result) {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Get chat groups request finished: '.cyan + '%j', result.body);
		});


		//        acsApp.chatsQuery({participate_ids: user1_id},function(err, result){
		//            if (err) {
		//                console.error(err);
		//                return;
		//            }
		//            console.log('Chat query request finished: '.cyan + '%j', result.body);
		//        });


		//            acsApp.chatsQueryChatGroups({order: "updated_at"},function(err, result){
		//                if (err) {
		//                    console.error(err);
		//                    return;
		//                }
		//                console.log('Chat query groups request finished: '.cyan + '%j', result.body);
		//            });


		//            deleteChat(chat_id, function(err, result){
		//                if (err) {
		//                    console.error(err);
		//                    return;
		//                }
		//                console.log('Chat deleted request finished: '.cyan + '%j', result.body);
		//            });
	});

});

function createChat(to_ids, callback) {
	acsApp.chatsCreate({
		to_ids: to_ids,
		message: "test"
	}, callback);
}

function deleteChat(chat_id, callback) {
	acsApp.chatsDelete({
		chat_id: chat_id
	}, callback);
}

function getChatGroups(query, callback) {
	acsApp.chatsGetChatGroups(query, callback);
}
//544f958ddda0951c57000007  test1
