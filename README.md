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

List
====

Implemented as double linked lists, elemts can be added and removed anywhere
in the list in constant time (assuming you have the appropriate node).
The sort method is a merge-sort, thus of logarithmic complexity, and it is the only
member of the List that requires a comparison callback.

Methods
-------

SearchTree
==========

This is an internal Object used to implement Set and Map.
It is an implementation of left-leaning red-black trees.
See http://www.cs.princeton.edu/~rs/talks/LLRB/LLRB.pdf
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

Set
===

A Set is a data structure that contains values, supporting efficient insertion,
removal and find (look-up). All these operations are of logarithmic complexity.

Methods
-------

Map
===

A Map is a data structure that contains values which are referenced by keys.
It supports efficient insertion, removal and find (look-up) based on the
keys. All these operations are of logarithmic complexity.

Methods
-------
