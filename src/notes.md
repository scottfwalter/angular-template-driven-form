# Template-Driven Forms Notes

These notes elaborate on larger issues with Template-Driven and Reactive Forms as well as particular points in the code.

## The `[name]` directive in control bindings

When you bind an HTML control to a model property with `[(ngModel)]` _within a form_, you must add the `name` directive and assign it with a value.

For example:

```
<input [(ngModel)]="hero.alterEgo" name="alterEgo">
```

The supplied name becomes the name of the attached form control that Angular builds for you. 
```
Hero Form Controls 
  alterEgo: FormControl ...    <----
  name: FormControl ...
  power: FormControl ...
  powerQualifier: FormControl ...
```

You'll see a compile-type error if you neglect to add or set this directive:

```
Error: If ngModel is used within a form tag, either the name attribute must be set or the form control must be defined as 'standalone' in ngModelOptions.

Example 1: <input [(ngModel)]="person.firstName" name="first">

Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">
```

>A "standalone" control does not belong to the Form that surrounds it and therefore does not need a name.

**The name of the form control must be _unique among its sibling controls_.**

We cannot have two controls named "alterEgo" in this single-depth Hero form.

If you were to re-use the "alterEgo" name like this
```
<input [(ngModel)]="hero.name" name="alterEgo">
<input [(ngModel)]="hero.alterEgo" name="alterEgo"
```

The view would display two HTML input boxes, both of which are bound to "hero.alterEgo" and display the same value, "Chuck Overstreet".

Now you _can_ re-use a control name at _different levels_ of the control tree.
In this example, we'll display two heroes, each in its own FormGroup. The control structure will look something like this:

```
Heroes Form Controls
  heroesForm: FormGroup
    0: FormGroup
      alterEgo: FormControl ...
    1: FormGroup
      alter-Ego: FormControl ...
    ...
```
It's OK that two controls are named `alterEgo` because they are in _separate control sub-trees_.

### `*ngFor` Hell

The uniqueness requirement becomes a serious problem when you use an `*ngFor` repeater of the same object:

```
<div *ngFor="let like of model.likes">  
  <input [(ngModel)]="like.name" [name]="likeName">
</div>
```

The generated control tree will look like this, no matter how many items are in `model.likes`:

```
Hero Form Controls 
  alterEgo: FormControl ...
  likeName: FormControl ...
  name: FormControl ...
  ...
```

The Hero Form value parallels this structure and looks like this:

```
alterEgo: "Chuck Overstreet"
likeName: "hamburger"
name: "Dr IQ"
```

The view will display as many input boxes as there are `like` items.
But every input will display the same name, the name of the _last_ of the `like`s.

Why? Because those input boxes are all bound to the _last_ of the controls with the name, `likeName`. Clearly not what we want.

An obvious workaround is to generate unique names from the `*ngFor` index like this:

```
<div *ngFor="let like of model.likes; let i=index">  
  <input [(ngModel)]="like.name" [name]="likeName-i">
</div>
```

On first render, each input displays each `like` name and Hero Form values will be something like this:

```
alterEgo: "Chuck Overstreet"
likeName-0: "fruit"
likeName-1: "bread"
likeName-2: "hamburger"
name: "Dr IQ"
...
```

Problem solved!  Or is it?

Suppose the user starts messing with the order of the `like` items in `model.likes`.

If the user deletes the second `like` ("bread") and adds a new one,
you'd expect to see three input boxes with "fruit", "hamburger", and a blank for the new `like`.

Instead you see three input boxes with "fruit", blank, blank!

**WAT?**

You look at the form values (which parallel the control structure) and see this:

```
alterEgo: "Chuck Overstreet"
likeName-0: "fruit"
likeName-2: null
name: "Dr IQ"
...
```

Where is `likeName-1`? Why is `likeName-2` null? Let's start with the second question.

The `likeName-2` control is actually bound to two `like` instances, the "Hamburger" and the new empty one.
As we learned above, when two HTML elements are given the same non-unique control name, Angular binds the control to the second (last) element's model property. 

The last model property is the name of the third `like` instance, the new one, the `like` that has no name yet. So both the second and third input boxes are blank.

<br>

**_Why didn't Angular rename the controls like we told it to do?_**

Great question. I have a guess.

For performance reasons, Angular tries to preserve DOM nodes if it can. You can learn about this in the docs under `*ngFor` and `trackBy`.

When Angular was about to create the control `likeName-1` for the _previously displayed_ "Hamburger" `like`, it realized that this `like` instance was _already bound_ to the control named `likeName-2`.
So Angular "efficiently" _ignored_ the control name we wanted to give it and assigned the binding to the `likeName-2` control that is attached to the input box already in the DOM.

Then, as it prepared to display the _new_ `like` in 3rd position, it did what we asked ... and gave that control the name, `likeName-2` (because the 3rd element index is `2`). 

Voila! Duplicate control names. 

You could call this behavior a bug; I don't think the Angular team will agree.

<br>

***Lesson Learned**: never use the `index` in `*ngFor` in your generated control name.*

<br>

**Why are we bothering with this "name" nonsense?**

IMO, the fundamental architectural/ergonomic error is that I am _forced_ to provide a name at all! 

Template-Driven developers don't care about controls. Asking us to name the control makes no sense to us and wastes our time. As we've seen, it becomes an active source of bugs.

Reactive Forms developers do care about control names. They _have to care_ because they must reference controls by name when they write their component templates. 
 


 IMO, it would be easy for Angular to relieve us of this headache.
 The `name` directive should be _optional_. **Angular** could ... and should ... **generate a unique control name if I don't provide one explicitly**. I really don't care what name that is.
 
 That is exactly what we do for our IdeaBlade customers.
 
 If you happened to examine the form controls in our Template Driven apps, you'd see utterly arbitrary control names. 
 
This has never been a problem for us because everything we need is in the ViewModel object to which we bind with `[(ngModel)]`

We never ask the Form for its values and never search the Form Control tree for a value by name. Why would we?

Nonetheless, we are stuck with having to come up with useless (to us) control names.

In this project, we generate the control name from the _entity's invariant primary key_:

 ```
 <input [(ngModel)]="like.name" [name]="'likeName-' + like.id">
 ```

 This always works, unlike the `*ngFor` index, because the `like` has a unique identity now matter how it moves around in `model.likes`.
 
 After the same delete/add scenario, the form values look like this:
```
alterEgo: "Chuck Overstreet"
likeName-19: "fruit"
likeName-21: "hamburger"
likeName--1: ""
name: "Dr IQ"
```

> Notice that the new `like` has `id: -1`. We assign negative numbers to new entity ids. We convert these negative ids to positive ids when we save new entities to the server.

This approach is sufficient for the demo.


## A `ViewProvider` is required for sub-components

TBD

## Asynchrony

TBD
