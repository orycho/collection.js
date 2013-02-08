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

/////////////////////////////////////////
// List

/// Internal constructor for list nodes.
List.prototype.Node=function Node(value)
{
	this.prev=this;
	this.next=this;
	this.value=value;
	this.isFirst=function first() { return this.prev==this; };
	this.isLast=function last() { return this.next==this.next.next; };
};
// Returns the first item in the list.
List.prototype.first=function first() { return this.head; };
/// returns the last (real) tem in the list.
List.prototype.last=function last() { return this.end.prev; };
/// Insert a new value in before the node passed.
List.prototype.insert=function insert(value,node)
{
	var nv=new this.Node(value);
	if (node==this.head)
	{
		this.head=nv;
		nv.next=node;
		node.prev=nv;
	}
	else
	{
		node.prev.next=nv;
		nv.prev=node.prev;
		nv.next=node;
		node.prev=nv;
	}
};
/// Remove the node passed from the list.
List.prototype.remove=function remove(node)
{
	if (node==this.end) return;
	var buf=node.next;
	node.prev.next=node.next;
	node.next.prev=node.prev;
	if (node==this.head) this.head=next;
};
/// Add an item to the end of the list.
List.prototype.pushBack=function pushBack(value)
{ this.insert(value,this.end); };
/// Add an item to the beginning of the list.
List.prototype.pushFront=function pushFront(value)
{ this.insert(value,this.head);};
/// remove the last item of the list.
List.prototype.popBack=function popBack()
{ this.remove(this.end.prev);};
/// remove the first item of the list.
List.prototype.popFront=function popFront()
{ this.remove(this.head); };
/// Apply the callback function to every list item.
List.prototype.forEach=function forEach(callback)
{
	var cur=this.head;
	while (cur!=this.end)
	{
		callback(cur.value);
		cur=cur.next;
	}
};
/// Returns the length of the list
List.prototype.length=function length(callback)
{
	var cur=this.head;
	var i=0;
	while (cur!=this.end)
	{
		i++;
		cur=cur.next;
	}
	return i;
};
/// Sort function using a function paramter for the compare operation
List.prototype.sort=function sort(compare)
{
	/// Internal Sort function implementing in-place merge sorting
	/** This sort method tries to be efficient by manipulating the list's nodes
		in place. This suddenly uses null values to terminate lists (otherwise
		many end nodes would be needed), so it expects the last element
		in the original list to have it's next pointer changed to null.
		
		The wrapper function does that, as well as appending end to the returned 
		sorted list and providing the length of the list as a parameter. 
		The length is passed around so as to not have to use the O(n)
		length determination on the sub-lists.
		
		The merge function used is implemented as a local function inside
		this one.
	*/
	function internalsort(node,length,compare)
	{
		/// The merge function that combines two sorted lists into a single sorted list
		function merge(left,right)
		{
			var result=null;
			var resend=null;
			while (left!=null || right!=null)
			{
				if (left!=null && right!=null)
				{
					var sel=null;
					if (compare(left.value,right.value)) 
					{
						sel=left;
						left=left.next;
					}
					else 
					{
						sel=right;
						right=right.next;
					}
					if (result==null) 
					{
						result=sel;
						resend=sel;
					}
					else resend.next=sel;
					sel.prev=resend;
					resend=sel;
				}
				else if (left!=null)
				{
					if (result==null) 
					{
						result=left;
						resend=left;
					}
					else resend.next=left;
					left.prev=resend;
					resend=left;
					left=left.next;
				}
				else if (right!=null)
				{
					if (result==null) 
					{
						result=right;
						resend=right;
					}
					else resend.next=right;
					right.prev=resend;
					resend=right;
					right=right.next
				}
			}
			return result;
		};
		// Single item list cannot be split
		if (length==1) return node;
		// go to middle of list for splitting
		var l2=Math.floor(length/2);
		var middle=node;
		for (var i=0;i<l2;i++)
			middle=middle.next;
		// Split by sett ing next to null
		middle.prev.next=null;
		// now recurse to the two lists after splitting, and merge the results.
		return merge(internalsort(node,l2,compare),internalsort(middle,length-l2,compare));
	};
	var len=this.length();
	this.end.prev.next=null;
	this.head=internalsort(this.head,len,compare)
	var node=this.head;
	while (node.next!=null) node=node.next;
	node.next=this.end;
	this.end.prev=node;
}
/// Return an array representation of the list (i.e. same element in same order)
List.prototype.toArray=function toArray()
{
	var ret=new Array(this.length());
	var node=this.head;
	for (var i=0;i<ret.length;i++) 
	{
		ret[i]=node.value;
		node=node.next;
	}
}

