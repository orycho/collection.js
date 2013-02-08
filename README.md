collection.js
=============

Basic efficient data structures for JavaScript. Ory was shocked to discover
these where completely missing in JavaScript, instead people resorted to
hacks like dynamically adding object properties and removing them.

This includes Lists, Sets and Maps. Some similarities to the C++ STL classes of the
same name exists (thougn the naming follows the Java convention, which has become
widespread).

Since JavaScript allows no operator overloading and has no built in hash for all types
(or in fact any types) available, the data structures in this library resort
to callbacks that implement the comparison operation.

All comparison callbacks have signature function(a,b), for example comparing numbers
could be done using

function(a,b) { return a<b; };

List
====

Implemented as double linked lists, elemts can be added and removed anywhere
in the list in constant time (assuming you have the appropriate node).
The sort method is a merge-sort, thus of logarithmic complexity, and it is the only
member of the List that requires a comparison callback.

Nodes
-----
Each value in the list is contained in a *node*, which is returend by all methods
returning data. It has three elements:
* prev: the previous node in the list (points to itself if the first element in the list)
* next: the next node in the list, the last element points to the element returned by the end() method
* value: the actual value contained in the list.

Constructor
-----------
* List(): create a new list object.

Methods
-------
* first(): returns the first element in the list.
* last(): returns the last element in the list (before end).
* insert(value,node): insert a value *before* the node passed.
* remove(node): removes the node passed from the list.
* pushBack(value): insert the value at the end of the list.
* pushFront(value): insert the value at the beginning of the list.
* popFront(): remove the first element in the list.
* popBack(): remove the last element in the list.
* forEach(callback): call the callback on every element, from first to last. callback has signature function(value)
* length(): returns the number of elements in the list.
* sort(compare): sort the list elements according to the comparison function passed. See above for the compare signature.
* toArray(): returns the complete list's contents as an array, in the same order.


Stack 
=====

To be done.

Methods
-------

Queue
=====

To be done.

Methods
-------


SearchTree
==========

This is an internal Object used to implement Set and Map.
It is an implementation of left-leaning red-black trees.
See [Robert Sedgwick's Paper](http://www.cs.princeton.edu/~rs/talks/LLRB/LLRB.pdf).
for a description of the underlying algorithms.

Both Set and Map are implemented using this Object, and the constructor
requires the comparison function, since nearly every method uses it.

Multiple identical values are not supported yet, i.e. no implementation
of the STLs multi_set and multi_map exist for now.

Methods
-------
Please familiarize yourself with the implementation of Set and/or Map,
and use only the methods used by these. The remaining methods are only
for internal use (e.g. tree balancing).

Also, feel free to contact Ory with questions.

Set
===

A Set is a data structure that contains values, supporting efficient insertion,
removal and find (look-up). All these operations are of logarithmic complexity.

Constructor
-----------
* Set(compare): create a new set object that uses compare for ordering the elements.

Methods
-------

* insert(value): insert the value into the set.
* find(value): returns the value, if it exists, otherwise 'null'.
* remove(value): removes the value, if it exists.
* minimum(): return the smallest value in the set, according to compare.
* maximum(): return the largest value in the set, according to compare.
* forEach(callback): apply the callback to every element, in the order imposed by compare.
* size(): return the number of elements in the set.

Map
===

A Map is a data structure that contains values which are referenced by keys.
It supports efficient insertion, removal and find (look-up) based on the
keys. All these operations are of logarithmic complexity.

Methods
-------

* insert(key,value): insert the value into the map.
* find(key): returns the value, if it exists, otherwise 'null'.
* remove(key): removes the value, if it exists.
* minimum(): return the value with the smalles key in the set, according to compare.
* maximum(): return the value with the largest key in the set, according to compare.
* forEach(callback): apply the callback to every element, in the order imposed by compare. The values passed to the callback are objects with three elements: key, value and toString()
* size(): return the number of elements in the map.
