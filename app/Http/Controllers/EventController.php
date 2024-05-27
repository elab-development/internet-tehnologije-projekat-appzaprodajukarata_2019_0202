<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $events = Events::all();
        return new EventsCollection($events);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s'
        ]);

            $event = new Event();
            $event->name = $request->name;
            $event->location = $request->location;
            $event->date = $request->date;
            $event->time = $request->time;
            $event->save();

        return response()->json(['message' => 'Događaj je uspešno kreiran'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Events  $events
     * @return \Illuminate\Http\Response
     */
    public function show(Events $events)
    {
        
        $event = Event::find($id);
        if (is_null($event)) {
            return response()->json(['message' => 'Događaj nije pronađen'], 404);
        }
        return response()->json($event);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Events  $events
     * @return \Illuminate\Http\Response
     */
    public function edit(Events $events)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Events  $events
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Events $events)
    {
         $validatedData = $request->validate([
            'name' => 'string|max:255',
            'location' => 'string|max:255',
            'date' => 'date',
            'time' => 'date_format:H:i'
        ]);

        $event->update($validatedData);
        return response()->json($event);
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Events  $events
     * @return \Illuminate\Http\Response
     */
    public function destroy(Events $events)
    {
        $event->delete();

        return response()->json('Product was deleted');
        //
    }
}