/// This is a double-linked list implementation, with the usual methods.
function List()
{
	/// The node that is always the last in the list.
	this.end=new this.Node("end");
	/// The first node in the list.
	this.head=this.end;

	/// Simple test function that prints the values of each item, and the items before and behind.
	this.test=function test()
	{
		var cur=this.head;
		while (cur!=this.end)
		{
			console.log("Values: " + cur.prev.value.toString() + "->" + cur.value.toString()  + "->" + cur.next.value.toString() );
			cur=cur.next;
		}
	};
};

/////////////////////////////////////////
// SearchTree (internal)


/// Internal constructor for SearchTree nodes.
SearchTree.prototype.Node=function Node(value,red)
{
	this.value=value;
	this.red=red;
	this.parent=null;
	this.left=null;
	this.right=null;
};

SearchTree.prototype.rotateLeft=function rotateLeft(node)
{
	var x=node.right;
	node.right=x.left
	x.left=node;
	x.red=x.left.red;
	x.left.red=true;
	return x;
};

SearchTree.prototype.rotateRight=function rotateRight(node)
{
	var x=node.left;
	node.left=x.right;
	x.right=node;
	x.red=x.right.red;
	x.right.red=true;
	return x;
};

SearchTree.prototype.colorFlip=function colorFlip(node)
{
	node.color=!node.color;
	node.left.color=!node.left.color;
	node.right.color=!node.right.color;
	return node;
};

SearchTree.prototype.find=function find(value)
{
	var node=this.root;
	while (node!=null)
	{
		if (this.compare(value,node.value))
		{
			node=node.left;
		}
		else if (this.compare(node.value,value))
		{
			node=node.right;
		}
		else // neither larger nor smaller => equal
			return node.value;
	}
	return null;
};

SearchTree.prototype.minimum=function minimum()
{
	if (this.root==null) return null;
	var node=this.root;
	while (node.left!=null) node=node.left;
	return node.value;
};

SearchTree.prototype.maximum=function maximum()
{
	if (this.root==null) return null;
	var node=this.root;
	while (node.right!=null) node=node.right;
	return node.value;
};

SearchTree.prototype.internalInsert=function internalInsert(node,value,compare)
{
	if (node==null) 
		return new this.Node(value,true);
	if (node.left!=null && node.right!=null && node.left.red && node.right.red)
		this.colorFlip(node);
	if (compare(value,node.value))
		node.left=this.internalInsert(node.left,value,compare);	// ??
	else if (compare(node.value,value))
		node.right=this.internalInsert(node.right,value,compare); // ??
	else node.value=value;
	if (node.right!=null && node.right.red) 
		node=this.rotateLeft(node);
	if ((node.left!=null &&  node.left.red) && (node.left.left!=null && node.left.left.red)) 
		node=this.rotateRight(node);
	return node;
};
	
SearchTree.prototype.insert=function insert(value)
{
	var compare=this.compare;
	this.root=this.internalInsert(this.root,value,compare);
};

SearchTree.prototype.fixUp=function fixUp(node)
{
	if (node==null) return null;
	if (node.right!=null && node.right.red)
		node=this.rotateLeft(node);
	if (node.left!=null && node.left.red && (node.left.left!=null && !node.left.left.red))
		node=this.rotateRight(node);
	if (node.left!=null && node.left.red && node.right!=null && node.right.red)
		node=this.colorFlip(node);
	return node;
};
SearchTree.prototype.internalMin=function internalMin(node)
{
	if (node==null) return null;
	var x=node;
	while (x.left!=null) x=x.left;
	return x.value;
};

SearchTree.prototype.movereRight=function moveRedRight(node)
{
	node=this.colorFlip(node);
	if (node.left.left.red)
	{
		node=rotateRight(node);
		node=this.colorFlip(node);
	}
	return node;
};

