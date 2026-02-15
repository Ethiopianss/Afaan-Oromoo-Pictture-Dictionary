<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Animals', 'name_oromo' => 'Bineensota'],
            ['name' => 'Food and Drinks', 'name_oromo' => 'Nyaataa fi Dhugaatii'],
            ['name' => 'Clothing', 'name_oromo' => 'Uffata'],
            ['name' => 'Family and People', 'name_oromo' => 'Maatii fi Namoota'],
            ['name' => 'Household Items', 'name_oromo' => 'Meeshaalee Manaa'],
            ['name' => 'Parts of the Body', 'name_oromo' => 'Qaamolee Qaamaa'],
            ['name' => 'Transportation', 'name_oromo' => 'Geejjiba'],
            ['name' => 'Education and School', 'name_oromo' => 'Barnoota fi Mana Barumsaa'],
            ['name' => 'Nature', 'name_oromo' => 'Uumama'],
            ['name' => 'Jobs', 'name_oromo' => 'Hojii fi Ogummaa'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
