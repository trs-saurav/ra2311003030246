# Notification System Design

## Stage 1: Priority Notification

OK so basically, students were getting too many notifications that they couldn't get the important ones on time. Imagine getting 100 messages but only 2 are actually important - you arent going to see themThat's the problem this is solving.

i made a system that automatically sorts notifications and shows you the TOP 10 most important ones in ascending order.

## The Problem

Students have notifications coming in all the time - placement stuff, exam results, college events. But the app was just showing them in random order. So if there's a placement opportunity from a big company, it might be lost due to multiple problem 

## How I Fixed It

I just came up with a simple idea: show the most important notifiaction first. That's it.

I rank notifications by two things:

**Type** - How important is it?
- Placement  is level 3 - most important
- Results is level 2 - medium 
- Events  is level 1 - least important

**Time** - When did it come in?
- Newer notifications come before older ones if they have the same importance
- So you see recent important stuff before old important stuff

## What The Code Actually Does

1. fetch all notifications from the API
2. Add a priority number to each one (3, 2, or 1)
3. Sort them - first by priority, then by how recent
4. Pick the top 10
5. Show them
6. Done!

## How The Program Works

We call the API and get all notifications. Then we go through each one and give it a priority number based on what type it is.

Then we just sort them. First by priority (highest first), and if two have the same priority, we put the newer one first.

Finally we grab the first 10 and display them. That's literally it.

## Example

Let me show you an example. Say these 5 notifications come in:
-Corporation hiring (Placement)
- Birthday party tomorrow (Event)  
- math exam results (Result)
- esport club meeting (Event)
- abc hiring (Placement)

Without my system: they'd just be in random order and you might miss the Apple job.

With my system: you'd see the placements first:
- abc hiring 
- Corporation hiring
- math exam results
- Birthday party tomorrow
-esport club meeting

So the important notification show up first.
