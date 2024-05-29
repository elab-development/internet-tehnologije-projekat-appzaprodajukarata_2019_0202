<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;
use App\Http\Resources\EventsCollection;
use App\Http\Resources\EventsResource;

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
            'stadium' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s'
        ]);

        if (!$validatedData) {
            abort(400, 'Uneti podaci nisu validni.');
        }

            $event = new Events();
            $event->name = $request->name;
            $event->stadium = $request->stadium;
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
    public function show($event_id)
    {
        
        $event = Events::find($event_id);
        if (is_null($event)) {
            return response()->json(['message' => 'Događaj nije pronađen'], 404);
        }
        return new EventsResource($event);
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
    public function update(Request $request, Events $event)
    {
         $validatedData = $request->validate([
            'name' => 'string|max:255',
            'stadium' => 'string|max:255',
            'date' => 'date',
            'time' => 'date_format:H:i:s'
        ]);
        if (!$validatedData) {
            abort(400, 'Uneti podaci nisu validni.');
        }

        $event->update($validatedData);
        return response()->json(['Event is updated successfully.', new EventsResource($event)]);
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Events  $events
     * @return \Illuminate\Http\Response
     */
    public function destroy(Events $event)
    {
        $event->delete();

        return response()->json('Event je izbrisan!');
        //
    }
}
