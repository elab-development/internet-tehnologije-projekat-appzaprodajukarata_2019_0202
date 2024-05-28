<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'stadium', 'date', 'time'
    ];

    public function tickets()
    {
        return $this->hasMany(Tickets::class);
    }
}
