# APM

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

	observer/subscriber 

	subscription 

	observable 

	subject 

	behaviour subject


	pipe: async as type

	change detection to OnPush

	mapping returned result from HTTP request

	data stream and action stream 

	hot and cold observables

	for add operation merge and scan 

	get related data => get all, Just in time 


	creation operators
- ctor
- of
- from
- interval
- fromEvent
- EMPTY    => observable with no emitted element, and complete notification 
- ThrowError => observable with no emitted element, and error  notification 
- combineLatest   => emit on latest
- forkJoin              => last
- withLatestFrom   => latest but after source emit first
- merge


	pipeable operators
- map
- tap
- take
- catchError
      catch and replace, catch and rethrow
- filter 
- startWith
- scan
- shareReplay
- toArray

- concatMap  => in sequence , queue outter observer till the inner observer end, then process the next item 

- mergeMap  => in parallel

- switchMap => unsubscribe from the prior observerable when new emission comes

