<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Events;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Events::truncate();
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

         User::factory()->count(10)->create();
         Events::factory()->count(10)->create();


        
    }
}
