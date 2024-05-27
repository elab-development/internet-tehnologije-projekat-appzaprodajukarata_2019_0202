<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tickets = Ticket::all();
        return response()->json($tickets);
        //
    }

    public function userTickets($user){
        $orders = Tickets::with('tickets')->where('user_id', $user)->get();

     
        $products = $tickets->map(function ($ticket) {
            return $ticket->event;

        });
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
        //
        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'price' => 'required|numeric|min:0',
            'seat_number' => 'required|string|max:255',
            'seat_row' => 'nullable|string|max:255'
        ]);

        $ticket = new Ticket();
        $ticket->user_id = $request->user_id;
        $ticket->price = $request->price;
        $ticket->seat_number = $request->seat_number;
        $ticket->seat_row = $request->seat_row;
        $ticket->save();

        return response()->json(['message' => 'Karta je uspešno kreirana', 'ticket' => $ticket], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return \Illuminate\Http\Response
     */
    public function show(Tickets $tickets)
    {
        //
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Karta nije pronađena'], 404);
        }
        return response()->json($ticket);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return \Illuminate\Http\Response
     */
    public function edit(Tickets $tickets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tickets  $tickets
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tickets $tickets)
    {
        //
        $validatedData = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'price' => 'numeric|min:0',
            'seat_number' => 'string|max:255',
            'seat_row' => 'nullable|string|max:255'
        ]);

        $ticket->update($validatedData);
        return response()->json($ticket);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tickets $tickets)
    {
        //
        $ticket->delete();
        return response()->json(['message' => 'Karta je uspešno obrisana'], 200);
    }

}
