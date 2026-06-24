<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->createMany([
            [
                'name' => 'Fahmi A\'laaudin',
                'email' => 'fahmialaudin38@gmail.com',
                'role' => 'user',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Alaudin Fahmi',
                'email' => 'alaudinfahmi2@gmail.com',
                'role' => 'admin',
                'password' => bcrypt('password'),
            ]
        ],);
    }
}