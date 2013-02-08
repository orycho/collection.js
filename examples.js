/*
Copyright (C) 2012 Ory Chowaw-Liebman

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in the 
Software without restriction, including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the 
following conditions:

The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

//////////////////////////////////////////////////////
// List examples

var l1=new List();

function print(value)
{
	console.log("Value: " + value.toString());
};

l1.forEach(print);
l1.pushBack(1);
l1.pushBack(2);
l1.pushBack(3);
l1.pushBack(4);
l1.pushBack(5);
l1.pushFront(6);
l1.pushFront(7);
l1.pushFront(8);
l1.pushFront(9);
l1.pushFront(10);
var node=l1.first().next.next.next.next;
l1.forEach(print);
console.log("\nNode: "+node.value.toString()+"\n");
l1.insert(20,node);
l1.remove(node);
l1.forEach(print);
l1.sort(function(a,b) { return a>b; });
console.log("Sorted:");
l1.forEach(print);

//////////////////////////////////////////////////////
// Internal SearchTree examples


var tree=new SearchTree(function(a,b) { return a<b; });

tree.insert(38);
tree.insert(14);
tree.insert(22);
tree.insert(91);
tree.insert(56);

console.log("Find 14: " + tree.find(14).toString());
console.log("Min: " + tree.minimum().toString());
console.log("Max: " + tree.maximum().toString());

tree.forEach(function(value) { console.log("Value: "+value.toString()); });
console.log("Remove 2...");
tree.remove(2);
tree.forEach(function(value) { console.log("Value: "+value.toString()); });

//////////////////////////////////////////////////////
// Set Examples

var set=new Set(function(a,b) { return a<b; });
set.insert(38);
set.insert(14);
set.insert(22);
set.insert(91);
set.insert(56);

console.log("Find 14: " + set.find(14).toString());
console.log("Min: " + set.minimum().toString());
console.log("Max: " + set.maximum().toString());

set.forEach(function(value) { console.log("Value: "+value.toString()); });
console.log("Remove 2...");
set.remove(2);
set.forEach(function(value) { console.log("Value: "+value.toString()); });

//////////////////////////////////////////////////////
// Map Examples

var map=new Map(function(a,b) { return a<b; });
map.insert(38,"thirty eight");
map.insert(14,"fourteen");
map.insert(22,"twenty two");
map.insert(91,"ninety one");
map.insert(56,"fifty six");

console.log("Find 14: " + map.find(14).toString());
console.log("Min: " + map.minimum().toString());
console.log("Max: " + map.maximum().toString());

map.forEach(function(value) { console.log("Value: "+value.toString()); });
console.log("Remove 2...");
map.remove(2);
map.forEach(function(value) { console.log("Value: "+value.toString()); });
var keys=map.keys();
keys.forEach(function(value) { console.log("Key: "+value.toString()); });

var values=map.values();
values.forEach(function(value) { console.log("Key: "+value.toString()); });