SearchTree.prototype.moveRedLeft=function moveRedLeft(node)
{
	node=this.colorFlip(node);
	if (node.right.left.red)
	{
		node.right=rotateRight(node.right);
		node=rotateLeft(node);
		node=this.colorFlip(node);
	}
	return node;
};

SearchTree.prototype.removeMin=function removeMin(node)
{
	if (node.left==null)
		return null;
	if (!node.left.red && (node.left.left!=null && !node.left.left.red))
		node=moveRedLeft(node);
	node.left=removeMin(node.left);
	return this.fixUp(node);
};

SearchTree.prototype.internalRemove=function internalRemove(node,value,compare)
{
	if (node!=null && compare(value,node.value))
	{
		if (node.left!=null && !node.left.red && (node.left.left!=null && !node.left.left.red))
			node=this.moveRedLeft(node);
		node.left=this.internalRemove(node.left,value,compare);
	}
	else
	{
		if (node!=null && node.left!=null && node.left.red) 
			node=this.rotateRight(node);
		var equal=node!=null?!compare(node.value,value):false;
		if (equal && node.right==null) 
			return null;
		if (node!=null && node.right!=null && !node.right.red && (node.right.left!=null && !node.right.left.red))
			node=this.moveRedRight(node);
		if (equal)
		{
			node.value=this.internalMin(node.right);
			node.right=this.removeMin(node.right);
		}
		else if (node!=null && node.right!=null) node.right=this.internalRemove(node.right,value,compare);
	}
	return node!=null?this.fixUp(node):null;
};


SearchTree.prototype.remove=function remove(value)
{
	var compare=this.compare;
	this.root=this.internalRemove(this.root,value,compare);
};

SearchTree.prototype.forEach=function forEach(callback)
{
	function internalForEach(node,callback)
	{
		if (node.left!=null) internalForEach(node.left,callback);
		callback(node.value);
		if (node.right!=null) internalForEach(node.right,callback);
	};
	internalForEach(this.root,callback)
};

SearchTree.prototype.size=function size()
{
	function internalSize(node)
	{
		if (node==null) return 0;
		else return 1+internalSize(node.left)+internalSize(node.right);
	};
	return internalSize(root);
};

/// SearchTree datastructure, implemented as a left-leaning red-black tree.
/** See http://www.cs.princeton.edu/~rs/talks/LLRB/LLRB.pdf
*/
function SearchTree(compare)
{
	this.compare=compare;
	this.root=null;
};

/////////////////////////////////////////
// Set

Set.prototype.find=function find(value)
{
	return this.tree.find(value);
};

Set.prototype.insert=function insert(value)
{
	return this.tree.insert(value);
};

Set.prototype.remove=function remove(value)
{
	return this.tree.remove(value);
};

Set.prototype.minimum=function minimum()
{
	return this.tree.minimum();
};

Set.prototype.maximum=function maximum()
{
	return this.tree.maximum();
};

Set.prototype.forEach=function maximum(callback)
{
	return this.tree.forEach(callback);
};

Set.prototype.size=function size()
{
	return this.tree.size();
};

function Set(compare) {
	this.tree=new SearchTree(compare);
}

/////////////////////////////////////////
// Map

Map.prototype.find=function find(key)
{
	return this.tree.find(key).value.value;
};

Map.prototype.insert=function insert(key_,value_)
{
	return this.tree.insert({
		key:key_, 
		value:value_, 
		toString:function() { return this.key.toString()+" : "+this.value.toString();}
	});
};

Map.prototype.remove=function remove(key_)
{
	return this.tree.remove({key:key_});
};

Map.prototype.minimum=function minimum()
{
	return this.tree.minimum();
};

Map.prototype.maximum=function maximum()
{
	return this.tree.maximum();
};

Map.prototype.forEach=function maximum(callback)
{
	return this.tree.forEach(callback);
};

Map.prototype.size=function size()
{
	return this.tree.size();
};

/// Return a list containing all keys in the map.
Map.prototype.keys=function keys()
{
	var list=new List();
	this.tree.forEach(function(elem) { list.pushBack(elem.key); });
	return list;
};

/// Return a list containing all values in the map.
Map.prototype.values=function values()
{
	var list=new List();
	this.tree.forEach(function(elem) { list.pushBack(elem.value); });
	return list;
};

function Map(keycompare) {
	this.tree=new SearchTree(function (a,b)
	{
		return keycompare(a.key,b.key);
	});
}
