<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ContributorSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Contributor',
            'email' => 'contributor@example.com',
            'password' => Hash::make('password'),
            'role' => 'contributor',
        ]);
    }
}
